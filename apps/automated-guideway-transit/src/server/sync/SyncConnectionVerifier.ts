import {
	AgtRepositoryId,
	AgtSharingMessageId,
	DataTransferMessageFromTM,
	ISyncConnectionVerifier,
	MessageFromTM,
	SyncConnectionClaim,
	TerminalCredentials,
	TerminalId,
	TerminalPassword,
	VerifiedMessagesFromTM
}                        from '@airport/arrivals-n-departures'
import {DI}              from '@airport/di'
import {
	AGT_SHARING_MESSAGE_DAO,
	ITerminalDao,
	TERMINAL_DAO,
	TERMINAL_REPOSITORY_DAO,
	TerminalLastPollConnectionDatetime,
	TerminalLastSseConnectionDatetime,
}                        from '@airport/guideway'
import {
	AGTLogger,
	BLACKLIST,
	ERROR_LOGGER,
	SYNC_CONNECTION_VERIFIER
}                        from '../../diTokens'
import {ServerErrorType} from '../../model/ServerErrorType'
import {IErrorLogger}    from '../common/ErrorLogger'


const log = AGTLogger.add('SyncConnectionVerifier')

export class SyncConnectionVerifier
	implements ISyncConnectionVerifier {

	pendingConnectionClaims: SyncConnectionClaim[] = []

	queueConnectionClaim(
		pendingConnectionClaim: SyncConnectionClaim,
	): void {
		this.pendingConnectionClaims.push(pendingConnectionClaim)
	}

	/**
	 * Verify pending connection claims.
	 *
	 * Concerns:
	 *
	 * 1) How to handle valid user connections when a DDOS attack is randomly using their
	 * Terminal Original Shard Id and Terminal Id:
	 *
	 * a) When multiple Connection requests for the same Terminal credentials are detected,
	 * deny the request before it is recorded into the Terminal Repository staging table.
	 *
	 * b) Then find the correct terminal request via the provided hash and disallow the
	 * remaining ones.
	 *
	 * Implementing the second option, since a the priority is to have the server still
	 * syncing (in the presence of a DDOS attack).
	 *
	 *
	 * @param {number} serverId
	 * @param {number} minMillisSinceLastConnection
	 * @returns {Promise<VerifiedClientPollMessages>}
	 */
	async verifyPendingClaims(
		// serverId: ServerId,
		minMillisSinceLastConnection: number
	): Promise<VerifiedMessagesFromTM> {
		// TODO: removed unused dependencies once tested
		const [
			      blacklist,
			      terminalDao,
			      terminalRepositoryDao,
			      agtSharingMessageDao,
			      errorLogger
		      ] = await DI.get(BLACKLIST, TERMINAL_DAO,
			TERMINAL_REPOSITORY_DAO, AGT_SHARING_MESSAGE_DAO,
			ERROR_LOGGER)

		const currentConnectionClaims = this.pendingConnectionClaims
		this.pendingConnectionClaims  = []

		// If there are no records to be processed
		if (!currentConnectionClaims.length) {
			return {
				terminalIds: new Set(),
				repositoryIds: new Set(),
				agtSharingMessageIds: new Set(),
				syncConnectionClaimsByTmId: new Map()
			}
		}

		const earliestAllowedLastConnectionDatetime
			                           = new Date().getTime() - minMillisSinceLastConnection
		const verifiedMessagesFromTM = await this.verifyTerminalsAndGetResourceIds(
			currentConnectionClaims,
			earliestAllowedLastConnectionDatetime,
			errorLogger, terminalDao
		)

		// At this point we are guaranteed that in the present batch there are no duplicate
		// terminal requests


		return verifiedMessagesFromTM
	}

	private async verifyTerminalsAndGetResourceIds(
		currentConnectionClaims: SyncConnectionClaim[],
		earliestAllowedLastConnectionDatetime: number,
		errorLogger: IErrorLogger,
		terminalDao: ITerminalDao
	): Promise<VerifiedMessagesFromTM> {
		const terminalIds: Set<TerminalId>                                     = new Set()
		const repositoryIds: Set<AgtRepositoryId>                              = new Set()
		const agtSharingMessageIds: Set<AgtSharingMessageId>                   = new Set()
		const syncConnectionClaimsByTmId: Map<TerminalId, SyncConnectionClaim> = new Map()

		const terminalIdSet: Set<TerminalId> = new Set()
		const duplicatePendingConnectionClaimsMap: Map<TerminalId, SyncConnectionClaim[]>
		                                     = new Map()

		// For every batched Connection claim
		for (const currentConnectionClaim of currentConnectionClaims) {
			const message: MessageFromTM                   = currentConnectionClaim.messageFromTM
			const terminalCredentials: TerminalCredentials = message.terminalCredentials
			const terminalId                               = terminalCredentials.terminalId
			// If a request from the same terminal came more than once (probably a hack or an
			// attack) NOTE: Thes e attacks are most likely random, since there is no way for
			// an attacker to know which terminal id belongs to which user (this is most likely
			// a DDOS attack)
			if (terminalIdSet.has(terminalId)) {
				const previousConnectionClaim = syncConnectionClaimsByTmId.get(terminalId)
				let duplicatePendingConnectionClaimsMapForTerminal: SyncConnectionClaim[]
				                              = duplicatePendingConnectionClaimsMap.get(terminalId)
				// If the happy path claim map still has a record in it
				if (previousConnectionClaim) {
					duplicatePendingConnectionClaimsMapForTerminal = []
					duplicatePendingConnectionClaimsMapForTerminal.push(previousConnectionClaim)
					duplicatePendingConnectionClaimsMap.set(terminalId,
						duplicatePendingConnectionClaimsMapForTerminal)
					syncConnectionClaimsByTmId.delete(terminalId)
					errorLogger.logError(
						log,
						ServerErrorType.INCOMING_DATABASE_KEY_APPEARS_MORE_THAN_ONCE_IN_THE_BATCH,
						terminalCredentials,
						null
					)
				}
				duplicatePendingConnectionClaimsMapForTerminal.push(currentConnectionClaim)
				continue
			}
			terminalIdSet.add(terminalId)
		}

		const terminalCredentialMapById =
			      await terminalDao.findTerminalVerificationRecords(Array.from(terminalIdSet))


		// For every Connection claim with no duplicates
		for (const [terminalId, pendingConnectionClaim] of syncConnectionClaimsByTmId) {

			const message: MessageFromTM      = pendingConnectionClaim.messageFromTM
			const incomingTerminalCredentials = message.terminalCredentials
			const terminalData                =
				      this.verifyTerminalInfo(
					      terminalId, incomingTerminalCredentials,
					      pendingConnectionClaim, terminalCredentialMapById,
					      errorLogger)
			if (!terminalData) {
				syncConnectionClaimsByTmId.delete(terminalId)
				continue
			}

			if (!this.finishTerminalVerification(
				earliestAllowedLastConnectionDatetime,
				terminalId,
				pendingConnectionClaim,
				terminalData[1],
				repositoryIds,
				agtSharingMessageIds,
				syncConnectionClaimsByTmId,
				errorLogger)) {
				syncConnectionClaimsByTmId.delete(terminalId)
				terminalIds.add(terminalId)
			}

		}

		// If there where duplicate requests per terminal
		if (duplicatePendingConnectionClaimsMap.size) {
			await this.filterDuplicateRequestsPerTerminal(
				duplicatePendingConnectionClaimsMap,
				terminalIdSet,
				repositoryIds,
				agtSharingMessageIds,
				terminalCredentialMapById,
				syncConnectionClaimsByTmId,
				earliestAllowedLastConnectionDatetime,
				errorLogger
			)
		}

		return {
			terminalIds,
			repositoryIds,
			agtSharingMessageIds,
			syncConnectionClaimsByTmId
		}
	}

	private verifyTerminalInfo(
		terminalId: TerminalId,
		incomingTerminalCredentials: TerminalCredentials,
		pendingConnectionClaim: SyncConnectionClaim,
		terminalInfoMapById: Map<TerminalId, [
			TerminalPassword, TerminalLastPollConnectionDatetime, TerminalId]>,
		errorLogger: IErrorLogger
	): [TerminalPassword, TerminalLastPollConnectionDatetime, TerminalId] {

		const terminalData = terminalInfoMapById.get(terminalId)
		if (!terminalData) {
			errorLogger.logError(
				log,
				ServerErrorType.INCOMING_DATABASE_RECORD_WASNT_IN_DATABASES_TABLE,
				incomingTerminalCredentials,
				null
			)
			pendingConnectionClaim.connectionDataCallback(null, false, null)

			return null
		}
		if (incomingTerminalCredentials.terminalPassword !== terminalData[0]) {
			// Terminal password does not match (probably a hack or an attack)
			errorLogger.logError(
				log,
				ServerErrorType.INCOMING_DATABASE_HASH_DOES_NOT_MATCH,
				incomingTerminalCredentials,
				null
			)
			pendingConnectionClaim.connectionDataCallback(null, false, null)

			return null
		}

		return terminalData
	}

	private finishTerminalVerification(
		earliestAllowedLastConnectionDatetime,
		terminalId: TerminalId,
		pendingConnectionClaim: SyncConnectionClaim,
		lastConnectionDatetime: TerminalLastSseConnectionDatetime,
		repositoryIdSet: Set<AgtRepositoryId>,
		agtSharingMessageIdSet: Set<AgtSharingMessageId>,
		pendingConnectionClaimsMap: Map<TerminalId, SyncConnectionClaim>,
		errorLogger: IErrorLogger
	): boolean {
		const message = <DataTransferMessageFromTM>pendingConnectionClaim.messageFromTM

		// If the server connected too soon (probably a hack or an attack)
		if (lastConnectionDatetime > earliestAllowedLastConnectionDatetime) {
			errorLogger.logError(
				log,
				ServerErrorType.SYNC_CLIENT_CONNECTED_TOO_SOON,
				message.terminalCredentials,
				null
			)
			pendingConnectionClaim.connectionDataCallback(null, false, null)
			return false
		}

		for (const repositoryUpdateRequest of message.repositoryUpdateRequests) {
			repositoryIdSet.add(repositoryUpdateRequest.agtRepositoryId)
		}
		const sharingMessageIdSetForClaim: Set<AgtSharingMessageId> = new Set()
		for (const agtSharingMessageId of message.terminalSyncAcks) {
			if (sharingMessageIdSetForClaim.has(agtSharingMessageId)) {
				errorLogger.logError(
					log,
					ServerErrorType.INCOMING_DATABASE_SYNC_LOG_KEY_APPEARS_MORE_THAN_ONCE_IN_A_REQUEST,
					message.terminalCredentials,
					agtSharingMessageId
				)
				pendingConnectionClaimsMap.delete(terminalId)
				pendingConnectionClaim.connectionDataCallback(null, false, null)
				return false
			}
			sharingMessageIdSetForClaim.add(agtSharingMessageId)
		}
		sharingMessageIdSetForClaim.forEach(agtSharingMessageIdSet.add, agtSharingMessageIdSet)

		return true
	}

	private async filterDuplicateRequestsPerTerminal(
		duplicatePendingConnectionClaimsMap: Map<TerminalId, SyncConnectionClaim[]>,
		verifiedTerminalIdSet: Set<TerminalId>,
		repositoryIdSet: Set<AgtRepositoryId>,
		agtSharingMessageIdSet: Set<AgtSharingMessageId>,
		terminalInfoMapById: Map<TerminalId, [
			TerminalPassword, TerminalLastPollConnectionDatetime, TerminalId]>,
		pendingConnectionClaimsMap: Map<TerminalId, SyncConnectionClaim>,
		earliestAllowedLastConnectionDatetime: number,
		errorLogger: IErrorLogger
	) {
		// For every set of duplicate requests per terminal
		for (const [terminalId, duplicateConnectionClaimsForTerminal] of duplicatePendingConnectionClaimsMap) {
			const terminalData = terminalInfoMapById.get(terminalId)

			// If no terminal was found for duplicate requests
			if (!terminalData) {
				continue
			}
			duplicatePendingConnectionClaimsMap.delete(terminalId)

			let connectionClaimWithMatchingHash: SyncConnectionClaim
			let foundMultipleWithCorrectHash = false
			let foundClaimsWithIncorrectHash = false
			// For every duplicate Connection claim for a given terminal
			for (const duplicateConnectionClaimForTerminal of duplicateConnectionClaimsForTerminal) {
				const claimedTerminalPassword = duplicateConnectionClaimForTerminal.messageFromTM.terminalCredentials.terminalPassword
				// If the claims terminalPassword is correct
				if (claimedTerminalPassword === terminalData[0]) {
					// If there was another duplicate request with a correct Connection hash
					if (connectionClaimWithMatchingHash) {
						foundMultipleWithCorrectHash = true
						// Logged below
						duplicateConnectionClaimForTerminal[1](null, false, null)
						continue
					}
					connectionClaimWithMatchingHash = duplicateConnectionClaimForTerminal
				} else {
					if (!foundClaimsWithIncorrectHash) {
						errorLogger.logError(
							log,
							ServerErrorType.DUPLICATE_INCOMING_DATABASE_KEYS_HAVE_INCORRECT_HASH,
							duplicateConnectionClaimForTerminal.messageFromTM.terminalCredentials,
							null
						)
					}
					foundClaimsWithIncorrectHash = true
					duplicateConnectionClaimForTerminal.connectionDataCallback(null, false, null)
				}
			}

			if (connectionClaimWithMatchingHash) {
				if (foundMultipleWithCorrectHash) {
					errorLogger.logError(
						log,
						ServerErrorType.MULTIPLE_DUPLICATE_INCOMING_DATABASE_KEYS_HAVE_CORRECT_HASH,
						connectionClaimWithMatchingHash.messageFromTM.terminalCredentials,
						null
					)
					connectionClaimWithMatchingHash.connectionDataCallback(null, false, null)
					continue
				}

				if (this.finishTerminalVerification(
					earliestAllowedLastConnectionDatetime,
					terminalId,
					connectionClaimWithMatchingHash,
					terminalData[1],
					repositoryIdSet,
					agtSharingMessageIdSet,
					pendingConnectionClaimsMap,
					errorLogger)) {
					// This is a valid connection
					pendingConnectionClaimsMap.set(terminalId, connectionClaimWithMatchingHash)
					verifiedTerminalIdSet.add(terminalId)
				}
			}
		}

		// For any remaining duplicate requests (that had no matching terminal record)
		for (const connectionClaimsForTerminal of duplicatePendingConnectionClaimsMap.values()) {
			errorLogger.logError(
				log,
				ServerErrorType.DUPLICATE_INCOMING_DATABASE_KEYS_HAVE_NO_MATCHING_DATABASE,
				connectionClaimsForTerminal[0].messageFromTM.terminalCredentials,
				null
			)
			for (const ConnectionClaimForTerminal of connectionClaimsForTerminal) {
				ConnectionClaimForTerminal.connectionDataCallback(null, false, null)
			}
		}
	}

}

DI.set(SYNC_CONNECTION_VERIFIER, SyncConnectionVerifier)

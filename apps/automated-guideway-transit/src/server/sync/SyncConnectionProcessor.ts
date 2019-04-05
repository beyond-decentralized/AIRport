import {
	IUtils,
	UTILS
}                      from '@airport/air-control'
import {
	AgtRepositoryId,
	AgtSharingMessageId,
	DataTransferMessageFromTM,
	MessageToTMContentType,
	RepositoryUpdateRequest,
	RepoTransBlockSyncOutcome,
	RepoTransBlockSyncOutcomeType,
	SyncConnectionClaim,
	SyncNotificationMessageToTM,
	TerminalId,
	TmRepositoryTransactionBlockId,
	TmSharingMessageId,
	VerifiedMessagesFromTM
}                      from '@airport/arrivals-n-departures'
import {DI}            from '@airport/di'
import {
	AGT_REPO_TRANS_BLOCK_DAO,
	AGT_SHARING_MESSAGE_DAO,
	AgtRepositoryTransactionBlockAddDatetime,
	AgtRepositoryTransactionBlockId,
	AgtSharingMessageAcknowledged,
	ArchivingStatus,
	AugmentedRepoTransBlockMessageToTM,
	IAgtRepositoryTransactionBlockDao,
	IAgtSharingMessageDao,
	InsertAgtRepositoryTransactionBlock,
	InsertAgtSharingMessage,
	InsertSyncLog,
	ISyncLogDao,
	ITerminalDao,
	ITerminalRepositoryDao,
	SYNC_LOG_DAO,
	TERMINAL_DAO,
	TERMINAL_REPOSITORY_DAO,
	TerminalRepositoryPermission,
	UserRepositoryPermission
}                      from '@airport/guideway'
import {transactional} from '@airport/tower'
import {
	AGTLogger,
	ERROR_LOGGER,
	SYNC_CONNECTION_PROCESSOR
}                      from '../../diTokens'
import {IErrorLogger}  from '../common/ErrorLogger'

export interface ISyncConnectionProcessor {

	processConnections(
		verifiedMessagesFromTM: VerifiedMessagesFromTM
	): Promise<void>;

}

const log = AGTLogger.add('SyncConnectionProcessor')

export class SyncConnectionProcessor
	implements ISyncConnectionProcessor {

	private terminalDao: ITerminalDao
	private terminalRepositoryDao: ITerminalRepositoryDao
	private agtSharingMessageDao: IAgtSharingMessageDao
	// private tunningParameters: TuningParameters,
	private errorLogger: IErrorLogger
	private syncLogDao: ISyncLogDao
	private agtRepoTransBlockDao: IAgtRepositoryTransactionBlockDao
	private utils: IUtils

	constructor() {
		DI.get((
			terminalDao,
			terminalRepositoryDao,
			agtSharingMessageDao,
			errorLogger,
			syncLogDao,
			agtRepositoryTransactionBlockDao,
			utils
			) => {
				this.terminalDao           = terminalDao
				this.terminalRepositoryDao = terminalRepositoryDao
				this.agtSharingMessageDao  = agtSharingMessageDao
				this.errorLogger           = errorLogger
				this.syncLogDao            = syncLogDao
				this.agtRepoTransBlockDao  = agtRepositoryTransactionBlockDao
				this.utils                 = utils
			}, TERMINAL_DAO, TERMINAL_REPOSITORY_DAO,
			AGT_SHARING_MESSAGE_DAO, ERROR_LOGGER,
			SYNC_LOG_DAO, AGT_REPO_TRANS_BLOCK_DAO,
			UTILS)
	}

	async processConnections(
		verifiedMessagesFromTM: VerifiedMessagesFromTM
	): Promise<void> {
		const verifiedTerminalIds = Array.from(verifiedMessagesFromTM.terminalIds)

		// Start writing data back to valid connections
		for (const [terminalId, verifiedLoginClaim] of verifiedMessagesFromTM.syncConnectionClaimsByTmId) {
			verifiedLoginClaim.connectionDataCallback(terminalId, true, null)
		}

		// Update last login time asynchronously - no further processing depends on that
		this.updateLastSyncConnectionDatetime(verifiedTerminalIds).then()

		// Wait for both
		await Promise.all([
			// Waiting for incoming records to make it to other terminal syncs
			// and to be marked as already synced for terminals from which they come
			this.insertRepositoryTransactionBlocks(verifiedTerminalIds, verifiedMessagesFromTM.repositoryIds,
				verifiedMessagesFromTM.syncConnectionClaimsByTmId),
			// Waiting for incoming sync ACKS to be recorded so that the synced repositories
			// won't be sent out again
			this.updateAgtSharingMessages(verifiedMessagesFromTM.agtSharingMessageIds,
				verifiedMessagesFromTM.syncConnectionClaimsByTmId)])

		await this.sendRecentChangesToVerifiedConnections(
			verifiedTerminalIds, verifiedMessagesFromTM.syncConnectionClaimsByTmId)
	}

	async updateLastSyncConnectionDatetime(verifiedTerminalIds: TerminalId[],) {
		// TODO: see if manual retry logic should be applied
		await this.terminalDao.updateLastPollConnectionDatetime(
			verifiedTerminalIds, new Date().getTime())
	}

	private async insertRepositoryTransactionBlocks(
		verifiedTerminalIds: TerminalId[],
		repositoryIdSet: Set<AgtRepositoryId>,
		verifiedConnectionClaimMap: Map<TerminalId, SyncConnectionClaim>
	): Promise<void> {
		// TODO: see if manual retry logic should be applied
		await this.tryToInsertAgtRepositoryTransactionBlocks(
			verifiedTerminalIds, repositoryIdSet, verifiedConnectionClaimMap)
	}

	async tryToInsertAgtRepositoryTransactionBlocks(
		verifiedTerminalIds: TerminalId[],
		repositoryIdSet: Set<AgtRepositoryId>,
		verifiedConnectionClaimMap: Map<TerminalId, SyncConnectionClaim>
	): Promise<void> {
		await transactional(async () => {

			// Query TerminalRepositories to verify that the incoming repository change records
			// exist and get the permissions a given terminal has in a particular repository
			const terminalRepositoryMapByTerminalId
				      = await this.terminalRepositoryDao.findByTerminalIdInAndRepositoryIdIn(
				verifiedTerminalIds, Array.from(repositoryIdSet)
			)

			const repoTransBlockSyncOutcomeMap: Map<TerminalId, RepoTransBlockSyncOutcome[]>
				      = new Map()

			const {terminalIds, tmRepositoryTransactionBlockIds} = this.ensureRepositoryPermissions(
				terminalRepositoryMapByTerminalId, verifiedConnectionClaimMap, repoTransBlockSyncOutcomeMap)

			const agtRepositoryTransactionBlockInserts: InsertAgtRepositoryTransactionBlock[] = []

			// Keep track of successfully synced incoming transactions
			const successTransSyncOutcomes: RepoTransBlockSyncOutcome[] = []

			const alreadySyncedInMessageTerminalIds: Set<TerminalId>                 = new Set()
			const alreadySyncedInMessageTmSharingMessageIds: Set<TmSharingMessageId> = new Set()

			const alreadySyncedMessageMapByTerminalIdAndTmSharingMessageId:
				      Map<TerminalId, Map<TmSharingMessageId, SyncNotificationMessageToTM>>
				      = new Map()

			await this.addRepositoryTransactionBlocks(terminalIds, tmRepositoryTransactionBlockIds, terminalRepositoryMapByTerminalId,
				verifiedConnectionClaimMap, alreadySyncedInMessageTerminalIds,
				alreadySyncedInMessageTmSharingMessageIds,
				alreadySyncedMessageMapByTerminalIdAndTmSharingMessageId, repoTransBlockSyncOutcomeMap,
				successTransSyncOutcomes, agtRepositoryTransactionBlockInserts)

			await this.respondToAlreadySyncedMessages(alreadySyncedInMessageTerminalIds,
				alreadySyncedInMessageTmSharingMessageIds,
				alreadySyncedMessageMapByTerminalIdAndTmSharingMessageId, verifiedConnectionClaimMap)

			const agtSharingMessageIdMapByTerminalId = await this.persistRepositoryTransactionBlocks(
				verifiedTerminalIds,
				verifiedConnectionClaimMap, agtRepositoryTransactionBlockInserts, successTransSyncOutcomes)

			// Send back all remaining RepoTransBlockSyncOutcomes
			for (const [terminalId, syncOutcomes] of repoTransBlockSyncOutcomeMap) {
				const verifiedLoginClaim: SyncConnectionClaim
					                  = verifiedConnectionClaimMap.get(terminalId)
				const messageFromTM = <DataTransferMessageFromTM>verifiedLoginClaim.messageFromTM
				verifiedLoginClaim.connectionDataCallback(terminalId, false, <SyncNotificationMessageToTM>{
					contentType: MessageToTMContentType.SYNC_NOTIFICATION,
					tmSharingMessageId: messageFromTM.tmSharingMessageId,
					// agtAgtSharingMessageId: agtSharingMessageIdMapByTerminalId.get(terminalId),
					// addDatetime: verifiedLoginClaim.loginClaimReceptionTime,
					syncOutcomes
				})
			}
		})
	}

	private declineTransSyncLog(
		terminalId: TerminalId,
		repoUpdateRequest: RepositoryUpdateRequest,
		declinedTransSyncLogOutcomes: RepoTransBlockSyncOutcome[],
		syncOutcomeType: RepoTransBlockSyncOutcomeType
	): void {
		log.warn(`Sync denied:
		RepoTransBlockSyncOutcomeType:  {1}
		TerminalId:                  {2}
		AgtRepositoryId:                {3}
		`,
			syncOutcomeType,
			terminalId,
			repoUpdateRequest.agtRepositoryId,
			// repoUpdateRequest.tmRepositoryTransactionBlockId
		)
		// TmRepositoryTransactionBlockId: {4}
		declinedTransSyncLogOutcomes.push({
			tmRepositoryTransactionBlockId: repoUpdateRequest.tmRepositoryTransactionBlockId,
			// agtRepositoryTransactionBlockId: 0,
			syncOutcomeType
			// TODO: evaluate if for securing reasons the actual code should be obscured
			// : RepoTransBlockSyncOutcomeType.SYNC_FROM_TM_DENIED_NO_WRITE_PERMISSION
		})
	}

	/**
	 * It is possible for a valid terminal to attempt to sync records to a repository
	 * to which it is (no longer) associated to.
	 *
	 * Up to this point the association of terminal to repository has not been
	 * checked.  Hence it is possible for a terminal that is valid and is allowed
	 * to sync to try and sync against the repositories that it may not have. Hence
	 * if an association between a terminal and a repository is not found we
	 * need to send back an error message.
	 *
	 * FIXME: figure out what to do in the inverse case, repository can in theory have
	 * been added to a given terminal (TM) but AGT may not be aware of that fact.
	 *
	 * Simply receiving messages from TMs that have not been verified to have a repo
	 * is not acceptable.  We need to figure this out before P2P and multi AGT setups
	 * are possible.
	 *
	 * @type {Map<TerminalId, SyncConnectionClaim>}
	 */
	private ensureRepositoryPermissions(
		permissionMapByTerminalAndRepositoryIds: Map<TerminalId, Map<AgtRepositoryId, TerminalRepositoryPermission>>,
		verifiedConnectionClaimMap: Map<TerminalId, SyncConnectionClaim>,
		repoTransBlockSyncOutcomeMap: Map<TerminalId, RepoTransBlockSyncOutcome[]>
	): {
		terminalIds: Set<TerminalId>;
		tmRepositoryTransactionBlockIds: Set<TmRepositoryTransactionBlockId>;
	} {
		const notFoundConnectionClaimMap                                           =
			      new Map(verifiedConnectionClaimMap)
		const terminalIds: Set<TerminalId>                                         = new Set()
		const tmRepositoryTransactionBlockIds: Set<TmRepositoryTransactionBlockId> = new Set()

		// For every found terminal repository map, make sure that the client terminal
		// still has the write permissions to all repositories it is trying to write to
		for (const [terminalId, permissionByRepositoryId] of permissionMapByTerminalAndRepositoryIds) {
			terminalIds.add(terminalId)

			const verifiedLoginClaim: SyncConnectionClaim
				      = verifiedConnectionClaimMap.get(terminalId)
			notFoundConnectionClaimMap.delete(terminalId)

			const repoUpdateRequests: RepositoryUpdateRequest[]
				      = (<DataTransferMessageFromTM>verifiedLoginClaim.messageFromTM)
				.repositoryUpdateRequests

			// For every repository update request coming from a given client
			for (const repoUpdateRequest of repoUpdateRequests) {
				const repoPermission: TerminalRepositoryPermission
					      = permissionByRepositoryId.get(repoUpdateRequest.agtRepositoryId)
				if (!repoPermission) {
					const declinedTransSyncLogOutcomes: RepoTransBlockSyncOutcome[] =
						      this.utils.ensureChildArray(repoTransBlockSyncOutcomeMap, terminalId)
					this.declineTransSyncLog(terminalId, repoUpdateRequest, declinedTransSyncLogOutcomes,
						RepoTransBlockSyncOutcomeType.SYNC_FROM_TM_DENIED_REPOSITORY_NOT_FOUND)
					continue
				}
				if (repoPermission >= UserRepositoryPermission.WRITE) {
					tmRepositoryTransactionBlockIds.add(repoUpdateRequest.tmRepositoryTransactionBlockId)
				} else {
					const declinedTransSyncLogOutcomes: RepoTransBlockSyncOutcome[] =
						      this.utils.ensureChildArray(repoTransBlockSyncOutcomeMap, terminalId)
					this.declineTransSyncLog(terminalId, repoUpdateRequest, declinedTransSyncLogOutcomes,
						RepoTransBlockSyncOutcomeType.SYNC_FROM_TM_DENIED_NO_WRITE_PERMISSION)
				}
			}

			return {
				terminalIds,
				tmRepositoryTransactionBlockIds
			}
		}

		// For every sync connection that had no found repositories
		for (const [terminalId, recentConnectionClaim] of notFoundConnectionClaimMap) {
			const repoUpdateRequests: RepositoryUpdateRequest[]             = recentConnectionClaim[0][3]
			const declinedTransSyncLogOutcomes: RepoTransBlockSyncOutcome[] = []
			// For every repository that that was requested to be updated
			for (const repoUpdateRequest of repoUpdateRequests) {
				this.declineTransSyncLog(terminalId, repoUpdateRequest, declinedTransSyncLogOutcomes,
					RepoTransBlockSyncOutcomeType.SYNC_FROM_TM_DENIED_DATABASE_NOT_FOUND)
			}

			// [MessageFromTMOperation, TerminalCredentials, TmSharingMessageId,
			// RepositoryUpdateRequest[], AgtSharingMessageId[]]
			const messageFromTM      = <DataTransferMessageFromTM>recentConnectionClaim.messageFromTM
			const tmSharingMessageId = messageFromTM.tmSharingMessageId
			// Reply back with a Sync Denied message
			log.debug(`Connection denied - Terminal not found:
		TerminalId:         {1}
		TmSharingMessageId: {2}`,
				terminalId,
				tmSharingMessageId
			)
			recentConnectionClaim.connectionDataCallback(terminalId, false,
				<SyncNotificationMessageToTM>{
					contentType: MessageToTMContentType.SYNC_NOTIFICATION,
					tmSharingMessageId,
					// agtSharingMessageId: 0,
					// addDatetime: 0,
					syncOutcomes: declinedTransSyncLogOutcomes
				})
		}
	}

	private async addRepositoryTransactionBlocks(
		terminalIds: Set<TerminalId>,
		tmRepositoryTransactionBlockIds: Set<TmRepositoryTransactionBlockId>,
		permissionMapByTerminalAndRepositoryIds: Map<TerminalId, Map<AgtRepositoryId, TerminalRepositoryPermission>>,
		verifiedConnectionClaimMap: Map<TerminalId, SyncConnectionClaim>,
		alreadySyncedInMessageTerminalIds: Set<TerminalId>,
		alreadySyncedInMessageTmSharingMessageIds: Set<TmSharingMessageId>,
		alreadySyncedMessageMapByTerminalIdAndTmSharingMessageId:
			Map<TerminalId, Map<TmSharingMessageId,
				SyncNotificationMessageToTM>>,
		repoTransBlockSyncOutcomeMap: Map<TerminalId, RepoTransBlockSyncOutcome[]>,
		successTransSyncOutcomes: RepoTransBlockSyncOutcome[],
		agtRepositoryTransactionBlockInserts: InsertAgtRepositoryTransactionBlock[]
	) {
		const existingAgtRepoTransBlockInfoMap = await this.agtRepoTransBlockDao
			.findExistingDataIdMap(terminalIds, tmRepositoryTransactionBlockIds)

		// For every found terminal repository map, make sure that the sent record
		// hasn't already been received
		for (const [terminalId, permissionMapForTerminal] of permissionMapByTerminalAndRepositoryIds) {
			const verifiedLoginClaim: SyncConnectionClaim
				      = verifiedConnectionClaimMap.get(terminalId)

			const messageFromTM = <DataTransferMessageFromTM>verifiedLoginClaim.messageFromTM

			const transSyncLogOutcomes =
				      this.utils.ensureChildArray(repoTransBlockSyncOutcomeMap, terminalId)
			for (const repoUpdateRequest of messageFromTM.repositoryUpdateRequests) {
				const repositoryId                   = repoUpdateRequest.agtRepositoryId
				const tmRepositoryTransactionBlockId = repoUpdateRequest.tmRepositoryTransactionBlockId
				const repoPermission                 = permissionMapForTerminal.get(repositoryId)
				if (repoPermission < UserRepositoryPermission.WRITE) {
					continue
				}
				if (this.messageAlreadySynced(existingAgtRepoTransBlockInfoMap, terminalId,
					tmRepositoryTransactionBlockId, verifiedConnectionClaimMap, alreadySyncedInMessageTerminalIds,
					alreadySyncedInMessageTmSharingMessageIds,
					alreadySyncedMessageMapByTerminalIdAndTmSharingMessageId, repoUpdateRequest)) {
					continue
				}

				const transSyncLogOutcome: RepoTransBlockSyncOutcome = {
					tmRepositoryTransactionBlockId,
					// agtRepositoryTransactionBlockId: null,
					syncOutcomeType: RepoTransBlockSyncOutcomeType.SYNC_FROM_TM_SUCCESSFUL
				}
				transSyncLogOutcomes.push(transSyncLogOutcome)
				successTransSyncOutcomes.push(transSyncLogOutcome)

				agtRepositoryTransactionBlockInserts.push([repositoryId, terminalId,
					ArchivingStatus.NOT_ARCHIVING, verifiedLoginClaim.loginClaimReceptionTime,
					true, tmRepositoryTransactionBlockId, repoUpdateRequest.repositoryTransactionBlockContents])
			}
		}
	}

	private messageAlreadySynced(
		existingDataIdMap: Map<TerminalId, Map<TmRepositoryTransactionBlockId,
			[AgtRepositoryTransactionBlockId, AgtRepositoryTransactionBlockAddDatetime]>>,
		terminalId: TerminalId,
		tmRepositoryTransactionBlockId: TmRepositoryTransactionBlockId,
		verifiedConnectionClaimMap: Map<TerminalId, SyncConnectionClaim>,
		alreadySyncedInMessageTerminalIds: Set<TerminalId>,
		alreadySyncedInMessageTmSharingMessageIds: Set<TmSharingMessageId>,
		alreadySyncedMessageMapByTerminalIdAndTmSharingMessageId: Map<TerminalId,
			Map<TmSharingMessageId, SyncNotificationMessageToTM>>,
		repoUpdateRequest: RepositoryUpdateRequest
	): boolean {
		const existingTmRepoTransBlockIdMap = existingDataIdMap.get(terminalId)

		// If the terminal has no synced messages for matching RepoTrans Blocks
		if (!existingTmRepoTransBlockIdMap) {
			return false
		}
		const repositoryTransactionBlockInfo = existingTmRepoTransBlockIdMap.get(tmRepositoryTransactionBlockId)

		// If the RepoTrans Block has not been processed
		if (!repositoryTransactionBlockInfo) {
			return false
		}

		const recentConnectionClaim: SyncConnectionClaim
			                  = verifiedConnectionClaimMap.get(terminalId)
		const messageFromTM = <DataTransferMessageFromTM>recentConnectionClaim.messageFromTM
		alreadySyncedInMessageTerminalIds.add(terminalId)
		const tmSharingMessageId = messageFromTM.tmSharingMessageId
		alreadySyncedInMessageTmSharingMessageIds.add(tmSharingMessageId)

		const alreadySyncedMessagesForTerminalId = this.utils.ensureChildJsMap(
			alreadySyncedMessageMapByTerminalIdAndTmSharingMessageId, terminalId)
		let alreadySyncedMessage: SyncNotificationMessageToTM
		                                         = alreadySyncedMessagesForTerminalId.get(tmSharingMessageId)
		if (!alreadySyncedMessage) {
			alreadySyncedMessage = {
				contentType: MessageToTMContentType.SYNC_NOTIFICATION,
				tmSharingMessageId,
				// agtAgtSharingMessageId: null,
				// addDatetime: repoTransBlockInfo[1],
				syncOutcomes: []
			}
			alreadySyncedMessagesForTerminalId.set(tmSharingMessageId, alreadySyncedMessage)
		}
		const agtRepositoryTransactionBlockId: AgtRepositoryTransactionBlockId = repositoryTransactionBlockInfo[0]
		const repositoryId                                                     = repoUpdateRequest.agtRepositoryId
		log.debug(`TmSharingMessage already synced:
		TerminalId:                  {1}
		AgtRepositoryId:                {2}
		AgtRepositoryTransactionBlockId:                {3}
		TmSharingMessageId:             {4}`,
			terminalId,
			repositoryId,
			agtRepositoryTransactionBlockId,
			tmSharingMessageId)
		alreadySyncedMessage.syncOutcomes.push({
			tmRepositoryTransactionBlockId,
			// agtRepositoryTransactionBlockId,
			syncOutcomeType: RepoTransBlockSyncOutcomeType.SYNC_FROM_TM_ALREADY_SYNCED
		})
		return true
	}

	private async respondToAlreadySyncedMessages(
		alreadySyncedInMessageTerminalIds: Set<TerminalId>,
		alreadySyncedInMessageTmSharingMessageIds: Set<TmSharingMessageId>,
		alreadySyncedMessageMapByTerminalIdAndTmSharingMessageId:
			Map<TerminalId, Map<TmSharingMessageId,
				SyncNotificationMessageToTM>>,
		verifiedConnectionClaimMap: Map<TerminalId, SyncConnectionClaim>
	) {

		// Find AgtSharingMessageIds for all already synced messages
		const agtAgtSharingMessageIdMapByTerminalIdAndTmSharingMessageId
			      : Map<TerminalId, Map<TmSharingMessageId, AgtSharingMessageId>>
			      = await this.agtSharingMessageDao.findIdMapByTerminalIdAndTmSharingMessageId(
			Array.from(alreadySyncedInMessageTerminalIds),
			Array.from(alreadySyncedInMessageTmSharingMessageIds)
		)

		// Respond for all already synced messages
		for (const [terminalId, alreadySyncMessageMapForTerminalId]
			of alreadySyncedMessageMapByTerminalIdAndTmSharingMessageId) {
			const agtAgtSharingMessageIdMapForTerminalId
				      = agtAgtSharingMessageIdMapByTerminalIdAndTmSharingMessageId.get(terminalId)
			const verifiedLoginClaim: SyncConnectionClaim
				      = verifiedConnectionClaimMap.get(terminalId)
			for (const [tmSharingMessageId, alreadySyncedMessage]
				of alreadySyncMessageMapForTerminalId) {
				const agtAgtSharingMessageId = agtAgtSharingMessageIdMapForTerminalId
					.get(tmSharingMessageId)
				// alreadySyncedMessage.agtAgtSharingMessageId = agtAgtSharingMessageId;

				log.debug(`Message already synced:
		TerminalId:        {1}
		AgtSharingMessageId: {2}
		TmSharingMessageId:   {3}`,
					terminalId,
					agtAgtSharingMessageId,
					tmSharingMessageId)
				verifiedLoginClaim.connectionDataCallback(terminalId, false, alreadySyncedMessage)
			}
		}
	}

	private async persistRepositoryTransactionBlocks(
		verifiedTerminalIds: TerminalId[],
		verifiedConnectionClaimMap: Map<TerminalId, SyncConnectionClaim>,
		agtRepositoryTransactionBlockInserts: InsertAgtRepositoryTransactionBlock[],
		successTransSyncOutcomes: RepoTransBlockSyncOutcome[]
	): Promise<Map<TerminalId, AgtSharingMessageId>> {
		// Mark the terminals from which the sync records came as already having received
		// those records
		const agtSharingMessageInserts: InsertAgtSharingMessage[] = verifiedTerminalIds.map(
			verifiedTerminalId => <InsertAgtSharingMessage>[
				verifiedTerminalId,
				(<DataTransferMessageFromTM>verifiedConnectionClaimMap.get(verifiedTerminalId)
					.messageFromTM).tmSharingMessageId,
				AgtSharingMessageAcknowledged.ACKNOWLEDGED,
			])

		const [agtSharingMessageIdMapByTerminalId, agtRepositoryTransactionBlockIds] = await Promise.all([
			this.agtSharingMessageDao.insertValues(agtSharingMessageInserts),
			this.agtRepoTransBlockDao.insertValues(agtRepositoryTransactionBlockInserts)
		])

		const syncLogInserts: InsertSyncLog[] = []
		for (let i = 0; i < agtRepositoryTransactionBlockIds.length; i++) {
			// Populate AgtRepositoryTransactionBlockId in outgoing TransLogSyncOutcome
			const agtRepositoryTransactionBlockId = agtRepositoryTransactionBlockIds[i]
			// successTransSyncOutcomes[i].agtRepositoryTransactionBlockId =
			// agtRepositoryTransactionBlockId; Add AgtSharingMessageId to new SyncLog insert
			// record
			const terminalId          = agtRepositoryTransactionBlockInserts[i][1]
			const agtSharingMessageId = agtSharingMessageIdMapByTerminalId[terminalId]
			syncLogInserts.push([
				agtRepositoryTransactionBlockId,
				// addDateTime,
				agtSharingMessageId,
			])
		}

		await this.syncLogDao.insertValues(syncLogInserts)

		return agtSharingMessageIdMapByTerminalId
	}

	private async updateAgtSharingMessages(// TODO: see if manual retry logic should be applied
		agtSharingMessageIdSet: Set<AgtSharingMessageId>,
		verifiedConnectionClaimMap: Map<TerminalId, SyncConnectionClaim>
	) {
		await this.tryToUpdateAgtSharingMessages(agtSharingMessageIdSet, verifiedConnectionClaimMap)
	}

	private async tryToUpdateAgtSharingMessages(
		agtSharingMessageIdSet: Set<AgtSharingMessageId>,
		verifiedConnectionClaimMap: Map<TerminalId, SyncConnectionClaim>
	) {
		await transactional(async () => {
			const sharingMessageMapByTerminalId = await this.agtSharingMessageDao.findNotSyncedByIdIn(
				Array.from(agtSharingMessageIdSet)
			)

			const verifiedAgtSharingMessageIdSet: Set<AgtSharingMessageId> = new Set()

			// For every found terminal sync log map, make sure that the client terminal
			// is trying to update its own terminal sync log records
			for (const [terminalId, sharingMessagesForTerminal] of sharingMessageMapByTerminalId) {
				const verifiedLoginClaim = verifiedConnectionClaimMap.get(terminalId)

				const agtSharingMessageIds: AgtSharingMessageId[] = (
					<DataTransferMessageFromTM>verifiedLoginClaim.messageFromTM).terminalSyncAcks

				for (const agtSharingMessageId of agtSharingMessageIds) {
					if (sharingMessagesForTerminal.has(agtSharingMessageId)) {
						verifiedAgtSharingMessageIdSet.add(agtSharingMessageId)
					}
				}
			}

			await this.agtSharingMessageDao.updateToAcked(Array.from(verifiedAgtSharingMessageIdSet))
		})
	}

	private async sendRecentChangesToVerifiedConnections(
		verifiedTerminalIds: TerminalId[],
		verifiedConnectionClaimMap: Map<TerminalId, SyncConnectionClaim>
	) {
		// TODO: see if manual retry logic should be applied
		await this.tryToSendRecentChangesToVerifiedConnections(
			verifiedTerminalIds, verifiedConnectionClaimMap, new Date().getTime())
	}

	private async tryToSendRecentChangesToVerifiedConnections(
		verifiedTerminalIds: TerminalId[],
		verifiedConnectionClaimMap: Map<TerminalId, SyncConnectionClaim>,
		addDateTime: number
	) {
		const repoTransBlocksToSendByTerminalId: Map<TerminalId, AugmentedRepoTransBlockMessageToTM[]> = await
			this.agtRepoTransBlockDao.getAllAgtRepositoryTransactionBlocksToSend(verifiedTerminalIds)

		// Sync Logs to insert for the sent records
		const syncLogsByTerminalIdMap: Map<TerminalId, InsertSyncLog[]> = new Map()

		// Agt Sharing Messages to insert for the sent records
		const agtSharingMessagesToInsert: InsertAgtSharingMessage[] = []

		// For every terminal's set of RepositoryTransactionBlocks to send (not yet
		// acknowledged by the terminal as having been received).
		for (const [terminalId, repoTransBlocksToSend] of repoTransBlocksToSendByTerminalId) {

			const connectionClaim    = verifiedConnectionClaimMap.get(terminalId)
			const tmSharingMessageId = (<DataTransferMessageFromTM>connectionClaim.messageFromTM)
				.tmSharingMessageId
			agtSharingMessagesToInsert.push([
				terminalId, tmSharingMessageId, AgtSharingMessageAcknowledged.NOT_ACKNOWLEDGED])
			const syncLogsForTerminalId: InsertSyncLog[] = []
			syncLogsByTerminalIdMap.set(terminalId, syncLogsForTerminalId)


			// For every RepositoryTransactionBlock
			for (const repoTransBlockToSend of repoTransBlocksToSend) {
				syncLogsForTerminalId.push(<any>[repoTransBlockToSend.agtRepositoryTransactionBlockId])

				const connectionClaim = verifiedConnectionClaimMap.get(terminalId)
				connectionClaim.connectionDataCallback(terminalId, false, repoTransBlockToSend)
			}
		}

		const agtSharingMessageIdMapByTerminalId = await this.agtSharingMessageDao.insertValues(agtSharingMessagesToInsert)

		// For every AgtSharingMessage record created (and hence for every terminal
		// from which we have received a message in this processing loop)
		let syncLogInserts: InsertSyncLog[] = []
		for (const [terminalId, agtSharingMessageId] of agtSharingMessageIdMapByTerminalId) {

			// Add sync
			const syncLogsForTerminalId = syncLogsByTerminalIdMap.get(terminalId)
			syncLogsForTerminalId.forEach(
				insertSyncLog => {
					insertSyncLog.push(agtSharingMessageId)
				})
			syncLogInserts = syncLogInserts.concat(syncLogsForTerminalId)
			//
			// const connectionClaim = verifiedConnectionClaimMap.get(terminalId);
			// /*
			// 			RepoTransBlockSyncOutcome = [
			// 				TmRepositoryTransactionBlockId,
			// 				RepoTransBlockSyncOutcomeType
			// 			]
			// 			*/
			//
			// // Agt Sharing Message id
			//
			// const tmSharingMessageId: TmSharingMessageId       = connectionClaim[0][2];
			// const agtRepoTransBlockAddDatetime: AgtRepositoryTransactionBlockAddDatetime
			//  = null; const transactionLogSyncOutcomes: RepoTransBlockSyncOutcome[] = [ null,
			// agtSharingMessageId, null];  /*RepoTransBlockSyncOutcome = [
			// TmRepositoryTransactionBlockId, AgtSharingMessageId,
			// RepoTransBlockSyncOutcomeType ];*/  const createdTerminalRepoTransBlockMessage:
			// SyncLogNotification = [ OutClientMessageType.DATABASE_SYNC_LOG,
			// tmSharingMessageId, addDatetime, transactionLogSyncOutcomes ]; const callback
			//                                       = connectionClaim[1]; // Also send back a
			// Agt Sharing Message notification for the corresponding data // that was received
			// from this connection callback(terminalId, false,
			// createdTerminalRepoTransBlockMessage);
		}

		await this.syncLogDao.insertValues(syncLogInserts)
	}

}

DI.set(SYNC_CONNECTION_PROCESSOR, SyncConnectionProcessor)

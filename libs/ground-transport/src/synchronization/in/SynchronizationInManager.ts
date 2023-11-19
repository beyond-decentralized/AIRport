import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import { IRepositoryTransactionHistoryDao } from '@airport/holding-pattern/dist/app/bundle'
import { ITransactionContext, ITransactionManager } from '@airport/terminal-map'
import { ISyncInChecker } from './checker/SyncInChecker'
import { ICrossMessageRepositoryAndMemberInfo, ITwoStageSyncedInDataProcessor } from './TwoStageSyncedInDataProcessor'
import { IDataCheckResult } from './checker/SyncInDataChecker'
import { ISyncInApplicationVersionChecker } from './checker/SyncInApplicationVersionChecker'
import { IRepositoryLoader } from '@airport/air-traffic-control'
import { IRepository, SyncRepositoryMessage, RepositoryTransactionHistory_GUID, Repository_GUID, IRepositoryTransactionHistory, RepositoryMember_PublicSigningKey, IRepositoryMember } from '@airport/ground-control'
import { v4 as guidv4 } from "uuid";

/**
 * The manager for synchronizing data coming in  to Terminal (TM)
 */
export interface ISynchronizationInManager {

	receiveMessages(
		messageMapByGUID: Map<string, SyncRepositoryMessage>,
		context: ITransactionContext
	): Promise<void>;

}

export interface ISyncTransactionContext
	extends ITransactionContext {
	doNotLoadReferences: boolean,
	isNestedLoadCall: boolean,
	currentlyLoadedRepsitoryGUIDSet: Set<Repository_GUID>
}

/**
 * Synchronization in Manager implementation.
 */
@Injected()
export class SynchronizationInManager
	implements ISynchronizationInManager {

	@Inject()
	repositoryLoader: IRepositoryLoader

	@Inject()
	repositoryTransactionHistoryDao: IRepositoryTransactionHistoryDao

	@Inject()
	syncInApplicationVersionChecker: ISyncInApplicationVersionChecker

	@Inject()
	syncInChecker: ISyncInChecker

	@Inject()
	transactionManager: ITransactionManager

	@Inject()
	twoStageSyncedInDataProcessor: ITwoStageSyncedInDataProcessor

	async receiveMessages(
		messageMapByGUID: Map<RepositoryTransactionHistory_GUID, SyncRepositoryMessage>,
		context: ISyncTransactionContext
	): Promise<void> {
		const syncTimestamp = new Date().getTime()

		const existingRepositoryTransactionHistories = await this.repositoryTransactionHistoryDao
			.findWhereGUIDsIn([...messageMapByGUID.keys()], context)
		for (const existingRepositoryTransactionHistory of existingRepositoryTransactionHistories) {
			messageMapByGUID.delete(existingRepositoryTransactionHistory.GUID)
		}

		if (!messageMapByGUID.size) {
			return
		}

		const orderedMessages = this.timeOrderMessages(messageMapByGUID)

		const immediateProcessingMessages: SyncRepositoryMessage[] = []
		const delayedProcessingMessages: SyncRepositoryMessage[] = []

		const repositoryAndMemberInfo: ICrossMessageRepositoryAndMemberInfo = {
			loadedRepositoryGUIDSet: new Set(),
			missingRepositoryMap: new Map(),
			newMemberMap: new Map(),
			newRepositoryMemberInvitationMap: new Map(),
			newRepositoryMemberAcceptanceMap: new Map()
		}

		const addedRepositoryMapByGUID: Map<Repository_GUID, IRepository> = new Map()
		const addedRepositoryMembersByRepositoryGUIDAndPublicSigningKey:
			Map<Repository_GUID, Map<RepositoryMember_PublicSigningKey, IRepositoryMember>> = new Map()

		// Split up messages by type
		for (const message of orderedMessages) {
			if (!this.isValidLastChangeTime(
				syncTimestamp, message.syncTimestamp, 'Sync Timestamp')) {
				continue
			}

			if (!this.isValidLastChangeTime(
				message.syncTimestamp, message.data.history.saveTimestamp,
				'Sync Timestamp', 'Save Timestamp')) {
				continue
			}

			let processMessage = true
			let dataCheckResult: IDataCheckResult
			// Each message may come from different source but some may not
			// be valid transaction on essential record creation separately
			// for each message
			// FIXME: right now this does not start a nested trasaction
			// - make it do so
			await this.transactionManager.transactInternal(async (transaction) => {
				dataCheckResult = await this.syncInChecker.checkMessage(
					message, addedRepositoryMapByGUID,
					addedRepositoryMembersByRepositoryGUIDAndPublicSigningKey, context)
				if (!dataCheckResult.isValid) {
					transaction.rollback(null, context)
					processMessage = false
					return
				}
				this.aggregateRepositoryAndMemberInfo(
					dataCheckResult, repositoryAndMemberInfo)
			}, null, context)
			if (!processMessage) {
				continue
			}

			message.data.history.operationHistory = dataCheckResult.forImmediateProcessing
			immediateProcessingMessages.push({
				...message,
				data: {
					...message.data,
					history: message.data.history
				}
			})
			if (dataCheckResult.forDelayedProcessing.length) {
				const history: IRepositoryTransactionHistory = {
					...message.data.history,
					GUID: guidv4(),
					operationHistory: dataCheckResult.forDelayedProcessing
				}
				for (const operationHistory of dataCheckResult.forDelayedProcessing) {
					operationHistory.repositoryTransactionHistory = history
				}
				delayedProcessingMessages.push({
					...message,
					data: {
						...message.data,
						history
					}
				})
			}
		}
		if (immediateProcessingMessages.length) {
			await this.transactionManager.transactInternal(async (transaction, context) => {
				transaction.isRepositorySync = true
				await this.twoStageSyncedInDataProcessor.syncMessages(
					immediateProcessingMessages, repositoryAndMemberInfo,
					transaction, context)
			}, null, context)
		}

		await this.wait(2000)

		await this.processDelayedMessages(
			delayedProcessingMessages, context)

		if (!context.doNotLoadReferences) {
			await this.loadReferencedRepositories([
				...immediateProcessingMessages,
				...delayedProcessingMessages
			], context)
		}
	}

	private aggregateRepositoryAndMemberInfo(
		dataCheckResult: IDataCheckResult,
		repositoryAndMemberInfo: ICrossMessageRepositoryAndMemberInfo
	): void {
		for (const loadedRepositoryGUID of dataCheckResult.loadedRepositoryGUIDS) {
			repositoryAndMemberInfo.loadedRepositoryGUIDSet
				.add(loadedRepositoryGUID)
		}
		for (const missingRepository of dataCheckResult.missingRepositories) {
			repositoryAndMemberInfo.missingRepositoryMap
				.set(missingRepository.GUID, missingRepository)
		}
		for (const newMember of dataCheckResult.newMembers) {
			repositoryAndMemberInfo.newMemberMap
				.set(newMember.memberPublicSigningKey, newMember)
		}
		for (const newRepositoryMemberAcceptance of dataCheckResult.newRepositoryMemberAcceptances) {
			repositoryAndMemberInfo.newRepositoryMemberAcceptanceMap
				.set(newRepositoryMemberAcceptance.invitationPublicSigningKey,
					newRepositoryMemberAcceptance
				)
		}
		for (const newRepositoryMemberInvitation of dataCheckResult.newRepositoryMemberInvitations) {
			repositoryAndMemberInfo.newRepositoryMemberInvitationMap
				.set(newRepositoryMemberInvitation.invitationPublicSigningKey,
					newRepositoryMemberInvitation)
		}
	}

	private timeOrderMessages(
		messageMapByGUID: Map<string, SyncRepositoryMessage>
	): SyncRepositoryMessage[] {
		const messages: SyncRepositoryMessage[] = [...messageMapByGUID.values()]

		messages.sort((message1, message2) => {
			if (message1.syncTimestamp < message2.syncTimestamp) {
				return -1
			}
			if (message1.syncTimestamp > message2.syncTimestamp) {
				return 1
			}
			let history1 = message1.data.history
			let history2 = message2.data.history
			if (history1.saveTimestamp < history2.saveTimestamp) {
				return -1
			}
			if (history1.saveTimestamp > history2.saveTimestamp) {
				return 1
			}

			return 0
		})

		return messages
	}

	private isValidLastChangeTime(
		syncTimestamp: number,
		remoteTimestamp: number,
		remoteFieldName: string,
		syncFieldName = 'Reception Time:'
	): boolean {
		if (syncTimestamp < remoteTimestamp) {
			console.error(`Message ${syncFieldName} is less than
			the ${remoteFieldName} in received message:
				${syncFieldName}:               ${syncTimestamp}
				${remoteFieldName}:           ${remoteTimestamp}
			`)

			return false
		}

		return true
	}

	private wait(
		milliseconds: number
	): Promise<void> {
		return new Promise(resolve => {
			setTimeout(_ => {
				resolve()
			}, milliseconds)
		})
	}

	private async processDelayedMessages(
		delayedProcessingMessages: SyncRepositoryMessage[],
		context: ITransactionContext
	): Promise<void> {
		const delayedProcessingMessagesWithValidApps: SyncRepositoryMessage[] = []
		for (const message of delayedProcessingMessages) {
			const data = message.data
			// Possibly load (remotely) and install new apps - delayed processing
			// messages deal with other repositories that might include data from
			// other apps - other repositories might be referencing records in
			// the synched repositories (which may not be aware of the apps the
			// other repositories where created with)
			const applicationCheckMap = await this.syncInApplicationVersionChecker.ensureApplicationVersions(
				data.referencedApplicationVersions, data.applications, context
			)
			if (applicationCheckMap) {
				this.syncInChecker.checkReferencedApplicationRelations(data)
				delayedProcessingMessagesWithValidApps.push(message)

			}
		}
		if (delayedProcessingMessagesWithValidApps.length) {
			await this.transactionManager.transactInternal(async (transaction, context) => {
				transaction.isRepositorySync = true
				await this.twoStageSyncedInDataProcessor.syncMessages(
					delayedProcessingMessagesWithValidApps, null,
					transaction, context)
			}, null, context)
		}
	}

	private async loadReferencedRepositories(
		messages: SyncRepositoryMessage[],
		context: ISyncTransactionContext
	): Promise<void> {
		const repositoryMapByGUID: Map<Repository_GUID, IRepository> = new Map()
		const currentlyLoadedRepsitoryGUIDSet = context.currentlyLoadedRepsitoryGUIDSet
		for (const message of messages) {
			for (const repository of message.data.referencedRepositories) {
				if (!repositoryMapByGUID.has(repository.GUID)
					&& (!currentlyLoadedRepsitoryGUIDSet || !currentlyLoadedRepsitoryGUIDSet
						.has(repository.GUID))) {
					repositoryMapByGUID.set(repository.GUID, repository)
				}
			}
		}
		for (const repository of repositoryMapByGUID.values()) {
			await this.repositoryLoader.loadRepository(
				repository.GUID,
				{
					...context,
					doNotLoadReferences: true,
					isNestedLoadCall: true
				}
			)
		}
	}

}

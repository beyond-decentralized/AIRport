import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import { IRepositoryTransactionHistoryDao } from '@airport/holding-pattern/dist/app/bundle'
import { ITransactionContext, ITransactionManager } from '@airport/terminal-map'
import { ISyncInChecker } from './checker/SyncInChecker'
import { ICrossMessageRepositoryAndMemberInfo, ITwoStageSyncedInDataProcessor } from './TwoStageSyncedInDataProcessor'
import { ISyncInApplicationVersionChecker } from './checker/SyncInApplicationVersionChecker'
import { IRepositoryLoader } from '@airport/air-traffic-control'
import { IRepository, SyncRepositoryMessage, RepositoryTransactionHistory_GUID, Repository_GUID, RepositoryMember_PublicSigningKey, IRepositoryMember } from '@airport/ground-control'
import { IRepositoriesAndMembersCheckResult } from './checker/SyncInRepositoryChecker'

/**
 * The manager for synchronizing data coming in  to Terminal (TM)
 */
export interface ISynchronizationInManager {

	receiveMessages(
		messageMapByGUID: Map<RepositoryTransactionHistory_GUID, SyncRepositoryMessage>,
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
		messageMapByRepositoryTransactionHistoryGUID: Map<RepositoryTransactionHistory_GUID, SyncRepositoryMessage>,
		context: ISyncTransactionContext,
		syncTimestamp = new Date().getTime()
	): Promise<void> {
		if (!messageMapByRepositoryTransactionHistoryGUID.size) {
			return
		}

		const existingRepositoryTransactionHistories = await this.repositoryTransactionHistoryDao
			.findWhereGUIDsIn([...messageMapByRepositoryTransactionHistoryGUID.keys()], context)
		for (const existingRepositoryTransactionHistory of existingRepositoryTransactionHistories) {
			messageMapByRepositoryTransactionHistoryGUID.delete(existingRepositoryTransactionHistory.GUID)
		}

		if (!messageMapByRepositoryTransactionHistoryGUID.size) {
			return
		}

		const orderedMessages = this.timeOrderMessages(messageMapByRepositoryTransactionHistoryGUID)

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

		let areMessagesValid: boolean[] = []
		let areAppsLoaded = true
		let i = 0;
		// Split up messages by type
		for (; i < orderedMessages.length; i++) {
			const message = orderedMessages[i]
			if (!this.isValidLastChangeTime(
				syncTimestamp, message.syncTimestamp, 'Sync Timestamp')) {
				continue
			}

			if (!this.isValidLastChangeTime(
				message.syncTimestamp, message.data.history.saveTimestamp,
				'Sync Timestamp', 'Save Timestamp')) {
				continue
			}

			// Each message may come from different source but some may not
			// be valid transaction on essential record creation separately
			// for each message
			// FIXME: right now this does not start a nested trasaction
			// - make it do so
			await this.transactionManager.transactInternal(async (transaction) => {
				const messageCheckResult = await this.syncInChecker.checkMessage(
					message, addedRepositoryMapByGUID,
					addedRepositoryMembersByRepositoryGUIDAndPublicSigningKey, context)
				areAppsLoaded = messageCheckResult.areAppsLoaded
				areMessagesValid[i] = messageCheckResult.isValid
				if (!messageCheckResult.isValid || !areAppsLoaded) {
					transaction.rollback(null, context)
					return
				}
				this.aggregateRepositoryAndMemberInfo(
					messageCheckResult, repositoryAndMemberInfo)
			}, null, context)

			if (!areAppsLoaded) {
				break
			}
			if (!areMessagesValid[i]) {
				continue
			}

			immediateProcessingMessages.push({
				...message,
				data: {
					...message.data,
					history: message.data.history
				}
			})
		}

		if (!areAppsLoaded) {
			if (!areMessagesValid[i]) {
				i++
			}
			for (; i < orderedMessages.length; i++) {
				delayedProcessingMessages.push(orderedMessages[i])
			}
		}
		
		if (immediateProcessingMessages.length) {
			await this.transactionManager.transactInternal(async (transaction, context) => {
				transaction.isRepositorySync = true
				await this.twoStageSyncedInDataProcessor.syncMessages(
					immediateProcessingMessages, repositoryAndMemberInfo,
					transaction, context)
			}, null, context)

			if (!context.doNotLoadReferences) {
				await this.loadReferencedRepositories(
					immediateProcessingMessages, context)
			}
		}

		await this.processDelayedMessages(
			delayedProcessingMessages, syncTimestamp, context)
	}

	private aggregateRepositoryAndMemberInfo(
		dataCheckResult: IRepositoriesAndMembersCheckResult,
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

	private async processDelayedMessages(
		delayedProcessingMessages: SyncRepositoryMessage[],
		syncTimestamp: number,
		context: ISyncTransactionContext
	): Promise<void> {
		const delayedProcessingMessagesWithValidApps: SyncRepositoryMessage[] = []
		for (const message of delayedProcessingMessages) {
			const data = message.data
			// Install new apps
			const appInstalledIfNeeded = await this.syncInApplicationVersionChecker
				.installAndCheckApplications(data, context)
			if (appInstalledIfNeeded) {
				this.syncInChecker.checkReferencedApplicationRelations(data)
				delayedProcessingMessagesWithValidApps.push(message)
			}
		}
		const messageMapByRepositoryTransactionHistoryGUID: Map<RepositoryTransactionHistory_GUID, SyncRepositoryMessage>
			= new Map()
		for (const message of delayedProcessingMessagesWithValidApps) {
			messageMapByRepositoryTransactionHistoryGUID
				.set(message.data.history.GUID, message)
		}
		await this.receiveMessages(messageMapByRepositoryTransactionHistoryGUID,
			context, syncTimestamp)
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

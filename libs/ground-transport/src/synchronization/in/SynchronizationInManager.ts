import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import { RepositorySynchronizationMessage } from '@airport/arrivals-n-departures'
import { IRepositoryTransactionHistoryDao } from '@airport/holding-pattern/dist/app/bundle'
import { ITransactionContext, ITransactionManager } from '@airport/terminal-map'
import { ISyncInChecker } from './checker/SyncInChecker'
import { ITwoStageSyncedInDataProcessor } from './TwoStageSyncedInDataProcessor'
import { IDataCheckResult } from './checker/SyncInDataChecker'
import { ISyncInApplicationVersionChecker } from './checker/SyncInApplicationVersionChecker'

/**
 * The manager for synchronizing data coming in  to Terminal (TM)
 */
export interface ISynchronizationInManager {

	receiveMessages(
		messageMapByGUID: Map<string, RepositorySynchronizationMessage>,
		context: ITransactionContext
	): Promise<void>;

}

/**
 * Synchronization in Manager implementation.
 */
@Injected()
export class SynchronizationInManager
	implements ISynchronizationInManager {

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
		messageMapByGUID: Map<string, RepositorySynchronizationMessage>,
		context: ITransactionContext
	): Promise<void> {
		const syncTimestamp = new Date().getTime()

		const existingRepositoryTransactionHistories = await this.repositoryTransactionHistoryDao
			.findWhereGUIDsIn([...messageMapByGUID.keys()])
		for (const existingRepositoryTransactionHistory of existingRepositoryTransactionHistories) {
			messageMapByGUID.delete(existingRepositoryTransactionHistory.GUID)
		}

		if (!messageMapByGUID.size) {
			return
		}

		const orderedMessages = this.timeOrderMessages(messageMapByGUID)

		const immediateProcessingMessages: RepositorySynchronizationMessage[] = []
		const delayedProcessingMessages: RepositorySynchronizationMessage[] = []

		// Split up messages by type
		for (const message of orderedMessages) {
			if (!this.isValidLastChangeTime(
				syncTimestamp, message.syncTimestamp, 'Sync Timestamp')) {
				continue
			}

			if (!this.isValidLastChangeTime(
				message.syncTimestamp, message.history.saveTimestamp,
				'Sync Timestamp', 'Save Timestamp')) {
				continue
			}

			let processMessage = true
			let dataCheckResult: IDataCheckResult
			await this.transactionManager.transactInternal(async (transaction) => {
				dataCheckResult = await this.syncInChecker.checkMessage(message, context)
				if (!dataCheckResult.isValid) {
					transaction.rollback(null, context)
					processMessage = false
					return
				}
			}, null, context)
			if (processMessage) {
				immediateProcessingMessages.push({
					...message,
					history: {
						...message.history,
						operationHistory: dataCheckResult.forImmediateProcessing
					}
				})
				if (dataCheckResult.forDelayedProcessing.length) {
					delayedProcessingMessages.push({
						...message,
						history: {
							...message.history,
							operationHistory: dataCheckResult.forDelayedProcessing
						}
					})
				}
			}
		}
		await this.transactionManager.transactInternal(async (transaction, context) => {
			transaction.isSync = true
			await this.twoStageSyncedInDataProcessor.syncMessages(immediateProcessingMessages, transaction, context)
		}, null, context)


		const delayedProcessingMessagesWithValidApps: RepositorySynchronizationMessage[] = []
		for (const message of delayedProcessingMessages) {
			// Possibly load (remotely) and install new apps - delayed processing
			// messages deal with other repositories that might include data from
			// other apps - other repositories might be referencing records in
			// the synched repositories (which may not be aware of the apps the
			// other repositories where created with)
			if (await this.syncInApplicationVersionChecker.ensureApplicationVersions(
				message.referencedApplicationVersions, message.applications, context)) {
				delayedProcessingMessagesWithValidApps.push(message)
			}
		}
		if (delayedProcessingMessagesWithValidApps.length) {
			await this.transactionManager.transactInternal(async (transaction, context) => {
				transaction.isSync = true
				await this.twoStageSyncedInDataProcessor.syncMessages(
					delayedProcessingMessagesWithValidApps, transaction, context)
			}, null, context)
		}
	}

	private timeOrderMessages(
		messageMapByGUID: Map<string, RepositorySynchronizationMessage>
	): RepositorySynchronizationMessage[] {
		const messages: RepositorySynchronizationMessage[] = [...messageMapByGUID.values()]

		messages.sort((message1, message2) => {
			if (message1.syncTimestamp < message2.syncTimestamp) {
				return -1
			}
			if (message1.syncTimestamp > message2.syncTimestamp) {
				return 1
			}
			let history1 = message1.history
			let history2 = message2.history
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

}

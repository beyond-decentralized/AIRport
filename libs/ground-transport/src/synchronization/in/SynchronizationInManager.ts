import { RepositorySynchronizationMessage } from '@airport/arrivals-n-departures'
import {
	container,
	DEPENDENCY_INJECTION
} from '@airport/direction-indicator'
import { REPOSITORY_TRANSACTION_HISTORY_DAO } from '@airport/holding-pattern'
import { ITransactionContext } from '@airport/terminal-map'
import { transactional } from '@airport/tower'
import {
	SYNC_IN_CHECKER,
	SYNCHRONIZATION_IN_MANAGER,
	TWO_STAGE_SYNCED_IN_DATA_PROCESSOR
} from '../../tokens'


/**
 * The manager for synchronizing data coming in  to Terminal (TM)
 */
export interface ISynchronizationInManager {

	receiveMessages(
		messageMapByUuId: Map<string, RepositorySynchronizationMessage>,
		context: ITransactionContext
	): Promise<void>;

}

/**
 * Synchronization in Manager implementation.
 */
export class SynchronizationInManager
	implements ISynchronizationInManager {

	async receiveMessages(
		messageMapByUuId: Map<string, RepositorySynchronizationMessage>,
		context: ITransactionContext
	): Promise<void> {
		const syncTimestamp = new Date().getTime()

		const [repositoryTransactionHistoryDao, syncInChecker,
			twoStageSyncedInDataProcessor] = await container(this)
				.get(REPOSITORY_TRANSACTION_HISTORY_DAO, SYNC_IN_CHECKER, TWO_STAGE_SYNCED_IN_DATA_PROCESSOR)

		const existingRepositoryTransactionHistories = await repositoryTransactionHistoryDao
			.findWhereUuIdsIn([...messageMapByUuId.keys()])
		for (const existingRepositoryTransactionHistory of existingRepositoryTransactionHistories) {
			messageMapByUuId.delete(existingRepositoryTransactionHistory.uuId)
		}

		if (!messageMapByUuId.size) {
			return
		}

		let messagesToProcess: RepositorySynchronizationMessage[] = []

		const orderedMessages = this.timeOrderMessages(messageMapByUuId)

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
			await transactional(async (transaction) => {
				if (!await syncInChecker.checkMessage(message)) {
					transaction.rollback(null, context)
					processMessage = false
					return
				}
			})
			if (processMessage) {
				messagesToProcess.push(message)
			}
		}


		await transactional(async (transaction) => {
			transaction.isSync = true
			await twoStageSyncedInDataProcessor.syncMessages(messagesToProcess, transaction)
		}, context)
	}

	private timeOrderMessages(
		messageMapByUuId: Map<string, RepositorySynchronizationMessage>
	): RepositorySynchronizationMessage[] {
		const messages: RepositorySynchronizationMessage[] = [...messageMapByUuId.values()]

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

DEPENDENCY_INJECTION.set(SYNCHRONIZATION_IN_MANAGER, SynchronizationInManager)

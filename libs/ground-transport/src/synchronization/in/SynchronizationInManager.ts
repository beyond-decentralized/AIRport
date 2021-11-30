import { TerminalMessage } from '@airport/arrivals-n-departures'
import {
	container,
	DI
} from '@airport/di'
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
		messages: TerminalMessage[]
	): Promise<void>;

}

/**
 * Synchronization in Manager implementation.
 */
export class SynchronizationInManager
	implements ISynchronizationInManager {

	/**
	 * @param {TerminalMessage[][]} incomingMessages    All of the incoming messages, grouped
	 *   into arrays by sharing node
	 * @returns {Promise<void>}   Return when all of the messages have been processed
	 */
	async receiveMessages(
		messages: TerminalMessage[]
	): Promise<void> {
		const [syncInChecker, twoStageSyncedInDataProcessor] = await container(this)
			.get(SYNC_IN_CHECKER, TWO_STAGE_SYNCED_IN_DATA_PROCESSOR)

		const syncTimestamp = new Date().getTime()

		// Split up messages by type
		for (let i = 0; i < messages.length; i++) {
			const message = messages[i]
			if (!this.isValidLastChangeTime(
				syncTimestamp, message.syncTimestamp, 'Sync Timestamp')) {
				continue
			}

			if (!this.isValidLastChangeTime(
				message.syncTimestamp, message.history.saveTimestamp,
				'Sync Timestamp', 'Save Timestamp')) {
				continue
			}

			await transactional(async (transaction) => {
				if (!await syncInChecker.checkMessage(message)) {
					transaction.rollback()
					return
				}
				await twoStageSyncedInDataProcessor.syncDataMessage(message)
			})
		}
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

DI.set(SYNCHRONIZATION_IN_MANAGER, SynchronizationInManager)

import { transactional } from '@airport/tower';
/**
 * Synchronization in Manager implementation.
 */
export class SynchronizationInManager {
    async receiveMessages(messageMapByUuId, context) {
        const syncTimestamp = new Date().getTime();
        const existingRepositoryTransactionHistories = await this.repositoryTransactionHistoryDao
            .findWhereUuIdsIn([...messageMapByUuId.keys()]);
        for (const existingRepositoryTransactionHistory of existingRepositoryTransactionHistories) {
            messageMapByUuId.delete(existingRepositoryTransactionHistory.uuId);
        }
        if (!messageMapByUuId.size) {
            return;
        }
        let messagesToProcess = [];
        const orderedMessages = this.timeOrderMessages(messageMapByUuId);
        // Split up messages by type
        for (const message of orderedMessages) {
            if (!this.isValidLastChangeTime(syncTimestamp, message.syncTimestamp, 'Sync Timestamp')) {
                continue;
            }
            if (!this.isValidLastChangeTime(message.syncTimestamp, message.history.saveTimestamp, 'Sync Timestamp', 'Save Timestamp')) {
                continue;
            }
            let processMessage = true;
            await transactional(async (transaction) => {
                if (!await this.syncInChecker.checkMessage(message)) {
                    transaction.rollback(null, context);
                    processMessage = false;
                    return;
                }
            });
            if (processMessage) {
                messagesToProcess.push(message);
            }
        }
        await transactional(async (transaction) => {
            transaction.isSync = true;
            await this.twoStageSyncedInDataProcessor.syncMessages(messagesToProcess, transaction);
        }, context);
    }
    timeOrderMessages(messageMapByUuId) {
        const messages = [...messageMapByUuId.values()];
        messages.sort((message1, message2) => {
            if (message1.syncTimestamp < message2.syncTimestamp) {
                return -1;
            }
            if (message1.syncTimestamp > message2.syncTimestamp) {
                return 1;
            }
            let history1 = message1.history;
            let history2 = message2.history;
            if (history1.saveTimestamp < history2.saveTimestamp) {
                return -1;
            }
            if (history1.saveTimestamp > history2.saveTimestamp) {
                return 1;
            }
            return 0;
        });
        return messages;
    }
    isValidLastChangeTime(syncTimestamp, remoteTimestamp, remoteFieldName, syncFieldName = 'Reception Time:') {
        if (syncTimestamp < remoteTimestamp) {
            console.error(`Message ${syncFieldName} is less than
			the ${remoteFieldName} in received message:
				${syncFieldName}:               ${syncTimestamp}
				${remoteFieldName}:           ${remoteTimestamp}
			`);
            return false;
        }
        return true;
    }
}
//# sourceMappingURL=SynchronizationInManager.js.map
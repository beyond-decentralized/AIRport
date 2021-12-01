import { container, DI } from '@airport/di';
import { REPOSITORY_TRANSACTION_HISTORY_DAO } from '@airport/holding-pattern';
import { transactional } from '@airport/tower';
import { SYNC_IN_CHECKER, SYNCHRONIZATION_IN_MANAGER, TWO_STAGE_SYNCED_IN_DATA_PROCESSOR } from '../../tokens';
/**
 * Synchronization in Manager implementation.
 */
export class SynchronizationInManager {
    async receiveMessages(messageMapByUuId) {
        const syncTimestamp = new Date().getTime();
        const [repositoryTransactionHistoryDao, syncInChecker, twoStageSyncedInDataProcessor] = await container(this)
            .get(REPOSITORY_TRANSACTION_HISTORY_DAO, SYNC_IN_CHECKER, TWO_STAGE_SYNCED_IN_DATA_PROCESSOR);
        const existingRepositoryTransactionHistories = await repositoryTransactionHistoryDao
            .findWhereUuIdIn([...messageMapByUuId.keys()]);
        for (const existingRepositoryTransactionHistory of existingRepositoryTransactionHistories) {
            messageMapByUuId.delete(existingRepositoryTransactionHistory.uuId);
        }
        if (!messageMapByUuId.size) {
            return;
        }
        // TODO: add a signature check and prioritize adding of repository actors
        // as a different message
        // each actor will have a public key that they will distribute
        // each message is signed with the private key and the initial
        // message for repository is CREATE_REPOSITORY with the public key of the owner user
        let messagesToProcess = [];
        // Split up messages by type
        for (const message of messageMapByUuId.values()) {
            if (!this.isValidLastChangeTime(syncTimestamp, message.syncTimestamp, 'Sync Timestamp')) {
                continue;
            }
            if (!this.isValidLastChangeTime(message.syncTimestamp, message.history.saveTimestamp, 'Sync Timestamp', 'Save Timestamp')) {
                continue;
            }
            let processMessage = true;
            await transactional(async (transaction) => {
                if (!await syncInChecker.checkMessage(message)) {
                    transaction.rollback();
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
            await twoStageSyncedInDataProcessor.syncMessages(messagesToProcess, transaction);
        });
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
DI.set(SYNCHRONIZATION_IN_MANAGER, SynchronizationInManager);
//# sourceMappingURL=SynchronizationInManager.js.map
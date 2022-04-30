var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/air-control';
/**
 * Synchronization in Manager implementation.
 */
let SynchronizationInManager = class SynchronizationInManager {
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
            await this.transactionManager.transactInternal(async (transaction) => {
                if (!await this.syncInChecker.checkMessage(message)) {
                    transaction.rollback(null, context);
                    processMessage = false;
                    return;
                }
            }, context);
            if (processMessage) {
                messagesToProcess.push(message);
            }
        }
        await this.transactionManager.transactInternal(async (transaction) => {
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
};
__decorate([
    Inject()
], SynchronizationInManager.prototype, "repositoryTransactionHistoryDao", void 0);
__decorate([
    Inject()
], SynchronizationInManager.prototype, "syncInChecker", void 0);
__decorate([
    Inject()
], SynchronizationInManager.prototype, "transactionManager", void 0);
__decorate([
    Inject()
], SynchronizationInManager.prototype, "twoStageSyncedInDataProcessor", void 0);
SynchronizationInManager = __decorate([
    Injected()
], SynchronizationInManager);
export { SynchronizationInManager };
//# sourceMappingURL=SynchronizationInManager.js.map
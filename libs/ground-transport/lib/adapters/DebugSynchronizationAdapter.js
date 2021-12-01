import { DI } from "@airport/di";
import { DEBUG_SYNCHRONIZATION_ADAPTER } from "../tokens";
export class DebugSynchronizationAdapter {
    async getTransactionsForRepository(source, uuId) {
        return null;
    }
    async sendTransactions(repositorySource, messagesByRepository) {
        for (const [repositoryUuid, messages] of messagesByRepository) {
            await this.sendTransactionsForRepository(repositorySource, repositoryUuid, messages);
        }
        return false;
    }
    async sendTransactionsForRepository(repositorySource, repositoryUuId, repositoryTransactionHistories) {
        // TODO: obtain syncTimestamp from the source and populate in message objects
        return false;
    }
}
DI.set(DEBUG_SYNCHRONIZATION_ADAPTER, DebugSynchronizationAdapter);
//# sourceMappingURL=DebugSynchronizationAdapter.js.map
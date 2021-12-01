import { DI } from "@airport/di";
import { DEBUG_SYNCHRONIZATION_ADAPTER } from "../tokens";
export class DebugSynchronizationAdapter {
    async getTransactionsForRepository(source, uuId) {
        return null;
    }
    async sendTransactionsForRepository(source, uuId, repositoryTransactionHistories) {
        return false;
    }
}
DI.set(DEBUG_SYNCHRONIZATION_ADAPTER, DebugSynchronizationAdapter);
//# sourceMappingURL=DebugSynchronizationAdapter.js.map
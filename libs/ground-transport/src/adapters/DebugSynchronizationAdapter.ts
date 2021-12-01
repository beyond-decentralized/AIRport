import { RepositorySynchronizationMessage } from "@airport/arrivals-n-departures";
import { DI } from "@airport/di";
import { IRepositoryTransactionHistory } from "@airport/holding-pattern";
import { DEBUG_SYNCHRONIZATION_ADAPTER } from "../tokens";
import { ISynchronizationAdapter } from "./ISynchronizationAdapter";

export class DebugSynchronizationAdapter
    implements ISynchronizationAdapter {


    async getTransactionsForRepository(
        source: string,
        uuId: string
    ): Promise<RepositorySynchronizationMessage> {
        return null
    }


    async sendTransactionsForRepository(
        source: string,
        uuId: string,
        repositoryTransactionHistories: IRepositoryTransactionHistory[]
    ): Promise<boolean> {
        return false
    }

}
DI.set(DEBUG_SYNCHRONIZATION_ADAPTER, DebugSynchronizationAdapter)

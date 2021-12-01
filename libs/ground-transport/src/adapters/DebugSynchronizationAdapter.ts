import { RepositorySynchronizationMessage } from "@airport/arrivals-n-departures";
import { DI } from "@airport/di";
import {
    IRepositoryTransactionHistory,
    Repository_Source,
    Repository_UuId
} from "@airport/holding-pattern";
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

    async sendTransactions(
        repositorySource: Repository_Source,
        messagesByRepository: Map<Repository_UuId, RepositorySynchronizationMessage[]>
    ): Promise<boolean> {

        for (const [repositoryUuid, messages] of messagesByRepository) {
            await this.sendTransactionsForRepository(repositorySource, repositoryUuid, messages)
        }

        return false
    }

    async sendTransactionsForRepository(
        repositorySource: Repository_Source,
        repositoryUuId: Repository_UuId,
        repositoryTransactionHistories: RepositorySynchronizationMessage[]
    ): Promise<boolean> {
        // TODO: obtain syncTimestamp from the source and populate in message objects
        return false
    }

}
DI.set(DEBUG_SYNCHRONIZATION_ADAPTER, DebugSynchronizationAdapter)

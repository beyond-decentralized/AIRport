import { RepositorySynchronizationMessage } from "@airport/arrivals-n-departures";
import { IRepositoryTransactionHistory } from "@airport/holding-pattern";

export interface ISynchronizationAdapter {

    getTransactionsForRepository(
        source: string,
        uuId: string
    ): Promise<RepositorySynchronizationMessage>


    sendTransactionsForRepository(
        source: string,
        uuId: string,
        repositoryTransactionHistories: IRepositoryTransactionHistory[]
    ): Promise<boolean>

}

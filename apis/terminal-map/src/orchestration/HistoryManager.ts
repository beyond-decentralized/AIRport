import { TransactionType } from "@airport/ground-control";
import type {
    IActor,
    IRepositoryTransactionHistory,
    ITransactionHistory,
    RepositoryId
} from "@airport/holding-pattern";

export interface IHistoryManager {

    getNewTransHistory(
        transactionType: TransactionType
    ): Promise<ITransactionHistory>;

    getNewRepoTransHistory(
        transactionHistory: ITransactionHistory,
        repositoryId: RepositoryId,
        actor: IActor
    ): Promise<IRepositoryTransactionHistory>;

}

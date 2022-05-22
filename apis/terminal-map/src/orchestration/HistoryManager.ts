import { TransactionType } from "@airport/ground-control";
import type {
    IActor,
    IRepositoryTransactionHistory,
    ITransactionHistory,
    Repository_Id
} from "@airport/holding-pattern";
import { IOperationContext } from "../processing/OperationContext";

export interface IHistoryManager {

    getNewTransactionHistory(
        transactionType: TransactionType
    ): Promise<ITransactionHistory>;

    getNewRepositoryTransactionHistory(
        transactionHistory: ITransactionHistory,
        repositoryId: Repository_Id,
        context: IOperationContext
    ): Promise<IRepositoryTransactionHistory>;

}

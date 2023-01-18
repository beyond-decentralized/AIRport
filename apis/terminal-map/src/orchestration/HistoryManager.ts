import { IRepositoryTransactionHistory, ITransactionHistory, Repository_LocalId, TransactionType } from "@airport/ground-control";
import { IOperationContext } from "../processing/OperationContext";

export interface IHistoryManager {

    getNewTransactionHistory(
        transactionType: TransactionType
    ): Promise<ITransactionHistory>;

    getNewRepositoryTransactionHistory(
        transactionHistory: ITransactionHistory,
        repositoryId: Repository_LocalId,
        context: IOperationContext
    ): Promise<IRepositoryTransactionHistory>;

}

import { IActor, IRepositoryTransactionHistory, ITransactionHistory, Repository_LocalId, TransactionType } from "@airport/ground-control";
import { IOperationContext } from "../processing/OperationContext";
import { ITransactionContext } from "./TransactionManager";

export interface IHistoryManager {

    getNewTransactionHistory(
        transactionType: TransactionType
    ): Promise<ITransactionHistory>;

    getRepositoryTransactionHistory(
        transactionHistory: ITransactionHistory,
        repositoryLocalId: Repository_LocalId,
        actor: IActor,
        context: IOperationContext & ITransactionContext
    ): Promise<IRepositoryTransactionHistory>

}

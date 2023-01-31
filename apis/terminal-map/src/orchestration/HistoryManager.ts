import { IActor, IRepositoryTransactionHistory, ITransactionHistory, Repository_LocalId, TransactionType } from "@airport/ground-control";
import { IOperationContext } from "../processing/IOperationContext";
import { ITransactionContext } from "./ITransactionManager";

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

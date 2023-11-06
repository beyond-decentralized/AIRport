import { IRepository, IRepositoryMember, IRepositoryTransactionHistory, ITransactionHistory, Repository_LocalId, TransactionType } from "@airport/ground-control";
import { IOperationContext } from "../processing/IOperationContext";
import { ITransactionContext } from "./ITransactionManager";
import { IContext } from "@airport/direction-indicator";

export interface IHistoryManager {

    ensureRepositoryMembers(
        repositoryTransactionHistories: IRepositoryTransactionHistory[],
        context: IContext
    ): Promise<{
        repositoryMapByLid: Map<Repository_LocalId, IRepository>
        selfJoinRepositoryMembersToCreate: IRepositoryMember[]
    }>

    getNewTransactionHistory(
        transactionType: TransactionType
    ): Promise<ITransactionHistory>;

    getRepositoryTransactionHistory(
        transactionHistory: ITransactionHistory,
        repositoryLid: Repository_LocalId,
        context: IOperationContext & ITransactionContext
    ): Promise<IRepositoryTransactionHistory>

}

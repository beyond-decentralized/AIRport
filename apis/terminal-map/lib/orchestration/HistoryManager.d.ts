import { TransactionType } from "@airport/ground-control";
import type { IRepositoryTransactionHistory, ITransactionHistory, Repository_Id } from "@airport/holding-pattern";
import { IOperationContext } from "../processing/OperationContext";
export interface IHistoryManager {
    getNewTransHistory(transactionType: TransactionType): Promise<ITransactionHistory>;
    getNewRepositoryTransactionHistory(transactionHistory: ITransactionHistory, repositoryId: Repository_Id, context: IOperationContext): Promise<IRepositoryTransactionHistory>;
}
//# sourceMappingURL=HistoryManager.d.ts.map
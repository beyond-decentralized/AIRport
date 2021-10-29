import { TransactionType } from "@airport/ground-control";
import type { IActor, IRepositoryTransactionHistory, ITransactionHistory, Repository_Id } from "@airport/holding-pattern";
export interface IHistoryManager {
    getNewTransHistory(transactionType: TransactionType): Promise<ITransactionHistory>;
    getNewRepoTransHistory(transactionHistory: ITransactionHistory, repositoryId: Repository_Id, actor: IActor): Promise<IRepositoryTransactionHistory>;
}
//# sourceMappingURL=HistoryManager.d.ts.map
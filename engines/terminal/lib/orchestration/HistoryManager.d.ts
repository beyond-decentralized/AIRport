import { TransactionType } from '@airport/ground-control';
import { IActor, IRepositoryTransactionHistory, ITransactionHistory, RepositoryId } from '@airport/holding-pattern';
import { IHistoryManager } from '@airport/terminal-map';
export declare class HistoryManager implements IHistoryManager {
    getNewTransHistory(transactionType?: TransactionType): Promise<ITransactionHistory>;
    getNewRepoTransHistory(transactionHistory: ITransactionHistory, repositoryId: RepositoryId, actor: IActor): Promise<IRepositoryTransactionHistory>;
}
//# sourceMappingURL=HistoryManager.d.ts.map
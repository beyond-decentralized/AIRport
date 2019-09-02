import { TransactionType } from '@airport/ground-control';
import { IActor, IRepositoryTransactionHistory, ITransactionHistory, RepositoryId } from '@airport/holding-pattern';
export interface IHistoryManager {
    getNewTransHistory(transactionType: TransactionType): Promise<ITransactionHistory>;
    getNewRepoTransHistory(transactionHistory: ITransactionHistory, repositoryId: RepositoryId, actor: IActor): Promise<IRepositoryTransactionHistory>;
}
export declare class HistoryManager implements IHistoryManager {
    getNewTransHistory(transactionType?: TransactionType): Promise<ITransactionHistory>;
    getNewRepoTransHistory(transactionHistory: ITransactionHistory, repositoryId: RepositoryId, actor: IActor): Promise<IRepositoryTransactionHistory>;
}

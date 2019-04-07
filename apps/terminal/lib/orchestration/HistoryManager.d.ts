import { TransactionType } from '@airport/ground-control';
import { IActor, IRepository, IRepositoryTransactionHistory, ITransactionHistory } from '@airport/holding-pattern';
export interface IHistoryManager {
    getNewTransHistory(transactionType: TransactionType): Promise<ITransactionHistory>;
    getNewRepoTransHistory(transactionHistory: ITransactionHistory, repository: IRepository, actor: IActor): Promise<IRepositoryTransactionHistory>;
}
export declare class HistoryManager implements IHistoryManager {
    private transHistoryDuo;
    constructor();
    getNewTransHistory(transactionType?: TransactionType): Promise<ITransactionHistory>;
    getNewRepoTransHistory(transactionHistory: ITransactionHistory, repository: IRepository, actor: IActor): Promise<IRepositoryTransactionHistory>;
}

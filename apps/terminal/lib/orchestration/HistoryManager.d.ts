import { TransactionType } from '@airport/ground-control';
import { IActor, IRepository, IRepositoryTransactionHistory, ITransactionHistory } from '@airport/holding-pattern';
export interface IHistoryManager {
    getNewTransHistory(transactionType: TransactionType): ITransactionHistory;
    getNewRepoTransHistory(transactionHistory: ITransactionHistory, repository: IRepository, actor: IActor): IRepositoryTransactionHistory;
}
export declare class HistoryManager implements IHistoryManager {
    private operHistoryDmo;
    private recHistoryDmo;
    private repoTransHistoryDmo;
    private transHistoryDmo;
    constructor();
    getNewTransHistory(transactionType?: TransactionType): ITransactionHistory;
    getNewRepoTransHistory(transactionHistory: ITransactionHistory, repository: IRepository, actor: IActor): IRepositoryTransactionHistory;
}

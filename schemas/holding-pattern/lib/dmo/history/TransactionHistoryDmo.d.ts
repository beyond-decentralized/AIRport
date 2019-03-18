import { TransactionType } from '@airport/ground-control';
import { BaseTransactionHistoryDmo, IActor, IRepository, IRepositoryTransactionHistory, ITransactionHistory } from '../../generated/generated';
export interface ITransactionHistoryDmo {
    getNewRecord(transactionType?: TransactionType): ITransactionHistory;
    getRepositoryTransaction(transactionHistory: ITransactionHistory, repository: IRepository, actor: IActor): IRepositoryTransactionHistory;
}
export declare class TransactionHistoryDmo extends BaseTransactionHistoryDmo implements ITransactionHistoryDmo {
    private repoTransHistoryDmo;
    constructor();
    getNewRecord(transactionType?: TransactionType): ITransactionHistory;
    getRepositoryTransaction(transactionHistory: ITransactionHistory, repository: IRepository, actor: IActor): IRepositoryTransactionHistory;
}

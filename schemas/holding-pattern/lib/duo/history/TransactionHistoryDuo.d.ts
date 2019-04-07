import { TransactionType } from '@airport/ground-control';
import { BaseTransactionHistoryDuo, IActor, IRepository, IRepositoryTransactionHistory, ITransactionHistory } from '../../generated/generated';
export interface ITransactionHistoryDuo {
    getNewRecord(transactionType?: TransactionType): ITransactionHistory;
    getRepositoryTransaction(transactionHistory: ITransactionHistory, repository: IRepository, actor: IActor): IRepositoryTransactionHistory;
}
export declare class TransactionHistoryDuo extends BaseTransactionHistoryDuo implements ITransactionHistoryDuo {
    private repoTransHistoryDuo;
    constructor();
    getNewRecord(transactionType?: TransactionType): ITransactionHistory;
    getRepositoryTransaction(transactionHistory: ITransactionHistory, repository: IRepository, actor: IActor): IRepositoryTransactionHistory;
}

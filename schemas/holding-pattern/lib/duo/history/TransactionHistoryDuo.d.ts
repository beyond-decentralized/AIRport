import { TransactionType } from '@airport/ground-control';
import { BaseTransactionHistoryDuo, IActor, IRepository, IRepositoryTransactionHistory, ITransactionHistory } from '../../generated/generated';
import { IRepositoryTransactionHistoryDuo } from './RepositoryTransactionHistoryDuo';
export interface ITransactionHistoryDuo {
    getNewRecord(transactionType?: TransactionType): ITransactionHistory;
    getRepositoryTransaction(transactionHistory: ITransactionHistory, repository: IRepository, actor: IActor, repoTransHistoryDuo: IRepositoryTransactionHistoryDuo): IRepositoryTransactionHistory;
}
export declare class TransactionHistoryDuo extends BaseTransactionHistoryDuo implements ITransactionHistoryDuo {
    getNewRecord(transactionType?: TransactionType): ITransactionHistory;
    getRepositoryTransaction(transactionHistory: ITransactionHistory, repository: IRepository, actor: IActor, repoTransHistoryDuo: IRepositoryTransactionHistoryDuo): IRepositoryTransactionHistory;
}

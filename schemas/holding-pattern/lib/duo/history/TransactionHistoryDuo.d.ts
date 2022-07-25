import { TransactionType } from '@airport/ground-control';
import { IRepositoryTransactionHistory, ITransactionHistory } from '../../generated/generated';
import { Repository_LocalId } from '../../types';
import { IRepositoryTransactionHistoryDuo } from './RepositoryTransactionHistoryDuo';
export interface ITransactionHistoryDuo {
    getNewRecord(transactionType?: TransactionType): ITransactionHistory;
    getRepositoryTransaction(transactionHistory: ITransactionHistory, repositoryId: Repository_LocalId, isRepositoryCreation: boolean): IRepositoryTransactionHistory;
}
export declare class TransactionHistoryDuo implements ITransactionHistoryDuo {
    repositoryTransactionHistoryDuo: IRepositoryTransactionHistoryDuo;
    getNewRecord(transactionType?: TransactionType): ITransactionHistory;
    getRepositoryTransaction(transactionHistory: ITransactionHistory, repositoryId: Repository_LocalId, isRepositoryCreation: boolean): IRepositoryTransactionHistory;
}
//# sourceMappingURL=TransactionHistoryDuo.d.ts.map
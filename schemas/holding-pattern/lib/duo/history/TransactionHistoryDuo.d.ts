import { TransactionType } from '@airport/ground-control';
import { Repository_Id } from '../../ddl/ddl';
import { BaseTransactionHistoryDuo, IRepositoryTransactionHistory, ITransactionHistory } from '../../generated/generated';
import { IRepositoryTransactionHistoryDuo } from './RepositoryTransactionHistoryDuo';
export interface ITransactionHistoryDuo {
    getNewRecord(transactionType?: TransactionType): ITransactionHistory;
    getRepositoryTransaction(transactionHistory: ITransactionHistory, repositoryId: Repository_Id, isRepositoryCreation: boolean): IRepositoryTransactionHistory;
}
export declare class TransactionHistoryDuo extends BaseTransactionHistoryDuo implements ITransactionHistoryDuo {
    repositoryTransactionHistoryDuo: IRepositoryTransactionHistoryDuo;
    getNewRecord(transactionType?: TransactionType): ITransactionHistory;
    getRepositoryTransaction(transactionHistory: ITransactionHistory, repositoryId: Repository_Id, isRepositoryCreation: boolean): IRepositoryTransactionHistory;
}
//# sourceMappingURL=TransactionHistoryDuo.d.ts.map
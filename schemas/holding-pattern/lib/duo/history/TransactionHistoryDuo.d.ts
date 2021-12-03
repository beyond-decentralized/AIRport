import { TransactionType } from '@airport/ground-control';
import { Repository_Id } from '../../ddl/ddl';
import { BaseTransactionHistoryDuo, IActor, IRepositoryTransactionHistory, ITransactionHistory } from '../../generated/generated';
import { IRepositoryTransactionHistoryDuo } from './RepositoryTransactionHistoryDuo';
export interface ITransactionHistoryDuo {
    getNewRecord(transactionType?: TransactionType): ITransactionHistory;
    getRepositoryTransaction(transactionHistory: ITransactionHistory, repositoryId: Repository_Id, actor: IActor, isRepositoryCreation: boolean, repoTransHistoryDuo: IRepositoryTransactionHistoryDuo): IRepositoryTransactionHistory;
}
export declare class TransactionHistoryDuo extends BaseTransactionHistoryDuo implements ITransactionHistoryDuo {
    getNewRecord(transactionType?: TransactionType): ITransactionHistory;
    getRepositoryTransaction(transactionHistory: ITransactionHistory, repositoryId: Repository_Id, actor: IActor, isRepositoryCreation: boolean, repoTransHistoryDuo: IRepositoryTransactionHistoryDuo): IRepositoryTransactionHistory;
}
//# sourceMappingURL=TransactionHistoryDuo.d.ts.map
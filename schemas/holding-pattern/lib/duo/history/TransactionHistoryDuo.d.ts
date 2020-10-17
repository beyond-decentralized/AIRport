import { TransactionType } from '@airport/ground-control';
import { RepositoryId } from '../../ddl/ddl';
import { BaseTransactionHistoryDuo, IActor, IRepositoryTransactionHistory, ITransactionHistory } from '../../generated/generated';
import { IRepositoryTransactionHistoryDuo } from './RepositoryTransactionHistoryDuo';
export interface ITransactionHistoryDuo {
    getNewRecord(transactionType?: TransactionType): ITransactionHistory;
    getRepositoryTransaction(transactionHistory: ITransactionHistory, repositoryId: RepositoryId, actor: IActor, repoTransHistoryDuo: IRepositoryTransactionHistoryDuo): IRepositoryTransactionHistory;
}
export declare class TransactionHistoryDuo extends BaseTransactionHistoryDuo implements ITransactionHistoryDuo {
    getNewRecord(transactionType?: TransactionType): ITransactionHistory;
    getRepositoryTransaction(transactionHistory: ITransactionHistory, repositoryId: RepositoryId, actor: IActor, repoTransHistoryDuo: IRepositoryTransactionHistoryDuo): IRepositoryTransactionHistory;
}
//# sourceMappingURL=TransactionHistoryDuo.d.ts.map
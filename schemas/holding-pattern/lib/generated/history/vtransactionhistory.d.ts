import { IEntityVDescriptor, IVNumberField, IVStringField } from '@airport/airbridge-validate';
import { RepositoryTransactionHistoryVDescriptor } from './vrepositorytransactionhistory';
import { RepositoryTransactionHistory } from '../../ddl/history/RepositoryTransactionHistory';
export interface TransactionHistoryVDescriptor<T> extends IEntityVDescriptor<T> {
    _localId?: number | IVNumberField;
    transactionType?: string | IVStringField;
    repositoryTransactionHistories?: RepositoryTransactionHistoryVDescriptor<RepositoryTransactionHistory>;
}
//# sourceMappingURL=vtransactionhistory.d.ts.map
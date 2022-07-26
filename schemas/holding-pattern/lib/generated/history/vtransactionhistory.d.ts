import { IEntityVDescriptor, IVNumberField, IVStringField } from '@airport/airbridge-validate';
import { RepositoryTransactionHistoryVDescriptor } from './vrepositorytransactionhistory';
export interface TransactionHistoryVDescriptor extends IEntityVDescriptor {
    _localId: number | IVNumberField;
    transactionType?: string | IVStringField;
    repositoryTransactionHistories?: RepositoryTransactionHistoryVDescriptor;
}
//# sourceMappingURL=vtransactionhistory.d.ts.map
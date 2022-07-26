import { IEntityVDescriptor, IVBooleanField, IVNumberField, IVStringField } from '@airport/airbridge-validate';
import { RepositoryVDescriptor } from '../repository/vrepository';
import { TransactionHistoryVDescriptor } from './vtransactionhistory';
import { OperationHistoryVDescriptor } from './voperationhistory';
export interface RepositoryTransactionHistoryVDescriptor extends IEntityVDescriptor {
    _localId: number | IVNumberField;
    repositoryTransactionType?: string | IVStringField;
    saveTimestamp?: number | IVNumberField;
    syncTimestamp?: number | IVNumberField;
    GUID?: string | IVStringField;
    isRepositoryCreation?: boolean | IVBooleanField;
    repository?: RepositoryVDescriptor;
    transactionHistory?: TransactionHistoryVDescriptor;
    operationHistory?: OperationHistoryVDescriptor;
}
//# sourceMappingURL=vrepositorytransactionhistory.d.ts.map
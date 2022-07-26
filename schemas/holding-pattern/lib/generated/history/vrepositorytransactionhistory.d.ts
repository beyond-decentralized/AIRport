import { IEntityVDescriptor, IVBooleanField, IVNumberField, IVStringField } from '@airport/airbridge-validate';
import { RepositoryVDescriptor } from '../repository/vrepository';
import { Repository } from '../../ddl/repository/Repository';
import { TransactionHistoryVDescriptor } from './vtransactionhistory';
import { TransactionHistory } from '../../ddl/history/TransactionHistory';
import { OperationHistoryVDescriptor } from './voperationhistory';
import { OperationHistory } from '../../ddl/history/OperationHistory';
export interface RepositoryTransactionHistoryVDescriptor<T> extends IEntityVDescriptor<T> {
    _localId?: number | IVNumberField;
    repositoryTransactionType?: string | IVStringField;
    saveTimestamp?: number | IVNumberField;
    syncTimestamp?: number | IVNumberField;
    GUID?: string | IVStringField;
    isRepositoryCreation?: boolean | IVBooleanField;
    repository?: RepositoryVDescriptor<Repository>;
    transactionHistory?: TransactionHistoryVDescriptor<TransactionHistory>;
    operationHistory?: OperationHistoryVDescriptor<OperationHistory>;
}
//# sourceMappingURL=vrepositorytransactionhistory.d.ts.map
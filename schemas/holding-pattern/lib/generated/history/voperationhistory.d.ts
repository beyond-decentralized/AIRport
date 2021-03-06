import { IEntityVDescriptor, IVNumberField, IVStringField } from '@airport/airbridge-validate';
import { ApplicationEntityVDescriptor, ApplicationEntity } from '@airport/airspace';
import { ActorVDescriptor } from '../infrastructure/vactor';
import { Actor } from '../../ddl/infrastructure/Actor';
import { RepositoryTransactionHistoryVDescriptor } from './vrepositorytransactionhistory';
import { RepositoryTransactionHistory } from '../../ddl/history/RepositoryTransactionHistory';
import { RecordHistoryVDescriptor } from './vrecordhistory';
import { RecordHistory } from '../../ddl/history/RecordHistory';
export interface OperationHistoryVDescriptor<T> extends IEntityVDescriptor<T> {
    _localId?: number | IVNumberField;
    orderNumber?: number | IVNumberField;
    changeType?: string | IVStringField;
    systemWideOperationId?: number | IVNumberField;
    entity?: ApplicationEntityVDescriptor<ApplicationEntity>;
    actor?: ActorVDescriptor<Actor>;
    repositoryTransactionHistory?: RepositoryTransactionHistoryVDescriptor<RepositoryTransactionHistory>;
    recordHistory?: RecordHistoryVDescriptor<RecordHistory>;
}
//# sourceMappingURL=voperationhistory.d.ts.map
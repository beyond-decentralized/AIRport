import { IEntityVDescriptor, IVNumberField, IVStringField } from '@airport/airbridge-validate';
import { ApplicationEntityVDescriptor } from '@airport/airspace';
import { ActorVDescriptor } from '../infrastructure/vactor';
import { RepositoryTransactionHistoryVDescriptor } from './vrepositorytransactionhistory';
import { RecordHistoryVDescriptor } from './vrecordhistory';
export interface OperationHistoryVDescriptor extends IEntityVDescriptor {
    _localId: number | IVNumberField;
    orderNumber?: number | IVNumberField;
    changeType?: string | IVStringField;
    systemWideOperationId?: number | IVNumberField;
    entity?: ApplicationEntityVDescriptor;
    actor?: ActorVDescriptor;
    repositoryTransactionHistory?: RepositoryTransactionHistoryVDescriptor;
    recordHistory?: RecordHistoryVDescriptor;
}
//# sourceMappingURL=voperationhistory.d.ts.map
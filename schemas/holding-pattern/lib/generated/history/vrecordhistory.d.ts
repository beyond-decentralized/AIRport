import { IEntityVDescriptor, IVNumberField } from '@airport/airbridge-validate';
import { ActorVDescriptor } from '../infrastructure/vactor';
import { OperationHistoryVDescriptor } from './voperationhistory';
import { RecordHistoryNewValueVDescriptor } from './vrecordhistorynewvalue';
import { RecordHistoryOldValueVDescriptor } from './vrecordhistoryoldvalue';
export interface RecordHistoryVDescriptor extends IEntityVDescriptor {
    _localId: number | IVNumberField;
    _actorRecordId?: number | IVNumberField;
    actor?: ActorVDescriptor;
    operationHistory?: OperationHistoryVDescriptor;
    newValues?: RecordHistoryNewValueVDescriptor;
    oldValues?: RecordHistoryOldValueVDescriptor;
}
//# sourceMappingURL=vrecordhistory.d.ts.map
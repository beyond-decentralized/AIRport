import { IEntityVDescriptor, IVNumberField } from '@airport/airbridge-validate';
import { ActorVDescriptor } from '../infrastructure/vactor';
import { Actor } from '../../ddl/infrastructure/Actor';
import { OperationHistoryVDescriptor } from './voperationhistory';
import { OperationHistory } from '../../ddl/history/OperationHistory';
import { RecordHistoryNewValueVDescriptor } from './vrecordhistorynewvalue';
import { RecordHistoryNewValue } from '../../ddl/history/RecordHistoryNewValue';
import { RecordHistoryOldValueVDescriptor } from './vrecordhistoryoldvalue';
import { RecordHistoryOldValue } from '../../ddl/history/RecordHistoryOldValue';
export interface RecordHistoryVDescriptor<T> extends IEntityVDescriptor<T> {
    _localId?: number | IVNumberField;
    _actorRecordId?: number | IVNumberField;
    actor?: ActorVDescriptor<Actor>;
    operationHistory?: OperationHistoryVDescriptor<OperationHistory>;
    newValues?: RecordHistoryNewValueVDescriptor<RecordHistoryNewValue>;
    oldValues?: RecordHistoryOldValueVDescriptor<RecordHistoryOldValue>;
}
//# sourceMappingURL=vrecordhistory.d.ts.map
import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airbridge/validate';
import {
	ActorVDescriptor,
} from '../infrastructure/vActor';
import {
	Actor,
} from '../../ddl/infrastructure/Actor';
import {
	OperationHistoryVDescriptor,
} from './vOperationHistory';
import {
	OperationHistory,
} from '../../ddl/history/OperationHistory';
import {
	RecordHistoryNewValueVDescriptor,
} from './vRecordHistoryNewValue';
import {
	RecordHistoryNewValue,
} from '../../ddl/history/RecordHistoryNewValue';
import {
	RecordHistoryOldValueVDescriptor,
} from './vRecordHistoryOldValue';
import {
	RecordHistoryOldValue,
} from '../../ddl/history/RecordHistoryOldValue';
import {
	IRecordHistory,
} from './RecordHistory';



////////////////////
//  API INTERFACE //
////////////////////

export interface RecordHistoryVDescriptor<T>
    extends IEntityVDescriptor<T> {
	// Id Properties
	_localId?: number | IVNumberField;
	
	// Non-Id Properties
	_actorRecordId?: number | IVNumberField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	actor?: ActorVDescriptor<Actor>
	operationHistory?: OperationHistoryVDescriptor<OperationHistory>
	newValues?: RecordHistoryNewValueVDescriptor<RecordHistoryNewValue>
	oldValues?: RecordHistoryOldValueVDescriptor<RecordHistoryOldValue>

}



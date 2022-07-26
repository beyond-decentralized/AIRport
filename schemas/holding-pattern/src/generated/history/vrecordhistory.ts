import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airport/airbridge-validate';
import {
	ActorVDescriptor,
} from '../infrastructure/vactor';
import {
	IActor,
} from '../infrastructure/actor';
import {
	OperationHistoryVDescriptor,
} from './voperationhistory';
import {
	IOperationHistory,
} from './operationhistory';
import {
	RecordHistoryNewValueVDescriptor,
} from './vrecordhistorynewvalue';
import {
	IRecordHistoryNewValue,
} from './recordhistorynewvalue';
import {
	RecordHistoryOldValueVDescriptor,
} from './vrecordhistoryoldvalue';
import {
	IRecordHistoryOldValue,
} from './recordhistoryoldvalue';
import {
	IRecordHistory,
} from './recordhistory';



////////////////////
//  API INTERFACE //
////////////////////

export interface RecordHistoryVDescriptor
    extends IEntityVDescriptor {
	// Id Properties
	_localId: number | IVNumberField;
	
	// Non-Id Properties
	_actorRecordId?: number | IVNumberField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	actor?: ActorVDescriptor;
	operationHistory?: OperationHistoryVDescriptor;
	newValues?: RecordHistoryNewValueVDescriptor;
	oldValues?: RecordHistoryOldValueVDescriptor;

}



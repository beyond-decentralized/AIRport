import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airport/airbridge-validate';
import {
	RecordHistoryVDescriptor,
} from './vrecordhistory';
import {
	IRecordHistory,
} from './recordhistory';
import {
	IRecordHistoryOldValue,
} from './recordhistoryoldvalue';



////////////////////
//  API INTERFACE //
////////////////////

export interface RecordHistoryOldValueVDescriptor
    extends IEntityVDescriptor {
	// Id Properties
	columnIndex: number | IVNumberField;
	
	// Non-Id Properties
	oldValue?: any | IVUntypedField;

	// Id Relations - full property interfaces
	recordHistory?: RecordHistoryVDescriptor;

  // Non-Id relations (including OneToMany's)

}



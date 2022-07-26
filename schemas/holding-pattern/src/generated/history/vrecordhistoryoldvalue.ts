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
	RecordHistory,
} from '../../ddl/history/RecordHistory';
import {
	IRecordHistoryOldValue,
} from './recordhistoryoldvalue';



////////////////////
//  API INTERFACE //
////////////////////

export interface RecordHistoryOldValueVDescriptor<T>
    extends IEntityVDescriptor<T> {
	// Id Properties
	columnIndex?: number | IVNumberField;
	
	// Non-Id Properties
	oldValue?: any | IVUntypedField;

	// Id Relations - full property interfaces
	recordHistory?: RecordHistoryVDescriptor<RecordHistory>

  // Non-Id relations (including OneToMany's)

}



import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airbridge/validate';
import {
	RecordHistoryVDescriptor,
} from './VRecordHistory';
import {
	RecordHistory,
} from '../../../ddl/history/RecordHistory';
import {
	IRecordHistoryNewValue,
} from '../../entity/history/IRecordHistoryNewValue';



////////////////////
//  API INTERFACE //
////////////////////

export interface RecordHistoryNewValueVDescriptor<T>
    extends IEntityVDescriptor<T> {
	// Id Properties
	columnIndex?: number | IVNumberField;
	
	// Non-Id Properties
	newValue?: any | IVUntypedField;

	// Id Relations - full property interfaces
	recordHistory?: RecordHistoryVDescriptor<RecordHistory>

  // Non-Id relations (including OneToMany's)

}



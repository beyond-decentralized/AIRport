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
	IRecordHistoryNewValue,
} from './recordhistorynewvalue';



////////////////////
//  API INTERFACE //
////////////////////

export interface RecordHistoryNewValueVDescriptor
    extends IEntityVDescriptor {
	// Id Properties
	columnIndex: number | IVNumberField;
	
	// Non-Id Properties
	newValue?: any | IVUntypedField;

	// Id Relations - full property interfaces
	recordHistory?: RecordHistoryVDescriptor;

  // Non-Id relations (including OneToMany's)

}



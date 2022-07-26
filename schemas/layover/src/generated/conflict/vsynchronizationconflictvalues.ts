import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airport/airbridge-validate';
import {
	SynchronizationConflictVDescriptor,
} from './vsynchronizationconflict';
import {
	ISynchronizationConflict,
} from './synchronizationconflict';
import {
	ISynchronizationConflictValues,
} from './synchronizationconflictvalues';



////////////////////
//  API INTERFACE //
////////////////////

export interface SynchronizationConflictValuesVDescriptor
    extends IEntityVDescriptor {
	// Id Properties
	columnIndex: number | IVNumberField;
	
	// Non-Id Properties

	// Id Relations - full property interfaces
	synchronizationConflict?: SynchronizationConflictVDescriptor;

  // Non-Id relations (including OneToMany's)

}



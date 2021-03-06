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
	SynchronizationConflict,
} from '../../ddl/conflict/SynchronizationConflict';
import {
	ISynchronizationConflictValues,
} from './synchronizationconflictvalues';



////////////////////
//  API INTERFACE //
////////////////////

export interface SynchronizationConflictValuesVDescriptor<T>
    extends IEntityVDescriptor<T> {
	// Id Properties
	columnIndex?: number | IVNumberField;
	
	// Non-Id Properties

	// Id Relations - full property interfaces
	synchronizationConflict?: SynchronizationConflictVDescriptor<SynchronizationConflict>

  // Non-Id relations (including OneToMany's)

}



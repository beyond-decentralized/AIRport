import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airbridge/validate';
import {
	SynchronizationConflictVDescriptor,
} from './VSynchronizationConflict';
import {
	SynchronizationConflict,
} from '../../../ddl/conflict/SynchronizationConflict';
import {
	ISynchronizationConflictValues,
} from '../../entity/conflict/ISynchronizationConflictValues';



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



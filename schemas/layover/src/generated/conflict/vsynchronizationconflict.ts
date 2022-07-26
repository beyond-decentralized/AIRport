import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airport/airbridge-validate';
import {
	RepositoryVDescriptor,
	IRepository,
	RecordHistoryVDescriptor,
	IRecordHistory,
} from '@airport/holding-pattern';
import {
	SynchronizationConflictValuesVDescriptor,
} from './vsynchronizationconflictvalues';
import {
	ISynchronizationConflictValues,
} from './synchronizationconflictvalues';
import {
	ISynchronizationConflict,
} from './synchronizationconflict';



////////////////////
//  API INTERFACE //
////////////////////

export interface SynchronizationConflictVDescriptor
    extends IEntityVDescriptor {
	// Id Properties
	_localId: number | IVNumberField;
	
	// Non-Id Properties
	type?: string | IVStringField;
	acknowledged?: boolean | IVBooleanField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	repository?: RepositoryVDescriptor;
	overwrittenRecordHistory?: RecordHistoryVDescriptor;
	overwritingRecordHistory?: RecordHistoryVDescriptor;
	values?: SynchronizationConflictValuesVDescriptor;

}



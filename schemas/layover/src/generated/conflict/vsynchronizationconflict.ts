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
	Repository,
	RecordHistoryVDescriptor,
	RecordHistory,
} from '@airport/holding-pattern/lib/to_be_generated/runtime-index';
import {
	SynchronizationConflictValuesVDescriptor,
} from './vsynchronizationconflictvalues';
import {
	SynchronizationConflictValues,
} from '../../ddl/conflict/SynchronizationConflictValues';
import {
	ISynchronizationConflict,
} from './synchronizationconflict';



////////////////////
//  API INTERFACE //
////////////////////

export interface SynchronizationConflictVDescriptor<T>
    extends IEntityVDescriptor<T> {
	// Id Properties
	_localId?: number | IVNumberField;
	
	// Non-Id Properties
	type?: string | IVStringField;
	acknowledged?: boolean | IVBooleanField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	repository?: RepositoryVDescriptor<Repository>
	overwrittenRecordHistory?: RecordHistoryVDescriptor<RecordHistory>
	overwritingRecordHistory?: RecordHistoryVDescriptor<RecordHistory>
	values?: SynchronizationConflictValuesVDescriptor<SynchronizationConflictValues>

}



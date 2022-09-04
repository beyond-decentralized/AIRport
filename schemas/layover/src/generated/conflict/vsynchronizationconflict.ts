import {
	IEntityVDescriptor,
	IVBooleanField,
	IVDateField,
	IVNumberField,
	IVStringField,
	IVUntypedField,
} from '@airbridge/validate';
import {
	RepositoryVDescriptor,
	Repository,
	RecordHistoryVDescriptor,
	RecordHistory,
} from '@airport/holding-pattern/dist/app/bundle';
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



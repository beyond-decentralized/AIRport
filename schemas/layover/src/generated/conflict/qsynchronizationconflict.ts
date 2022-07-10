import {
	IQEntityInternal,
	IEntityIdProperties,
	IEntityCascadeGraph,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IEntitySelectProperties,
	IQBooleanField,
	IQDateField,
	IQNumberField,
	IQOneToManyRelation,
	IQStringField,
	IQUntypedField,
	IQEntity,
	IQRelation,
	IQAirEntityOneToManyRelation,
	IQAirEntityRelation,
	RawDelete,
	RawUpdate,
} from '@airport/tarmaq-query';
import {
	RepositoryGraph,
	RepositoryEId,
	RepositoryEOptionalId,
	RepositoryEUpdateProperties,
	RepositoryESelect,
	QRepository,
	QRepositoryQId,
	QRepositoryQRelation,
	IRepository,
	RecordHistoryGraph,
	RecordHistoryEId,
	RecordHistoryEOptionalId,
	RecordHistoryEUpdateProperties,
	RecordHistoryESelect,
	QRecordHistory,
	QRecordHistoryQId,
	QRecordHistoryQRelation,
	IRecordHistory,
} from '@airport/holding-pattern';
import {
	SynchronizationConflictValuesGraph,
	SynchronizationConflictValuesEId,
	SynchronizationConflictValuesEOptionalId,
	SynchronizationConflictValuesEUpdateProperties,
	SynchronizationConflictValuesESelect,
	QSynchronizationConflictValues,
	QSynchronizationConflictValuesQId,
	QSynchronizationConflictValuesQRelation,
} from './qsynchronizationconflictvalues';
import {
	ISynchronizationConflictValues,
} from './synchronizationconflictvalues';
import {
	ISynchronizationConflict,
} from './synchronizationconflict';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface SynchronizationConflictESelect
    extends IEntitySelectProperties, SynchronizationConflictEOptionalId {
	// Non-Id Properties
	type?: string | IQStringField;
	acknowledged?: boolean | IQBooleanField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	repository?: RepositoryESelect;
	overwrittenRecordHistory?: RecordHistoryESelect;
	overwritingRecordHistory?: RecordHistoryESelect;
	values?: SynchronizationConflictValuesESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SynchronizationConflictEId
    extends IEntityIdProperties {
	// Id Properties
	_localId: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface SynchronizationConflictEOptionalId {
	// Id Properties
	_localId?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SynchronizationConflictEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	type?: string | IQStringField;
	acknowledged?: boolean | IQBooleanField;

	// Non-Id Relations - _localIds only & no OneToMany's
	repository?: RepositoryEOptionalId;
	overwrittenRecordHistory?: RecordHistoryEOptionalId;
	overwritingRecordHistory?: RecordHistoryEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SynchronizationConflictGraph
	extends SynchronizationConflictEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	type?: string | IQStringField;
	acknowledged?: boolean | IQBooleanField;

	// Relations
	repository?: RepositoryGraph;
	overwrittenRecordHistory?: RecordHistoryGraph;
	overwritingRecordHistory?: RecordHistoryGraph;
	values?: SynchronizationConflictValuesGraph[];

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SynchronizationConflictEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	TYPE?: string | IQStringField;
	ACKNOWLEDGED?: boolean | IQBooleanField;
	REPOSITORY_LID?: number | IQNumberField;
	OVERWRITTEN_RECORD_HISTORY_LID?: number | IQNumberField;
	OVERWRITING_RECORD_HISTORY_LID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SynchronizationConflictECreateProperties
extends Partial<SynchronizationConflictEId>, SynchronizationConflictEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SynchronizationConflictECreateColumns
extends SynchronizationConflictEId, SynchronizationConflictEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QSynchronizationConflict extends IQEntity
{
	// Id Fields
	_localId: IQNumberField;

	// Id Relations

	// Non-Id Fields
	type: IQStringField;
	acknowledged: IQBooleanField;

	// Non-Id Relations
	repository: QRepositoryQRelation;
	overwrittenRecordHistory: QRecordHistoryQRelation;
	overwritingRecordHistory: QRecordHistoryQRelation;
	values: IQOneToManyRelation<QSynchronizationConflictValues>;

}


// Entity Id Interface
export interface QSynchronizationConflictQId
{
	
	// Id Fields
	_localId: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QSynchronizationConflictQRelation
	extends IQRelation<QSynchronizationConflict>, QSynchronizationConflictQId {
}


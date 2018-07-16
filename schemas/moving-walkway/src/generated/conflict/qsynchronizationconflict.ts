import {
	IQEntityInternal,
	IEntityIdProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IEntitySelectProperties,
	IEntityDatabaseFacade,
	IEntityFind,
	IEntityFindOne,
	IEntitySearch,
	IEntitySearchOne,
	IQBooleanField,
	IQDateField,
	IQNumberField,
	IQOneToManyRelation,
	IQStringField,
	IQUntypedField,
	QEntity,
	QRelation,
	RawDelete,
	RawUpdate,
} from '@airport/air-control';
import {
	IRepository,
	RepositoryEId,
	RepositoryEOptionalId,
	RepositoryEUpdateProperties,
	RepositoryESelect,
	QRepository,
	QRepositoryQId,
	QRepositoryQRelation,
	IRecordHistory,
	RecordHistoryEId,
	RecordHistoryEOptionalId,
	RecordHistoryEUpdateProperties,
	RecordHistoryESelect,
	QRecordHistory,
	QRecordHistoryQId,
	QRecordHistoryQRelation,
} from '@airport/holding-pattern';
import {
	ISynchronizationConflictValues,
	SynchronizationConflictValuesEId,
	SynchronizationConflictValuesEOptionalId,
	SynchronizationConflictValuesEUpdateProperties,
	SynchronizationConflictValuesESelect,
	QSynchronizationConflictValues,
	QSynchronizationConflictValuesQId,
	QSynchronizationConflictValuesQRelation,
} from './qsynchronizationconflictvalues';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ISynchronizationConflict {
	
	// Id Properties
	id?: number;

	// Id Relations

	// Non-Id Properties
	type?: number;

	// Non-Id Relations
	repository?: IRepository;
	overwrittenRecordHistory?: IRecordHistory;
	overwritingRecordHistory?: IRecordHistory;
	values?: ISynchronizationConflictValues[];

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface SynchronizationConflictESelect
    extends IEntitySelectProperties, SynchronizationConflictEOptionalId, SynchronizationConflictEUpdateProperties {
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
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface SynchronizationConflictEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SynchronizationConflictEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	type?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's
	repository?: RepositoryEOptionalId;
	overwrittenRecordHistory?: RecordHistoryEOptionalId;
	overwritingRecordHistory?: RecordHistoryEOptionalId;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SynchronizationConflictEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	TYPE?: number | IQNumberField;
	REPOSITORY_ID?: number | IQNumberField;
	OVERWRITTEN_RECORD_HISTORY_ID?: number | IQNumberField;
	OVERWRITING_RECORD_HISTORY_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SynchronizationConflictECreateProperties
extends SynchronizationConflictEId, SynchronizationConflictEUpdateProperties {
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
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSynchronizationConflict extends QEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	type: IQNumberField;

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
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QSynchronizationConflictQRelation
	extends QRelation<QSynchronizationConflict>, QSynchronizationConflictQId {
}


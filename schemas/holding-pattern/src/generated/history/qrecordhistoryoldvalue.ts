import {
	IQEntityInternal,
	IEntityIdProperties,
	IEntityCascadeGraph,
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
	IQEntity,
	IQRelation,
	IQAirEntityOneToManyRelation,
	IQAirEntityRelation,
	RawDelete,
	RawUpdate,
} from '@airport/air-traffic-control';
import {
	RecordHistoryGraph,
	RecordHistoryEId,
	RecordHistoryEOptionalId,
	RecordHistoryEUpdateProperties,
	RecordHistoryESelect,
	QRecordHistory,
	QRecordHistoryQId,
	QRecordHistoryQRelation,
} from './qrecordhistory';
import {
	IRecordHistory,
} from './recordhistory';
import {
	IRecordHistoryOldValue,
} from './recordhistoryoldvalue';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface RecordHistoryOldValueESelect
    extends IEntitySelectProperties, RecordHistoryOldValueEOptionalId {
	// Non-Id Properties
	oldValue?: any | IQUntypedField;

	// Id Relations - full property interfaces
	recordHistory?: RecordHistoryESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RecordHistoryOldValueEId
    extends IEntityIdProperties {
	// Id Properties
	columnIndex: number | IQNumberField;

	// Id Relations - Ids only
	recordHistory: RecordHistoryEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface RecordHistoryOldValueEOptionalId {
	// Id Properties
	columnIndex?: number | IQNumberField;

	// Id Relations - Ids only
	recordHistory?: RecordHistoryEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RecordHistoryOldValueEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	oldValue?: any | IQUntypedField;

	// Non-Id Relations - _localIds only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RecordHistoryOldValueGraph
	extends RecordHistoryOldValueEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	oldValue?: any | IQUntypedField;

	// Relations
	recordHistory?: RecordHistoryGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface RecordHistoryOldValueEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	OLD_VALUE?: any | IQUntypedField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RecordHistoryOldValueECreateProperties
extends Partial<RecordHistoryOldValueEId>, RecordHistoryOldValueEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RecordHistoryOldValueECreateColumns
extends RecordHistoryOldValueEId, RecordHistoryOldValueEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QRecordHistoryOldValue extends IQEntity
{
	// Id Fields
	columnIndex: IQNumberField;

	// Id Relations
	recordHistory: QRecordHistoryQRelation;

	// Non-Id Fields
	oldValue: IQUntypedField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QRecordHistoryOldValueQId
{
	
	// Id Fields
	columnIndex: IQNumberField;

	// Id Relations
	recordHistory: QRecordHistoryQId;


}

// Entity Relation Interface
export interface QRecordHistoryOldValueQRelation
	extends IQRelation<QRecordHistoryOldValue>, QRecordHistoryOldValueQId {
}


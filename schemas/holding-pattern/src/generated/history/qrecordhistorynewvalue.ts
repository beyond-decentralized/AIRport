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
	IQRepositoryEntityOneToManyRelation,
	IQRepositoryEntityRelation,
	RawDelete,
	RawUpdate,
} from '@airport/air-control';
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
	IRecordHistoryNewValue,
} from './recordhistorynewvalue';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface RecordHistoryNewValueESelect
    extends IEntitySelectProperties, RecordHistoryNewValueEOptionalId {
	// Non-Id Properties
	newValue?: any | IQUntypedField;

	// Id Relations - full property interfaces
	recordHistory?: RecordHistoryESelect;

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RecordHistoryNewValueEId
    extends IEntityIdProperties {
	// Id Properties
	columnIndex: number | IQNumberField;

	// Id Relations - Ids only
	recordHistory: RecordHistoryEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface RecordHistoryNewValueEOptionalId {
	// Id Properties
	columnIndex?: number | IQNumberField;

	// Id Relations - Ids only
	recordHistory?: RecordHistoryEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RecordHistoryNewValueEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	newValue?: any | IQUntypedField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RecordHistoryNewValueGraph
	extends RecordHistoryNewValueEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	newValue?: any | IQUntypedField;

	// Relations
	recordHistory?: RecordHistoryGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface RecordHistoryNewValueEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	NEW_VALUE?: any | IQUntypedField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RecordHistoryNewValueECreateProperties
extends Partial<RecordHistoryNewValueEId>, RecordHistoryNewValueEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RecordHistoryNewValueECreateColumns
extends RecordHistoryNewValueEId, RecordHistoryNewValueEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRecordHistoryNewValue extends IQEntity
{
	// Id Fields
	columnIndex: IQNumberField;

	// Id Relations
	recordHistory: QRecordHistoryQRelation;

	// Non-Id Fields
	newValue: IQUntypedField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QRecordHistoryNewValueQId
{
	
	// Id Fields
	columnIndex: IQNumberField;

	// Id Relations
	recordHistory: QRecordHistoryQId;


}

// Entity Relation Interface
export interface QRecordHistoryNewValueQRelation
	extends IQRelation<QRecordHistoryNewValue>, QRecordHistoryNewValueQId {
}


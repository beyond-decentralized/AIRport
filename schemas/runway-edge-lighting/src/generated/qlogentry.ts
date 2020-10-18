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
	RawDelete,
	RawUpdate,
} from '@airport/air-control';
import {
	LogEntryTypeGraph,
	LogEntryTypeEId,
	LogEntryTypeEOptionalId,
	LogEntryTypeEUpdateProperties,
	LogEntryTypeESelect,
	QLogEntryType,
	QLogEntryTypeQId,
	QLogEntryTypeQRelation,
} from './qlogentrytype';
import {
	LogEntryValueGraph,
	LogEntryValueEId,
	LogEntryValueEOptionalId,
	LogEntryValueEUpdateProperties,
	LogEntryValueESelect,
	QLogEntryValue,
	QLogEntryValueQId,
	QLogEntryValueQRelation,
} from './qlogentryvalue';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface LogEntryESelect
    extends IEntitySelectProperties, LogEntryEOptionalId {
	// Non-Id Properties
	timestamp?: Date | IQDateField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	type?: LogEntryTypeESelect;
	values?: LogEntryValueESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface LogEntryEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface LogEntryEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface LogEntryEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	timestamp?: Date | IQDateField;

	// Non-Id Relations - ids only & no OneToMany's
	type?: LogEntryTypeEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface LogEntryGraph
	extends IEntitySelectProperties, LogEntryEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	timestamp?: Date | IQDateField;

	// Relations
	type?: LogEntryTypeGraph;
	values?: LogEntryValueGraph[];

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface LogEntryEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	TIMESTAMP?: Date | IQDateField;
	LOG_ENTRY_TYPE_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface LogEntryECreateProperties
extends Partial<LogEntryEId>, LogEntryEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface LogEntryECreateColumns
extends LogEntryEId, LogEntryEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QLogEntry extends IQEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	timestamp: IQDateField;

	// Non-Id Relations
	type: QLogEntryTypeQRelation;
	values: IQOneToManyRelation<QLogEntryValue>;

}


// Entity Id Interface
export interface QLogEntryQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QLogEntryQRelation
	extends IQRelation<QLogEntry>, QLogEntryQId {
}


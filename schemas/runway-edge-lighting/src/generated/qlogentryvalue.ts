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
	ILogEntry,
	LogEntryECascadeGraph,
	LogEntryEId,
	LogEntryEOptionalId,
	LogEntryEUpdateProperties,
	LogEntryESelect,
	QLogEntry,
	QLogEntryQId,
	QLogEntryQRelation,
} from './qlogentry';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ILogEntryValue {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	position?: number;
	value?: any;

	// Non-Id Relations
	logEntry?: ILogEntry;

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface LogEntryValueESelect
    extends IEntitySelectProperties, LogEntryValueEOptionalId {
	// Non-Id Properties
	position?: number | IQNumberField;
	value?: any | IQUntypedField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	logEntry?: LogEntryESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface LogEntryValueEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface LogEntryValueEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface LogEntryValueEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	position?: number | IQNumberField;
	value?: any | IQUntypedField;

	// Non-Id Relations - ids only & no OneToMany's
	logEntry?: LogEntryEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface LogEntryValueECascadeGraph
	extends IEntityCascadeGraph {
	// Cascading Relations

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface LogEntryValueEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	POSITION?: number | IQNumberField;
	VALUE?: any | IQUntypedField;
	LOG_ENTRY_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface LogEntryValueECreateProperties
extends Partial<LogEntryValueEId>, LogEntryValueEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface LogEntryValueECreateColumns
extends LogEntryValueEId, LogEntryValueEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QLogEntryValue extends IQEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	position: IQNumberField;
	value: IQUntypedField;

	// Non-Id Relations
	logEntry: QLogEntryQRelation;

}


// Entity Id Interface
export interface QLogEntryValueQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QLogEntryValueQRelation
	extends IQRelation<QLogEntryValue>, QLogEntryValueQId {
}


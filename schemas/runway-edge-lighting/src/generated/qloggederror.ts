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
	LogEntryGraph,
	LogEntryEId,
	LogEntryEOptionalId,
	LogEntryEUpdateProperties,
	LogEntryESelect,
	QLogEntry,
	QLogEntryQId,
	QLogEntryQRelation,
} from './qlogentry';
import {
	LoggedErrorStackTraceGraph,
	LoggedErrorStackTraceEId,
	LoggedErrorStackTraceEOptionalId,
	LoggedErrorStackTraceEUpdateProperties,
	LoggedErrorStackTraceESelect,
	QLoggedErrorStackTrace,
	QLoggedErrorStackTraceQId,
	QLoggedErrorStackTraceQRelation,
} from './qloggederrorstacktrace';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface LoggedErrorESelect
    extends IEntitySelectProperties, LoggedErrorEOptionalId {
	// Non-Id Properties

	// Id Relations - full property interfaces
	logEntry?: LogEntryESelect;

  // Non-Id relations (including OneToMany's)
	stackTrace?: LoggedErrorStackTraceESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface LoggedErrorEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only
	logEntry: LogEntryEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface LoggedErrorEOptionalId {
	// Id Properties

	// Id Relations - Ids only
	logEntry?: LogEntryEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface LoggedErrorEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - ids only & no OneToMany's
	stackTrace?: LoggedErrorStackTraceEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface LoggedErrorGraph
	extends IEntitySelectProperties, LoggedErrorEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties

	// Relations
	logEntry?: LogEntryGraph;
	stackTrace?: LoggedErrorStackTraceGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface LoggedErrorEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	LOGGED_ERROR_STACK_TRACE_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface LoggedErrorECreateProperties
extends Partial<LoggedErrorEId>, LoggedErrorEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface LoggedErrorECreateColumns
extends LoggedErrorEId, LoggedErrorEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QLoggedError extends IQEntity
{
	// Id Fields

	// Id Relations
	logEntry: QLogEntryQRelation;

	// Non-Id Fields

	// Non-Id Relations
	stackTrace: QLoggedErrorStackTraceQRelation;

}


// Entity Id Interface
export interface QLoggedErrorQId
{
	
	// Id Fields

	// Id Relations
	logEntry: QLogEntryQId;


}

// Entity Relation Interface
export interface QLoggedErrorQRelation
	extends IQRelation<QLoggedError>, QLoggedErrorQId {
}


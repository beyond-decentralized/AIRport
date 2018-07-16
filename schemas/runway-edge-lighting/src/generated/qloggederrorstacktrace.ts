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


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ILoggedErrorStackTrace {
	
	// Id Properties
	id?: number;

	// Id Relations

	// Non-Id Properties
	stackHash?: string;
	stack?: string;

	// Non-Id Relations

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface LoggedErrorStackTraceESelect
    extends IEntitySelectProperties, LoggedErrorStackTraceEOptionalId, LoggedErrorStackTraceEUpdateProperties {
	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface LoggedErrorStackTraceEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface LoggedErrorStackTraceEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface LoggedErrorStackTraceEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	stackHash?: string | IQStringField;
	stack?: string | IQStringField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface LoggedErrorStackTraceEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	STACK_HASH?: string | IQStringField;
	STACK?: string | IQStringField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface LoggedErrorStackTraceECreateProperties
extends LoggedErrorStackTraceEId, LoggedErrorStackTraceEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface LoggedErrorStackTraceECreateColumns
extends LoggedErrorStackTraceEId, LoggedErrorStackTraceEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QLoggedErrorStackTrace extends QEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	stackHash: IQStringField;
	stack: IQStringField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QLoggedErrorStackTraceQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QLoggedErrorStackTraceQRelation
	extends QRelation<QLoggedErrorStackTrace>, QLoggedErrorStackTraceQId {
}


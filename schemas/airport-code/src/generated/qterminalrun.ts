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
	IQEntity,
	IQRelation,
	RawDelete,
	RawUpdate,
} from '@airport/air-control';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ITerminalRun {
	
	// Id Properties
	createTimestamp?: number;
	randomNumber?: number;

	// Id Relations

	// Non-Id Properties

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
export interface TerminalRunESelect
    extends IEntitySelectProperties, TerminalRunEOptionalId {
	// Non-Id Properties

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface TerminalRunEId
    extends IEntityIdProperties {
	// Id Properties
	createTimestamp: number | IQNumberField;
	randomNumber: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface TerminalRunEOptionalId {
	// Id Properties
	createTimestamp?: number | IQNumberField;
	randomNumber?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface TerminalRunEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface TerminalRunEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface TerminalRunECreateProperties
extends Partial<TerminalRunEId>, TerminalRunEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface TerminalRunECreateColumns
extends TerminalRunEId, TerminalRunEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QTerminalRun extends IQEntity
{
	// Id Fields
	createTimestamp: IQNumberField;
	randomNumber: IQNumberField;

	// Id Relations

	// Non-Id Fields

	// Non-Id Relations

}


// Entity Id Interface
export interface QTerminalRunQId
{
	
	// Id Fields
	createTimestamp: IQNumberField;
	randomNumber: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QTerminalRunQRelation
	extends IQRelation<QTerminalRun>, QTerminalRunQId {
}


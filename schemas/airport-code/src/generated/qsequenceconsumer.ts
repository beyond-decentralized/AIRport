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

export interface ISequenceConsumer {
	
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
export interface SequenceConsumerESelect
    extends IEntitySelectProperties, SequenceConsumerEOptionalId {
	// Non-Id Properties

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SequenceConsumerEId
    extends IEntityIdProperties {
	// Id Properties
	createTimestamp: number | IQNumberField;
	randomNumber: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface SequenceConsumerEOptionalId {
	// Id Properties
	createTimestamp?: number | IQNumberField;
	randomNumber?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SequenceConsumerEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SequenceConsumerEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SequenceConsumerECreateProperties
extends Partial<SequenceConsumerEId>, SequenceConsumerEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SequenceConsumerECreateColumns
extends SequenceConsumerEId, SequenceConsumerEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSequenceConsumer extends IQEntity
{
	// Id Fields
	createTimestamp: IQNumberField;
	randomNumber: IQNumberField;

	// Id Relations

	// Non-Id Fields

	// Non-Id Relations

}


// Entity Id Interface
export interface QSequenceConsumerQId
{
	
	// Id Fields
	createTimestamp: IQNumberField;
	randomNumber: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QSequenceConsumerQRelation
	extends IQRelation<QSequenceConsumer>, QSequenceConsumerQId {
}


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

export interface ISequence {
	
	// Id Properties
	id?: number;

	// Id Relations

	// Non-Id Properties
	schemaIndex?: number;
	tableIndex?: number;
	columnIndex?: number;
	incrementBy?: number;

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
export interface SequenceESelect
    extends IEntitySelectProperties, SequenceEOptionalId {
	// Non-Id Properties
	schemaIndex?: number | IQNumberField;
	tableIndex?: number | IQNumberField;
	columnIndex?: number | IQNumberField;
	incrementBy?: number | IQNumberField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SequenceEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface SequenceEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SequenceEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	schemaIndex?: number | IQNumberField;
	tableIndex?: number | IQNumberField;
	columnIndex?: number | IQNumberField;
	incrementBy?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SequenceEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	SCHEMA_INDEX?: number | IQNumberField;
	TABLE_INDEX?: number | IQNumberField;
	COLUMN_INDEX?: number | IQNumberField;
	SEQUENCE_INCREMENT_BY?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SequenceECreateProperties
extends Partial<SequenceEId>, SequenceEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SequenceECreateColumns
extends SequenceEId, SequenceEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSequence extends QEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	schemaIndex: IQNumberField;
	tableIndex: IQNumberField;
	columnIndex: IQNumberField;
	incrementBy: IQNumberField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QSequenceQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QSequenceQRelation
	extends QRelation<QSequence>, QSequenceQId {
}


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


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface SequenceESelect
    extends IEntitySelectProperties, SequenceEOptionalId {
	// Non-Id Properties
	incrementBy?: number | IQNumberField;
	currentValue?: number | IQNumberField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SequenceEId
    extends IEntityIdProperties {
	// Id Properties
	schemaIndex: number | IQNumberField;
	tableIndex: number | IQNumberField;
	columnIndex: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface SequenceEOptionalId {
	// Id Properties
	schemaIndex?: number | IQNumberField;
	tableIndex?: number | IQNumberField;
	columnIndex?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SequenceEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	incrementBy?: number | IQNumberField;
	currentValue?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SequenceGraph
	extends SequenceEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	incrementBy?: number | IQNumberField;
	currentValue?: number | IQNumberField;

	// Relations

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SequenceEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	SEQUENCE_INCREMENT_BY?: number | IQNumberField;
	CURRENT_VALUE?: number | IQNumberField;

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
export interface QSequence extends IQEntity
{
	// Id Fields
	schemaIndex: IQNumberField;
	tableIndex: IQNumberField;
	columnIndex: IQNumberField;

	// Id Relations

	// Non-Id Fields
	incrementBy: IQNumberField;
	currentValue: IQNumberField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QSequenceQId
{
	
	// Id Fields
	schemaIndex: IQNumberField;
	tableIndex: IQNumberField;
	columnIndex: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QSequenceQRelation
	extends IQRelation<QSequence>, QSequenceQId {
}


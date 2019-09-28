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
	ImmutableRowECascadeGraph,
	ImmutableRowEId,
	ImmutableRowEUpdateColumns,
	ImmutableRowEUpdateProperties,
	ImmutableRowESelect,
	QImmutableRowQId,
	QImmutableRowQRelation,
	QImmutableRow,
} from './qimmutablerow';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface MutableRowESelect
    extends ImmutableRowESelect, MutableRowEOptionalId {
	// Non-Id Properties
	updatedAt?: Date | IQDateField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface MutableRowEId
    extends ImmutableRowEId {
	// Id Properties

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface MutableRowEOptionalId {
	// Id Properties

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface MutableRowEUpdateProperties
	extends ImmutableRowEUpdateProperties {
	// Non-Id Properties
	updatedAt?: Date | IQDateField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface MutableRowECascadeGraph
	extends ImmutableRowECascadeGraph {
	// Cascading Relations

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface MutableRowEUpdateColumns
	extends ImmutableRowEUpdateColumns {
	// Non-Id Columns

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface MutableRowECreateProperties
extends Partial<MutableRowEId>, MutableRowEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface MutableRowECreateColumns
extends MutableRowEId, MutableRowEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QMutableRow extends QImmutableRow
{
	// Id Fields

	// Id Relations

	// Non-Id Fields
	updatedAt: IQDateField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QMutableRowQId extends QImmutableRowQId
{
	
	// Id Fields

	// Id Relations


}

// Entity Relation Interface
export interface QMutableRowQRelation<SubType extends IQEntity>
	extends QImmutableRowQRelation<QMutableRow>, QMutableRowQId {
}


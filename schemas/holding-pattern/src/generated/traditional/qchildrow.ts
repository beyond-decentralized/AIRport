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
	IQAirEntityOneToManyRelation,
	IQAirEntityRelation,
	RawDelete,
	RawUpdate,
} from '@airport/air-traffic-control';
import {
	IChildRow,
} from './childrow';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface ChildRowESelect
    extends IEntitySelectProperties, ChildRowEOptionalId {
	// Non-Id Properties

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ChildRowEId
    extends IEntityIdProperties {
	// Id Properties

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface ChildRowEOptionalId {
	// Id Properties

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ChildRowEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ChildRowGraph
	extends ChildRowEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties

	// Relations

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface ChildRowEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ChildRowECreateProperties
extends Partial<ChildRowEId>, ChildRowEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ChildRowECreateColumns
extends ChildRowEId, ChildRowEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QChildRow extends IQEntity
{
	// Id Fields

	// Id Relations

	// Non-Id Fields

	// Non-Id Relations

}


// Entity Id Interface
export interface QChildRowQId
{
	
	// Id Fields

	// Id Relations


}

// Entity Relation Interface
export interface QChildRowQRelation<SubQType extends IQEntity>
	extends IQRelation<SubQType>, QChildRowQId {
}


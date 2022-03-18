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
	IQRepositoryEntityOneToManyRelation,
	IQRepositoryEntityRelation,
	RawDelete,
	RawUpdate,
} from '@airport/air-control';
import {
	ImmutableGraph,
	ImmutableEId,
	ImmutableEUpdateColumns,
	ImmutableEUpdateProperties,
	ImmutableESelect,
	QImmutableQId,
	QImmutableQRelation,
	QImmutable,
} from './qimmutable';
import {
	SystemGenerated,
} from '../../ddl/attributes/SystemGenerated';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface SystemGeneratedESelect
    extends ImmutableESelect, SystemGeneratedEOptionalId {
	// Non-Id Properties

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SystemGeneratedEId
    extends ImmutableEId {
	// Id Properties

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface SystemGeneratedEOptionalId {
	// Id Properties

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SystemGeneratedEUpdateProperties
	extends ImmutableEUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SystemGeneratedGraph
	extends SystemGeneratedEOptionalId, ImmutableGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties

	// Relations

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface SystemGeneratedEUpdateColumns
	extends ImmutableEUpdateColumns {
	// Non-Id Columns

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SystemGeneratedECreateProperties
extends Partial<SystemGeneratedEId>, SystemGeneratedEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SystemGeneratedECreateColumns
extends SystemGeneratedEId, SystemGeneratedEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSystemGenerated<T> extends QImmutable<T>
{
	// Id Fields

	// Id Relations

	// Non-Id Fields

	// Non-Id Relations

}


// Entity Id Interface
export interface QSystemGeneratedQId extends QImmutableQId
{
	
	// Id Fields

	// Id Relations


}

// Entity Relation Interface
export interface QSystemGeneratedQRelation<SubType, SubQType extends IQEntity<SubType>>
	extends QImmutableQRelation<SubType, SubQType>, QSystemGeneratedQId {
}


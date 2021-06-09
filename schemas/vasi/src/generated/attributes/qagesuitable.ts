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
	ImmutableWithActorGraph,
	ImmutableWithActorEId,
	ImmutableWithActorEUpdateColumns,
	ImmutableWithActorEUpdateProperties,
	ImmutableWithActorESelect,
	QImmutableWithActorQId,
	QImmutableWithActorQRelation,
	QImmutableWithActor,
} from './qimmutablewithactor';
import {
	AgeSuitable,
} from '../../ddl/attributes/AgeSuitable';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface AgeSuitableESelect
    extends ImmutableWithActorESelect, AgeSuitableEOptionalId {
	// Non-Id Properties
	ageSuitability?: number | IQNumberField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface AgeSuitableEId
    extends ImmutableWithActorEId {
	// Id Properties

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface AgeSuitableEOptionalId {
	// Id Properties

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface AgeSuitableEUpdateProperties
	extends ImmutableWithActorEUpdateProperties {
	// Non-Id Properties
	ageSuitability?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface AgeSuitableGraph
	extends AgeSuitableEOptionalId, ImmutableWithActorGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	ageSuitability?: number | IQNumberField;

	// Relations

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface AgeSuitableEUpdateColumns
	extends ImmutableWithActorEUpdateColumns {
	// Non-Id Columns

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface AgeSuitableECreateProperties
extends Partial<AgeSuitableEId>, AgeSuitableEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface AgeSuitableECreateColumns
extends AgeSuitableEId, AgeSuitableEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QAgeSuitable<T> extends QImmutableWithActor<T>
{
	// Id Fields

	// Id Relations

	// Non-Id Fields
	ageSuitability: IQNumberField;

	// Non-Id Relations

}


// Entity Id Interface
export interface QAgeSuitableQId extends QImmutableWithActorQId
{
	
	// Id Fields

	// Id Relations


}

// Entity Relation Interface
export interface QAgeSuitableQRelation<SubType, SubQType extends IQEntity<SubType>>
	extends QImmutableWithActorQRelation<SubType, SubQType>, QAgeSuitableQId {
}


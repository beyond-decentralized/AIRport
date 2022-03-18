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
	ActorGraph,
	ActorEId,
	ActorEOptionalId,
	ActorEUpdateProperties,
	ActorESelect,
	QActor,
	QActorQId,
	QActorQRelation,
	Actor,
} from '@airport/holding-pattern';
import {
	ImmutableWithActor,
} from '../../ddl/attributes/ImmutableWithActor';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface ImmutableWithActorESelect
    extends ImmutableESelect, ImmutableWithActorEOptionalId {
	// Non-Id Properties

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	actor?: ActorESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ImmutableWithActorEId
    extends ImmutableEId {
	// Id Properties

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface ImmutableWithActorEOptionalId {
	// Id Properties

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ImmutableWithActorEUpdateProperties
	extends ImmutableEUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - ids only & no OneToMany's
	actor?: ActorEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ImmutableWithActorGraph
	extends ImmutableWithActorEOptionalId, ImmutableGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties

	// Relations
	actor?: ActorGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface ImmutableWithActorEUpdateColumns
	extends ImmutableEUpdateColumns {
	// Non-Id Columns

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ImmutableWithActorECreateProperties
extends Partial<ImmutableWithActorEId>, ImmutableWithActorEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ImmutableWithActorECreateColumns
extends ImmutableWithActorEId, ImmutableWithActorEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QImmutableWithActor<T> extends QImmutable<T>
{
	// Id Fields

	// Id Relations

	// Non-Id Fields

	// Non-Id Relations
	actor: QActorQRelation;

}


// Entity Id Interface
export interface QImmutableWithActorQId extends QImmutableQId
{
	
	// Id Fields

	// Id Relations


}

// Entity Relation Interface
export interface QImmutableWithActorQRelation<SubType, SubQType extends IQEntity<SubType>>
	extends QImmutableQRelation<SubType, SubQType>, QImmutableWithActorQId {
}


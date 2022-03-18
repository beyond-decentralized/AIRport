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
	MutableGraph,
	MutableEId,
	MutableEUpdateColumns,
	MutableEUpdateProperties,
	MutableESelect,
	QMutableQId,
	QMutableQRelation,
	QMutable,
} from './qmutable';
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
	MutableWithActor,
} from '../../ddl/attributes/MutableWithActor';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface MutableWithActorESelect
    extends MutableESelect, MutableWithActorEOptionalId {
	// Non-Id Properties

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	actor?: ActorESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface MutableWithActorEId
    extends MutableEId {
	// Id Properties

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface MutableWithActorEOptionalId {
	// Id Properties

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface MutableWithActorEUpdateProperties
	extends MutableEUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - ids only & no OneToMany's
	actor?: ActorEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface MutableWithActorGraph
	extends MutableWithActorEOptionalId, MutableGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties

	// Relations
	actor?: ActorGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface MutableWithActorEUpdateColumns
	extends MutableEUpdateColumns {
	// Non-Id Columns

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface MutableWithActorECreateProperties
extends Partial<MutableWithActorEId>, MutableWithActorEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface MutableWithActorECreateColumns
extends MutableWithActorEId, MutableWithActorEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QMutableWithActor<T> extends QMutable<T>
{
	// Id Fields

	// Id Relations

	// Non-Id Fields

	// Non-Id Relations
	actor: QActorQRelation;

}


// Entity Id Interface
export interface QMutableWithActorQId extends QMutableQId
{
	
	// Id Fields

	// Id Relations


}

// Entity Relation Interface
export interface QMutableWithActorQRelation<SubType, SubQType extends IQEntity<SubType>>
	extends QMutableQRelation<SubType, SubQType>, QMutableWithActorQId {
}


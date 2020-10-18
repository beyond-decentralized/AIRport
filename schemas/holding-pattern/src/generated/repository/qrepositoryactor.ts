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
	RepositoryGraph,
	RepositoryEId,
	RepositoryEOptionalId,
	RepositoryEUpdateProperties,
	RepositoryESelect,
	QRepository,
	QRepositoryQId,
	QRepositoryQRelation,
} from './qrepository';
import {
	ActorGraph,
	ActorEId,
	ActorEOptionalId,
	ActorEUpdateProperties,
	ActorESelect,
	QActor,
	QActorQId,
	QActorQRelation,
} from '../infrastructure/qactor';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryActorESelect
    extends IEntitySelectProperties, RepositoryActorEOptionalId {
	// Non-Id Properties

	// Id Relations - full property interfaces
	repository?: RepositoryESelect;

  // Non-Id relations (including OneToMany's)
	actor?: ActorESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepositoryActorEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only
	repository: RepositoryEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface RepositoryActorEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only
	repository?: RepositoryEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepositoryActorEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties

	// Non-Id Relations - ids only & no OneToMany's
	actor?: ActorEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepositoryActorGraph
	extends RepositoryActorEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties

	// Relations
	repository?: RepositoryGraph;
	actor?: ActorGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryActorEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	ACTOR_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepositoryActorECreateProperties
extends Partial<RepositoryActorEId>, RepositoryActorEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepositoryActorECreateColumns
extends RepositoryActorEId, RepositoryActorEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRepositoryActor extends IQEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations
	repository: QRepositoryQRelation;

	// Non-Id Fields

	// Non-Id Relations
	actor: QActorQRelation;

}


// Entity Id Interface
export interface QRepositoryActorQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations
	repository: QRepositoryQId;


}

// Entity Relation Interface
export interface QRepositoryActorQRelation
	extends IQRelation<QRepositoryActor>, QRepositoryActorQId {
}


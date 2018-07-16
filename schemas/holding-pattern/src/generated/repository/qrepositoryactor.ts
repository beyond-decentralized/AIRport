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
import {
	IRepository,
	RepositoryEId,
	RepositoryEOptionalId,
	RepositoryEUpdateProperties,
	RepositoryESelect,
	QRepository,
	QRepositoryQId,
	QRepositoryQRelation,
} from './qrepository';
import {
	IActor,
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
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IRepositoryActor {
	
	// Id Properties
	id?: number;

	// Id Relations
	repository?: IRepository;

	// Non-Id Properties

	// Non-Id Relations
	actor?: IActor;

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryActorESelect
    extends IEntitySelectProperties, RepositoryActorEOptionalId, RepositoryActorEUpdateProperties {
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
extends RepositoryActorEId, RepositoryActorEUpdateProperties {
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
export interface QRepositoryActor extends QEntity
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
	extends QRelation<QRepositoryActor>, QRepositoryActorQId {
}


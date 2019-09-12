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
	IActor,
	ActorECascadeGraph,
	ActorEId,
	ActorEOptionalId,
	ActorEUpdateProperties,
	ActorESelect,
	QActor,
	QActorQId,
	QActorQRelation,
} from '../infrastructure/qactor';
import {
	IRepositoryActor,
	RepositoryActorECascadeGraph,
	RepositoryActorEId,
	RepositoryActorEOptionalId,
	RepositoryActorEUpdateProperties,
	RepositoryActorESelect,
	QRepositoryActor,
	QRepositoryActorQId,
	QRepositoryActorQRelation,
} from './qrepositoryactor';
import {
	IRepositoryApplication,
	RepositoryApplicationECascadeGraph,
	RepositoryApplicationEId,
	RepositoryApplicationEOptionalId,
	RepositoryApplicationEUpdateProperties,
	RepositoryApplicationESelect,
	QRepositoryApplication,
	QRepositoryApplicationQId,
	QRepositoryApplicationQRelation,
} from './qrepositoryapplication';
import {
	IRepositoryTransactionHistory,
	RepositoryTransactionHistoryECascadeGraph,
	RepositoryTransactionHistoryEId,
	RepositoryTransactionHistoryEOptionalId,
	RepositoryTransactionHistoryEUpdateProperties,
	RepositoryTransactionHistoryESelect,
	QRepositoryTransactionHistory,
	QRepositoryTransactionHistoryQId,
	QRepositoryTransactionHistoryQRelation,
} from '../history/qrepositorytransactionhistory';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IRepository {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	orderedId?: number;
	randomId?: number;
	name?: string;
	url?: string;
	platformConfig?: string;
	syncPriority?: number;

	// Non-Id Relations
	ownerActor?: IActor;
	repositoryActors?: IRepositoryActor[];
	repositoryApplications?: IRepositoryApplication[];
	repositoryTransactionHistory?: IRepositoryTransactionHistory[];

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryESelect
    extends IEntitySelectProperties, RepositoryEOptionalId {
	// Non-Id Properties
	orderedId?: number | IQNumberField;
	randomId?: number | IQNumberField;
	name?: string | IQStringField;
	url?: string | IQStringField;
	platformConfig?: string | IQStringField;
	syncPriority?: number | IQNumberField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	ownerActor?: ActorESelect;
	repositoryActors?: RepositoryActorESelect;
	repositoryApplications?: RepositoryApplicationESelect;
	repositoryTransactionHistory?: RepositoryTransactionHistoryESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepositoryEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface RepositoryEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepositoryEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	orderedId?: number | IQNumberField;
	randomId?: number | IQNumberField;
	name?: string | IQStringField;
	url?: string | IQStringField;
	platformConfig?: string | IQStringField;
	syncPriority?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's
	ownerActor?: ActorEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepositoryECascadeGraph
	extends IEntityCascadeGraph {
	// Cascading Relations
	repositoryActors?: RepositoryActorECascadeGraph;
	repositoryApplications?: RepositoryApplicationECascadeGraph;
	repositoryTransactionHistory?: RepositoryTransactionHistoryECascadeGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	ORDERED_ID?: number | IQNumberField;
	RANDOM_ID?: number | IQNumberField;
	NAME?: string | IQStringField;
	REPOSITORY_URL?: string | IQStringField;
	PLATFORM_CONFIG?: string | IQStringField;
	SYNC_PRIORITY?: number | IQNumberField;
	OWNER_ACTOR_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepositoryECreateProperties
extends Partial<RepositoryEId>, RepositoryEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepositoryECreateColumns
extends RepositoryEId, RepositoryEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRepository extends IQEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	orderedId: IQNumberField;
	randomId: IQNumberField;
	name: IQStringField;
	url: IQStringField;
	platformConfig: IQStringField;
	syncPriority: IQNumberField;

	// Non-Id Relations
	ownerActor: QActorQRelation;
	repositoryActors: IQOneToManyRelation<QRepositoryActor>;
	repositoryApplications: IQOneToManyRelation<QRepositoryApplication>;
	repositoryTransactionHistory: IQOneToManyRelation<QRepositoryTransactionHistory>;

}


// Entity Id Interface
export interface QRepositoryQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QRepositoryQRelation
	extends IQRelation<QRepository>, QRepositoryQId {
}


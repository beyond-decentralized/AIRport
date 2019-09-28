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
	RepositoryTransactionHistoryECascadeGraph,
	RepositoryTransactionHistoryEId,
	RepositoryTransactionHistoryEOptionalId,
	RepositoryTransactionHistoryEUpdateProperties,
	RepositoryTransactionHistoryESelect,
	QRepositoryTransactionHistory,
	QRepositoryTransactionHistoryQId,
	QRepositoryTransactionHistoryQRelation,
} from './qrepositorytransactionhistory';
import {
	RepositoryECascadeGraph,
	RepositoryEId,
	RepositoryEOptionalId,
	RepositoryEUpdateProperties,
	RepositoryESelect,
	QRepository,
	QRepositoryQId,
	QRepositoryQRelation,
} from '../repository/qrepository';
import {
	ActorECascadeGraph,
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
export interface RepoTransHistoryChangedRepositoryActorESelect
    extends IEntitySelectProperties, RepoTransHistoryChangedRepositoryActorEOptionalId {
	// Non-Id Properties
	referenceType?: number | IQNumberField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	repositoryTransactionHistory?: RepositoryTransactionHistoryESelect;
	repository?: RepositoryESelect;
	actor?: ActorESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepoTransHistoryChangedRepositoryActorEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface RepoTransHistoryChangedRepositoryActorEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepoTransHistoryChangedRepositoryActorEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	referenceType?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's
	repositoryTransactionHistory?: RepositoryTransactionHistoryEOptionalId;
	repository?: RepositoryEOptionalId;
	actor?: ActorEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepoTransHistoryChangedRepositoryActorECascadeGraph
	extends IEntityCascadeGraph {
	// Cascading Relations

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface RepoTransHistoryChangedRepositoryActorEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	REFERENCE_TYPE?: number | IQNumberField;
	REPOSITORY_TRANSACTION_HISTORY_ID?: number | IQNumberField;
	REPOSITORY_ID?: number | IQNumberField;
	ACTOR_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepoTransHistoryChangedRepositoryActorECreateProperties
extends Partial<RepoTransHistoryChangedRepositoryActorEId>, RepoTransHistoryChangedRepositoryActorEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepoTransHistoryChangedRepositoryActorECreateColumns
extends RepoTransHistoryChangedRepositoryActorEId, RepoTransHistoryChangedRepositoryActorEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRepoTransHistoryChangedRepositoryActor extends IQEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	referenceType: IQNumberField;

	// Non-Id Relations
	repositoryTransactionHistory: QRepositoryTransactionHistoryQRelation;
	repository: QRepositoryQRelation;
	actor: QActorQRelation;

}


// Entity Id Interface
export interface QRepoTransHistoryChangedRepositoryActorQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QRepoTransHistoryChangedRepositoryActorQRelation
	extends IQRelation<QRepoTransHistoryChangedRepositoryActor>, QRepoTransHistoryChangedRepositoryActorQId {
}


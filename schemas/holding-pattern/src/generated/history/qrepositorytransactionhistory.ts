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
	TransactionHistoryGraph,
	TransactionHistoryEId,
	TransactionHistoryEOptionalId,
	TransactionHistoryEUpdateProperties,
	TransactionHistoryESelect,
	QTransactionHistory,
	QTransactionHistoryQId,
	QTransactionHistoryQRelation,
} from './qtransactionhistory';
import {
	TransactionHistory,
} from '../../ddl/history/TransactionHistory';
import {
	RepositoryGraph,
	RepositoryEId,
	RepositoryEOptionalId,
	RepositoryEUpdateProperties,
	RepositoryESelect,
	QRepository,
	QRepositoryQId,
	QRepositoryQRelation,
} from '../repository/qrepository';
import {
	Repository,
} from '../../ddl/repository/Repository';
import {
	RepoTransHistoryChangedRepositoryActorGraph,
	RepoTransHistoryChangedRepositoryActorEId,
	RepoTransHistoryChangedRepositoryActorEOptionalId,
	RepoTransHistoryChangedRepositoryActorEUpdateProperties,
	RepoTransHistoryChangedRepositoryActorESelect,
	QRepoTransHistoryChangedRepositoryActor,
	QRepoTransHistoryChangedRepositoryActorQId,
	QRepoTransHistoryChangedRepositoryActorQRelation,
} from './qrepotranshistorychangedrepositoryactor';
import {
	RepoTransHistoryChangedRepositoryActor,
} from '../../ddl/history/RepoTransHistoryChangedRepositoryActor';
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
import {
	Actor,
} from '../../ddl/infrastructure/Actor';
import {
	OperationHistoryGraph,
	OperationHistoryEId,
	OperationHistoryEOptionalId,
	OperationHistoryEUpdateProperties,
	OperationHistoryESelect,
	QOperationHistory,
	QOperationHistoryQId,
	QOperationHistoryQRelation,
} from './qoperationhistory';
import {
	OperationHistory,
} from '../../ddl/history/OperationHistory';
import {
	RepositoryTransactionHistory,
} from '../../ddl/history/RepositoryTransactionHistory';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryTransactionHistoryESelect
    extends IEntitySelectProperties, RepositoryTransactionHistoryEOptionalId {
	// Non-Id Properties
	saveTimestamp?: number | IQNumberField;
	repositoryTransactionType?: string | IQStringField;
	synced?: boolean | IQBooleanField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	transactionHistory?: TransactionHistoryESelect;
	repository?: RepositoryESelect;
	changedRepositoryActors?: RepoTransHistoryChangedRepositoryActorESelect;
	actor?: ActorESelect;
	operationHistory?: OperationHistoryESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepositoryTransactionHistoryEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface RepositoryTransactionHistoryEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepositoryTransactionHistoryEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	saveTimestamp?: number | IQNumberField;
	repositoryTransactionType?: string | IQStringField;
	synced?: boolean | IQBooleanField;

	// Non-Id Relations - ids only & no OneToMany's
	transactionHistory?: TransactionHistoryEOptionalId;
	repository?: RepositoryEOptionalId;
	actor?: ActorEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepositoryTransactionHistoryGraph
	extends RepositoryTransactionHistoryEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	saveTimestamp?: number | IQNumberField;
	repositoryTransactionType?: string | IQStringField;
	synced?: boolean | IQBooleanField;

	// Relations
	transactionHistory?: TransactionHistoryGraph;
	repository?: RepositoryGraph;
	changedRepositoryActors?: RepoTransHistoryChangedRepositoryActorGraph[];
	actor?: ActorGraph;
	operationHistory?: OperationHistoryGraph[];

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryTransactionHistoryEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	SAVE_TIMESTAMP?: number | IQNumberField;
	REPOSITORY_TRANSACTION_TYPE?: string | IQStringField;
	SYNCED?: boolean | IQBooleanField;
	TRANSACTION_HISTORY_ID?: number | IQNumberField;
	REPOSITORY_ID?: number | IQNumberField;
	ACTOR_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepositoryTransactionHistoryECreateProperties
extends Partial<RepositoryTransactionHistoryEId>, RepositoryTransactionHistoryEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepositoryTransactionHistoryECreateColumns
extends RepositoryTransactionHistoryEId, RepositoryTransactionHistoryEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRepositoryTransactionHistory extends IQEntity<RepositoryTransactionHistory>
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	saveTimestamp: IQNumberField;
	repositoryTransactionType: IQStringField;
	synced: IQBooleanField;

	// Non-Id Relations
	transactionHistory: QTransactionHistoryQRelation;
	repository: QRepositoryQRelation;
	changedRepositoryActors: IQOneToManyRelation<RepoTransHistoryChangedRepositoryActor, QRepoTransHistoryChangedRepositoryActor>;
	actor: QActorQRelation;
	operationHistory: IQOneToManyRelation<OperationHistory, QOperationHistory>;

}


// Entity Id Interface
export interface QRepositoryTransactionHistoryQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QRepositoryTransactionHistoryQRelation
	extends IQRelation<RepositoryTransactionHistory, QRepositoryTransactionHistory>, QRepositoryTransactionHistoryQId {
}


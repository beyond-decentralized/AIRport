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
	ITransactionHistory,
	TransactionHistoryEId,
	TransactionHistoryEOptionalId,
	TransactionHistoryEUpdateProperties,
	TransactionHistoryESelect,
	QTransactionHistory,
	QTransactionHistoryQId,
	QTransactionHistoryQRelation,
} from './qtransactionhistory';
import {
	IRepository,
	RepositoryEId,
	RepositoryEOptionalId,
	RepositoryEUpdateProperties,
	RepositoryESelect,
	QRepository,
	QRepositoryQId,
	QRepositoryQRelation,
} from '../repository/qrepository';
import {
	IRepoTransHistoryChangedRepositoryActor,
	RepoTransHistoryChangedRepositoryActorEId,
	RepoTransHistoryChangedRepositoryActorEOptionalId,
	RepoTransHistoryChangedRepositoryActorEUpdateProperties,
	RepoTransHistoryChangedRepositoryActorESelect,
	QRepoTransHistoryChangedRepositoryActor,
	QRepoTransHistoryChangedRepositoryActorQId,
	QRepoTransHistoryChangedRepositoryActorQRelation,
} from './qrepotranshistorychangedrepositoryactor';
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
import {
	IOperationHistory,
	OperationHistoryEId,
	OperationHistoryEOptionalId,
	OperationHistoryEUpdateProperties,
	OperationHistoryESelect,
	QOperationHistory,
	QOperationHistoryQId,
	QOperationHistoryQRelation,
} from './qoperationhistory';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IRepositoryTransactionHistory {
	
	// Id Properties
	id?: number;

	// Id Relations

	// Non-Id Properties
	remoteId?: number;
	saveTimestamp?: Date;
	repositoryTransactionType?: number;
	blockId?: number;

	// Non-Id Relations
	transactionHistory?: ITransactionHistory;
	repository?: IRepository;
	changedRepositoryActors?: IRepoTransHistoryChangedRepositoryActor[];
	actor?: IActor;
	operationHistory?: IOperationHistory[];

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryTransactionHistoryESelect
    extends IEntitySelectProperties, RepositoryTransactionHistoryEOptionalId {
	// Non-Id Properties
	remoteId?: number | IQNumberField;
	saveTimestamp?: Date | IQDateField;
	repositoryTransactionType?: number | IQNumberField;
	blockId?: number | IQNumberField;

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
	remoteId?: number | IQNumberField;
	saveTimestamp?: Date | IQDateField;
	repositoryTransactionType?: number | IQNumberField;
	blockId?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's
	transactionHistory?: TransactionHistoryEOptionalId;
	repository?: RepositoryEOptionalId;
	actor?: ActorEOptionalId;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryTransactionHistoryEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	REMOTE_ID?: number | IQNumberField;
	SAVE_TIMESTAMP?: Date | IQDateField;
	REPOSITORY_TRANSACTION_TYPE?: number | IQNumberField;
	REPOSITORY_TRANSACTION_HISTORY_BLOCK_ID?: number | IQNumberField;
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
export interface QRepositoryTransactionHistory extends QEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	remoteId: IQNumberField;
	saveTimestamp: IQDateField;
	repositoryTransactionType: IQNumberField;
	blockId: IQNumberField;

	// Non-Id Relations
	transactionHistory: QTransactionHistoryQRelation;
	repository: QRepositoryQRelation;
	changedRepositoryActors: IQOneToManyRelation<QRepoTransHistoryChangedRepositoryActor>;
	actor: QActorQRelation;
	operationHistory: IQOneToManyRelation<QOperationHistory>;

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
	extends QRelation<QRepositoryTransactionHistory>, QRepositoryTransactionHistoryQId {
}


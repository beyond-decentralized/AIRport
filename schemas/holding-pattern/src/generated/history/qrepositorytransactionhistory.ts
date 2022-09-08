import {
	IQEntityInternal,
	IEntityIdProperties,
	IEntityCascadeGraph,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IEntitySelectProperties,
	IQBooleanField,
	IQDateField,
	IQNumberField,
	IQOneToManyRelation,
	IQStringField,
	IQUntypedField,
	IQEntity,
	IQRelation,
	IQAirEntityOneToManyRelation,
	IQAirEntityRelation,
	RawDelete,
	RawUpdate,
} from '@airport/tarmaq-query';
import {
	RepositoryGraph,
	RepositoryEId,
	RepositoryEOptionalId,
	RepositoryEUpdateProperties,
	RepositoryESelect,
	QRepository,
	QRepositoryQId,
	QRepositoryQRelation,
} from '../repository/qRepository';
import {
	IRepository,
} from '../repository/Repository';
import {
	TransactionHistoryGraph,
	TransactionHistoryEId,
	TransactionHistoryEOptionalId,
	TransactionHistoryEUpdateProperties,
	TransactionHistoryESelect,
	QTransactionHistory,
	QTransactionHistoryQId,
	QTransactionHistoryQRelation,
} from './qTransactionHistory';
import {
	ITransactionHistory,
} from './TransactionHistory';
import {
	OperationHistoryGraph,
	OperationHistoryEId,
	OperationHistoryEOptionalId,
	OperationHistoryEUpdateProperties,
	OperationHistoryESelect,
	QOperationHistory,
	QOperationHistoryQId,
	QOperationHistoryQRelation,
} from './qOperationHistory';
import {
	IOperationHistory,
} from './OperationHistory';
import {
	IRepositoryTransactionHistory,
} from './RepositoryTransactionHistory';


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryTransactionHistoryESelect
    extends IEntitySelectProperties, RepositoryTransactionHistoryEOptionalId {
	// Non-Id Properties
	repositoryTransactionType?: string | IQStringField;
	saveTimestamp?: number | IQNumberField;
	syncTimestamp?: number | IQNumberField;
	GUID?: string | IQStringField;
	isRepositoryCreation?: boolean | IQBooleanField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	repository?: RepositoryESelect;
	transactionHistory?: TransactionHistoryESelect;
	operationHistory?: OperationHistoryESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepositoryTransactionHistoryEId
    extends IEntityIdProperties {
	// Id Properties
	_localId: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface RepositoryTransactionHistoryEOptionalId {
	// Id Properties
	_localId?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepositoryTransactionHistoryEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	repositoryTransactionType?: string | IQStringField;
	saveTimestamp?: number | IQNumberField;
	syncTimestamp?: number | IQNumberField;
	GUID?: string | IQStringField;
	isRepositoryCreation?: boolean | IQBooleanField;

	// Non-Id Relations - _localIds only & no OneToMany's
	repository?: RepositoryEOptionalId;
	transactionHistory?: TransactionHistoryEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepositoryTransactionHistoryGraph
	extends RepositoryTransactionHistoryEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	repositoryTransactionType?: string | IQStringField;
	saveTimestamp?: number | IQNumberField;
	syncTimestamp?: number | IQNumberField;
	GUID?: string | IQStringField;
	isRepositoryCreation?: boolean | IQBooleanField;

	// Relations
	repository?: RepositoryGraph;
	transactionHistory?: TransactionHistoryGraph;
	operationHistory?: OperationHistoryGraph[];

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryTransactionHistoryEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	REPOSITORY_TRANSACTION_TYPE?: string | IQStringField;
	SAVE_TIMESTAMP?: number | IQNumberField;
	SYNC_TIMESTAMP?: number | IQNumberField;
	GUID?: string | IQStringField;
	IS_REPOSITORY_CREATION?: boolean | IQBooleanField;
	REPOSITORY_LID?: number | IQNumberField;
	TRANSACTION_HISTORY_LID?: number | IQNumberField;

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
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QRepositoryTransactionHistory<IQE extends QRepositoryTransactionHistory = any> extends IQEntity<IQE | QRepositoryTransactionHistory>
{
	// Id Fields
	_localId: IQNumberField;

	// Id Relations

	// Non-Id Fields
	repositoryTransactionType: IQStringField;
	saveTimestamp: IQNumberField;
	syncTimestamp: IQNumberField;
	GUID: IQStringField;
	isRepositoryCreation: IQBooleanField;

	// Non-Id Relations
	repository: QRepositoryQRelation;
	transactionHistory: QTransactionHistoryQRelation;
	operationHistory: IQOneToManyRelation<QOperationHistory>;

}

// Entity Id Interface
export interface QRepositoryTransactionHistoryQId
{
	
	// Id Fields
	_localId: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QRepositoryTransactionHistoryQRelation
	extends IQRelation<QRepositoryTransactionHistory>, QRepositoryTransactionHistoryQId {
}
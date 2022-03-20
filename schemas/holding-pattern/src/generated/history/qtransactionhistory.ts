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
	RepositoryTransactionHistoryGraph,
	RepositoryTransactionHistoryEId,
	RepositoryTransactionHistoryEOptionalId,
	RepositoryTransactionHistoryEUpdateProperties,
	RepositoryTransactionHistoryESelect,
	QRepositoryTransactionHistory,
	QRepositoryTransactionHistoryQId,
	QRepositoryTransactionHistoryQRelation,
} from './qrepositorytransactionhistory';
import {
	IRepositoryTransactionHistory,
} from './repositorytransactionhistory';
import {
	ITransactionHistory,
} from './transactionhistory';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface TransactionHistoryESelect
    extends IEntitySelectProperties, TransactionHistoryEOptionalId {
	// Non-Id Properties
	transactionType?: string | IQStringField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	repositoryTransactionHistories?: RepositoryTransactionHistoryESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface TransactionHistoryEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface TransactionHistoryEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface TransactionHistoryEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	transactionType?: string | IQStringField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface TransactionHistoryGraph
	extends TransactionHistoryEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	transactionType?: string | IQStringField;

	// Relations
	repositoryTransactionHistories?: RepositoryTransactionHistoryGraph[];

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface TransactionHistoryEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	TRANSACTION_TYPE?: string | IQStringField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface TransactionHistoryECreateProperties
extends Partial<TransactionHistoryEId>, TransactionHistoryEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface TransactionHistoryECreateColumns
extends TransactionHistoryEId, TransactionHistoryEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QTransactionHistory extends IQEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	transactionType: IQStringField;

	// Non-Id Relations
	repositoryTransactionHistories: IQOneToManyRelation<QRepositoryTransactionHistory>;

}


// Entity Id Interface
export interface QTransactionHistoryQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QTransactionHistoryQRelation
	extends IQRelation<QTransactionHistory>, QTransactionHistoryQId {
}


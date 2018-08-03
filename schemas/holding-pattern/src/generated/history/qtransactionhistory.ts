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
	IRepositoryTransactionHistory,
	RepositoryTransactionHistoryEId,
	RepositoryTransactionHistoryEOptionalId,
	RepositoryTransactionHistoryEUpdateProperties,
	RepositoryTransactionHistoryESelect,
	QRepositoryTransactionHistory,
	QRepositoryTransactionHistoryQId,
	QRepositoryTransactionHistoryQRelation,
} from './qrepositorytransactionhistory';
import {
	SyncSchemaMap,
} from '@airport/ground-control';
import {
	IOperationHistory,
} from './qoperationhistory';
import {
	IRecordHistory,
} from './qrecordhistory';
import {
	IRecordHistoryNewValue,
} from './qrecordhistorynewvalue';
import {
	IRecordHistoryOldValue,
} from './qrecordhistoryoldvalue';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface ITransactionHistory {
	
	// Id Properties
	id?: number;

	// Id Relations

	// Non-Id Properties
	transactionType?: number;

	// Non-Id Relations
	repositoryTransactionHistories?: IRepositoryTransactionHistory[];

	// Transient Properties
	repoTransHistoryMap?: { [repositoryId: number]: IRepositoryTransactionHistory; };
	schemaMap?: SyncSchemaMap;
	allOperationHistory?: IOperationHistory[];
	allRecordHistory?: IRecordHistory[];
	allRecordHistoryNewValues?: IRecordHistoryNewValue[];
	allRecordHistoryOldValues?: IRecordHistoryOldValue[];
	numberOfOperations?: number;

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface TransactionHistoryESelect
    extends IEntitySelectProperties, TransactionHistoryEOptionalId, TransactionHistoryEUpdateProperties {
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
	transactionType?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface TransactionHistoryEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	TRANSACTION_TYPE?: number | IQNumberField;

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
export interface QTransactionHistory extends QEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	transactionType: IQNumberField;

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
	extends QRelation<QTransactionHistory>, QTransactionHistoryQId {
}


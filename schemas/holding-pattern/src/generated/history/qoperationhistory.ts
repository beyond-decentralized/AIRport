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
	ISchemaEntity,
	SchemaEntityEId,
	SchemaEntityEOptionalId,
	SchemaEntityEUpdateProperties,
	SchemaEntityESelect,
	QSchemaEntity,
	QSchemaEntityQId,
	QSchemaEntityQRelation,
} from '@airport/traffic-pattern';
import {
	IRecordHistory,
	RecordHistoryEId,
	RecordHistoryEOptionalId,
	RecordHistoryEUpdateProperties,
	RecordHistoryESelect,
	QRecordHistory,
	QRecordHistoryQId,
	QRecordHistoryQRelation,
} from './qrecordhistory';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IOperationHistory {
	
	// Id Properties
	id?: number;

	// Id Relations
	repositoryTransactionHistory?: IRepositoryTransactionHistory;

	// Non-Id Properties
	orderNumber?: number;
	changeType?: number;

	// Non-Id Relations
	entity?: ISchemaEntity;
	recordHistory?: IRecordHistory[];

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface OperationHistoryESelect
    extends IEntitySelectProperties, OperationHistoryEOptionalId {
	// Non-Id Properties
	orderNumber?: number | IQNumberField;
	changeType?: number | IQNumberField;

	// Id Relations - full property interfaces
	repositoryTransactionHistory?: RepositoryTransactionHistoryESelect;

  // Non-Id relations (including OneToMany's)
	entity?: SchemaEntityESelect;
	recordHistory?: RecordHistoryESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface OperationHistoryEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only
	repositoryTransactionHistory: RepositoryTransactionHistoryEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface OperationHistoryEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only
	repositoryTransactionHistory?: RepositoryTransactionHistoryEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface OperationHistoryEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	orderNumber?: number | IQNumberField;
	changeType?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's
	entity?: SchemaEntityEOptionalId;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface OperationHistoryEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	ORDER_NUMBER?: number | IQNumberField;
	CHANGE_TYPE?: number | IQNumberField;
	ENTITY_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface OperationHistoryECreateProperties
extends Partial<OperationHistoryEId>, OperationHistoryEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface OperationHistoryECreateColumns
extends OperationHistoryEId, OperationHistoryEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QOperationHistory extends QEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations
	repositoryTransactionHistory: QRepositoryTransactionHistoryQRelation;

	// Non-Id Fields
	orderNumber: IQNumberField;
	changeType: IQNumberField;

	// Non-Id Relations
	entity: QSchemaEntityQRelation;
	recordHistory: IQOneToManyRelation<QRecordHistory>;

}


// Entity Id Interface
export interface QOperationHistoryQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations
	repositoryTransactionHistory: QRepositoryTransactionHistoryQId;


}

// Entity Relation Interface
export interface QOperationHistoryQRelation
	extends QRelation<QOperationHistory>, QOperationHistoryQId {
}


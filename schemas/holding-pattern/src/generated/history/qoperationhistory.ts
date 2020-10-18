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
	SchemaEntityGraph,
	SchemaEntityEId,
	SchemaEntityEOptionalId,
	SchemaEntityEUpdateProperties,
	SchemaEntityESelect,
	QSchemaEntity,
	QSchemaEntityQId,
	QSchemaEntityQRelation,
} from '@airport/traffic-pattern';
import {
	RecordHistoryGraph,
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
	systemWideOperationId?: number | IQNumberField;

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
	systemWideOperationId?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's
	entity?: SchemaEntityEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface OperationHistoryGraph
	extends OperationHistoryEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	orderNumber?: number | IQNumberField;
	changeType?: number | IQNumberField;
	systemWideOperationId?: number | IQNumberField;

	// Relations
	repositoryTransactionHistory?: RepositoryTransactionHistoryGraph;
	entity?: SchemaEntityGraph;
	recordHistory?: RecordHistoryGraph[];

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface OperationHistoryEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	ORDER_NUMBER?: number | IQNumberField;
	CHANGE_TYPE?: number | IQNumberField;
	SYSTEM_WIDE_OPERATION_ID?: number | IQNumberField;
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
export interface QOperationHistory extends IQEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations
	repositoryTransactionHistory: QRepositoryTransactionHistoryQRelation;

	// Non-Id Fields
	orderNumber: IQNumberField;
	changeType: IQNumberField;
	systemWideOperationId: IQNumberField;

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
	extends IQRelation<QOperationHistory>, QOperationHistoryQId {
}


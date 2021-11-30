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
	RepositoryTransactionHistory,
} from '../../ddl/history/RepositoryTransactionHistory';
import {
	SchemaEntityGraph,
	SchemaEntityEId,
	SchemaEntityEOptionalId,
	SchemaEntityEUpdateProperties,
	SchemaEntityESelect,
	QSchemaEntity,
	QSchemaEntityQId,
	QSchemaEntityQRelation,
	SchemaEntity,
} from '@airport/airspace';
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
import {
	RecordHistory,
} from '../../ddl/history/RecordHistory';
import {
	OperationHistory,
} from '../../ddl/history/OperationHistory';


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
	changeType?: string | IQStringField;
	systemWideOperationId?: number | IQNumberField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	repositoryTransactionHistory?: RepositoryTransactionHistoryESelect;
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

}

/**
 * Ids fields and relations only (optional).
 */
export interface OperationHistoryEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface OperationHistoryEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	orderNumber?: number | IQNumberField;
	changeType?: string | IQStringField;
	systemWideOperationId?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's
	repositoryTransactionHistory?: RepositoryTransactionHistoryEOptionalId;
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
	changeType?: string | IQStringField;
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
	CHANGE_TYPE?: string | IQStringField;
	SYSTEM_WIDE_OPERATION_ID?: number | IQNumberField;
	REPOSITORY_TRANSACTION_HISTORY_ID?: number | IQNumberField;
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
export interface QOperationHistory extends IQEntity<OperationHistory>
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	orderNumber: IQNumberField;
	changeType: IQStringField;
	systemWideOperationId: IQNumberField;

	// Non-Id Relations
	repositoryTransactionHistory: QRepositoryTransactionHistoryQRelation;
	entity: QSchemaEntityQRelation;
	recordHistory: IQOneToManyRelation<RecordHistory, QRecordHistory>;

}


// Entity Id Interface
export interface QOperationHistoryQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QOperationHistoryQRelation
	extends IQRelation<OperationHistory, QOperationHistory>, QOperationHistoryQId {
}


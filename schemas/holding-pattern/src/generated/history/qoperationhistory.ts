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
	IQAirEntityOneToManyRelation,
	IQAirEntityRelation,
	RawDelete,
	RawUpdate,
} from '@airport/air-traffic-control';
import {
	ApplicationEntityGraph,
	ApplicationEntityEId,
	ApplicationEntityEOptionalId,
	ApplicationEntityEUpdateProperties,
	ApplicationEntityESelect,
	QApplicationEntity,
	QApplicationEntityQId,
	QApplicationEntityQRelation,
	IApplicationEntity,
} from '@airport/airspace';
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
	IActor,
} from '../infrastructure/actor';
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
	IRecordHistory,
} from './recordhistory';
import {
	IOperationHistory,
} from './operationhistory';


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
	entity?: ApplicationEntityESelect;
	actor?: ActorESelect;
	repositoryTransactionHistory?: RepositoryTransactionHistoryESelect;
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
	entity?: ApplicationEntityEOptionalId;
	actor?: ActorEOptionalId;
	repositoryTransactionHistory?: RepositoryTransactionHistoryEOptionalId;

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
	entity?: ApplicationEntityGraph;
	actor?: ActorGraph;
	repositoryTransactionHistory?: RepositoryTransactionHistoryGraph;
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
	ENTITY_ID?: number | IQNumberField;
	ACTOR_LID?: number | IQNumberField;
	REPOSITORY_TRANSACTION_HISTORY_ID?: number | IQNumberField;

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
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QOperationHistory extends IQEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	orderNumber: IQNumberField;
	changeType: IQStringField;
	systemWideOperationId: IQNumberField;

	// Non-Id Relations
	entity: QApplicationEntityQRelation;
	actor: QActorQRelation;
	repositoryTransactionHistory: QRepositoryTransactionHistoryQRelation;
	recordHistory: IQOneToManyRelation<QRecordHistory>;

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
	extends IQRelation<QOperationHistory>, QOperationHistoryQId {
}


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
	RecordHistoryNewValueGraph,
	RecordHistoryNewValueEId,
	RecordHistoryNewValueEOptionalId,
	RecordHistoryNewValueEUpdateProperties,
	RecordHistoryNewValueESelect,
	QRecordHistoryNewValue,
	QRecordHistoryNewValueQId,
	QRecordHistoryNewValueQRelation,
} from './qrecordhistorynewvalue';
import {
	RecordHistoryOldValueGraph,
	RecordHistoryOldValueEId,
	RecordHistoryOldValueEOptionalId,
	RecordHistoryOldValueEUpdateProperties,
	RecordHistoryOldValueESelect,
	QRecordHistoryOldValue,
	QRecordHistoryOldValueQId,
	QRecordHistoryOldValueQRelation,
} from './qrecordhistoryoldvalue';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface RecordHistoryESelect
    extends IEntitySelectProperties, RecordHistoryEOptionalId {
	// Non-Id Properties
	actorRecordId?: number | IQNumberField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	actor?: ActorESelect;
	operationHistory?: OperationHistoryESelect;
	newValues?: RecordHistoryNewValueESelect;
	oldValues?: RecordHistoryOldValueESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RecordHistoryEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface RecordHistoryEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RecordHistoryEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	actorRecordId?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's
	actor?: ActorEOptionalId;
	operationHistory?: OperationHistoryEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RecordHistoryGraph
	extends RecordHistoryEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	actorRecordId?: number | IQNumberField;

	// Relations
	actor?: ActorGraph;
	operationHistory?: OperationHistoryGraph;
	newValues?: RecordHistoryNewValueGraph[];
	oldValues?: RecordHistoryOldValueGraph[];

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface RecordHistoryEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	ACTOR_RECORD_ID?: number | IQNumberField;
	ACTOR_ID?: number | IQNumberField;
	REPOSITORY_OPERATION_HISTORY_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RecordHistoryECreateProperties
extends Partial<RecordHistoryEId>, RecordHistoryEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RecordHistoryECreateColumns
extends RecordHistoryEId, RecordHistoryEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRecordHistory extends IQEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	actorRecordId: IQNumberField;

	// Non-Id Relations
	actor: QActorQRelation;
	operationHistory: QOperationHistoryQRelation;
	newValues: IQOneToManyRelation<QRecordHistoryNewValue>;
	oldValues: IQOneToManyRelation<QRecordHistoryOldValue>;

}


// Entity Id Interface
export interface QRecordHistoryQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QRecordHistoryQRelation
	extends IQRelation<QRecordHistory>, QRecordHistoryQId {
}


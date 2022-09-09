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
	ActorGraph,
	ActorEId,
	ActorEOptionalId,
	ActorEUpdateProperties,
	ActorESelect,
	QActor,
	QActorQId,
	QActorQRelation,
} from '../infrastructure/QActor';
import {
	IActor,
} from '../../entity/infrastructure/IActor';
import {
	OperationHistoryGraph,
	OperationHistoryEId,
	OperationHistoryEOptionalId,
	OperationHistoryEUpdateProperties,
	OperationHistoryESelect,
	QOperationHistory,
	QOperationHistoryQId,
	QOperationHistoryQRelation,
} from './QOperationHistory';
import {
	IOperationHistory,
} from '../../entity/history/IOperationHistory';
import {
	RecordHistoryNewValueGraph,
	RecordHistoryNewValueEId,
	RecordHistoryNewValueEOptionalId,
	RecordHistoryNewValueEUpdateProperties,
	RecordHistoryNewValueESelect,
	QRecordHistoryNewValue,
	QRecordHistoryNewValueQId,
	QRecordHistoryNewValueQRelation,
} from './QRecordHistoryNewValue';
import {
	IRecordHistoryNewValue,
} from '../../entity/history/IRecordHistoryNewValue';
import {
	RecordHistoryOldValueGraph,
	RecordHistoryOldValueEId,
	RecordHistoryOldValueEOptionalId,
	RecordHistoryOldValueEUpdateProperties,
	RecordHistoryOldValueESelect,
	QRecordHistoryOldValue,
	QRecordHistoryOldValueQId,
	QRecordHistoryOldValueQRelation,
} from './QRecordHistoryOldValue';
import {
	IRecordHistoryOldValue,
} from '../../entity/history/IRecordHistoryOldValue';
import {
	IRecordHistory,
} from '../../entity/history/IRecordHistory';


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface RecordHistoryESelect
    extends IEntitySelectProperties, RecordHistoryEOptionalId {
	// Non-Id Properties
	_actorRecordId?: number | IQNumberField;

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
	_localId: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface RecordHistoryEOptionalId {
	// Id Properties
	_localId?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RecordHistoryEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	_actorRecordId?: number | IQNumberField;

	// Non-Id Relations - _localIds only & no OneToMany's
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
	_actorRecordId?: number | IQNumberField;

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
	ACTOR_LID?: number | IQNumberField;
	OPERATION_HISTORY_LID?: number | IQNumberField;

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
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QRecordHistory<IQE extends QRecordHistory = any> extends IQEntity<IQE | QRecordHistory>
{
	// Id Fields
	_localId: IQNumberField;

	// Id Relations

	// Non-Id Fields
	_actorRecordId: IQNumberField;

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
	_localId: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QRecordHistoryQRelation
	extends IQRelation<QRecordHistory>, QRecordHistoryQId {
}
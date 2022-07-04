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
	ApplicationVersionGraph,
	ApplicationVersionEId,
	ApplicationVersionEOptionalId,
	ApplicationVersionEUpdateProperties,
	ApplicationVersionESelect,
	QApplicationVersion,
	QApplicationVersionQId,
	QApplicationVersionQRelation,
	IApplicationVersion,
	ApplicationEntityGraph,
	ApplicationEntityEId,
	ApplicationEntityEOptionalId,
	ApplicationEntityEUpdateProperties,
	ApplicationEntityESelect,
	QApplicationEntity,
	QApplicationEntityQId,
	QApplicationEntityQRelation,
	IApplicationEntity,
	ApplicationColumnGraph,
	ApplicationColumnEId,
	ApplicationColumnEOptionalId,
	ApplicationColumnEUpdateProperties,
	ApplicationColumnESelect,
	QApplicationColumn,
	QApplicationColumnQId,
	QApplicationColumnQRelation,
	IApplicationColumn,
} from '@airport/airspace';
import {
	RepositoryGraph,
	RepositoryEId,
	RepositoryEOptionalId,
	RepositoryEUpdateProperties,
	RepositoryESelect,
	QRepository,
	QRepositoryQId,
	QRepositoryQRelation,
	IRepository,
	ActorGraph,
	ActorEId,
	ActorEOptionalId,
	ActorEUpdateProperties,
	ActorESelect,
	QActor,
	QActorQId,
	QActorQRelation,
	IActor,
} from '@airport/holding-pattern';
import {
	IRecordUpdateStage,
} from './recordupdatestage';


declare function require(moduleName: string): any;


//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface RecordUpdateStageESelect
    extends IEntitySelectProperties, RecordUpdateStageEOptionalId {
	// Non-Id Properties
	_actorRecordId?: number | IQNumberField;
	updatedValue?: any | IQUntypedField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	applicationVersion?: ApplicationVersionESelect;
	entity?: ApplicationEntityESelect;
	repository?: RepositoryESelect;
	actor?: ActorESelect;
	column?: ApplicationColumnESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RecordUpdateStageEId
    extends IEntityIdProperties {
	// Id Properties
	_localId: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface RecordUpdateStageEOptionalId {
	// Id Properties
	_localId?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RecordUpdateStageEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	_actorRecordId?: number | IQNumberField;
	updatedValue?: any | IQUntypedField;

	// Non-Id Relations - ids only & no OneToMany's
	applicationVersion?: ApplicationVersionEOptionalId;
	entity?: ApplicationEntityEOptionalId;
	repository?: RepositoryEOptionalId;
	actor?: ActorEOptionalId;
	column?: ApplicationColumnEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RecordUpdateStageGraph
	extends RecordUpdateStageEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	_actorRecordId?: number | IQNumberField;
	updatedValue?: any | IQUntypedField;

	// Relations
	applicationVersion?: ApplicationVersionGraph;
	entity?: ApplicationEntityGraph;
	repository?: RepositoryGraph;
	actor?: ActorGraph;
	column?: ApplicationColumnGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface RecordUpdateStageEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	ACTOR_RECORD_ID?: number | IQNumberField;
	UPDATED_VALUE?: any | IQUntypedField;
	APPLICATION_VERSION_LID?: number | IQNumberField;
	APPLICATION_ENTITY_LID?: number | IQNumberField;
	REPOSITORY_LID?: number | IQNumberField;
	ACTOR_LID?: number | IQNumberField;
	APPLICATION_COLUMN_LID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RecordUpdateStageECreateProperties
extends Partial<RecordUpdateStageEId>, RecordUpdateStageEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RecordUpdateStageECreateColumns
extends RecordUpdateStageEId, RecordUpdateStageEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QRecordUpdateStage extends IQEntity
{
	// Id Fields
	_localId: IQNumberField;

	// Id Relations

	// Non-Id Fields
	_actorRecordId: IQNumberField;
	updatedValue: IQUntypedField;

	// Non-Id Relations
	applicationVersion: QApplicationVersionQRelation;
	entity: QApplicationEntityQRelation;
	repository: QRepositoryQRelation;
	actor: QActorQRelation;
	column: QApplicationColumnQRelation;

}


// Entity Id Interface
export interface QRecordUpdateStageQId
{
	
	// Id Fields
	_localId: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QRecordUpdateStageQRelation
	extends IQRelation<QRecordUpdateStage>, QRecordUpdateStageQId {
}


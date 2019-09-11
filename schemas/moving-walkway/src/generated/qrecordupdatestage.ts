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
	IQEntity,
	IQRelation,
	RawDelete,
	RawUpdate,
} from '@airport/air-control';
import {
	ISchemaVersion,
	SchemaVersionEId,
	SchemaVersionEOptionalId,
	SchemaVersionEUpdateProperties,
	SchemaVersionESelect,
	QSchemaVersion,
	QSchemaVersionQId,
	QSchemaVersionQRelation,
	ISchemaEntity,
	SchemaEntityEId,
	SchemaEntityEOptionalId,
	SchemaEntityEUpdateProperties,
	SchemaEntityESelect,
	QSchemaEntity,
	QSchemaEntityQId,
	QSchemaEntityQRelation,
	ISchemaColumn,
	SchemaColumnEId,
	SchemaColumnEOptionalId,
	SchemaColumnEUpdateProperties,
	SchemaColumnESelect,
	QSchemaColumn,
	QSchemaColumnQId,
	QSchemaColumnQRelation,
} from '@airport/traffic-pattern';
import {
	IRepository,
	RepositoryEId,
	RepositoryEOptionalId,
	RepositoryEUpdateProperties,
	RepositoryESelect,
	QRepository,
	QRepositoryQId,
	QRepositoryQRelation,
	IActor,
	ActorEId,
	ActorEOptionalId,
	ActorEUpdateProperties,
	ActorESelect,
	QActor,
	QActorQId,
	QActorQRelation,
} from '@airport/holding-pattern';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IRecordUpdateStage {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	actorRecordId?: number;
	updatedValue?: any;

	// Non-Id Relations
	schemaVersion?: ISchemaVersion;
	entity?: ISchemaEntity;
	repository?: IRepository;
	actor?: IActor;
	column?: ISchemaColumn;

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface RecordUpdateStageESelect
    extends IEntitySelectProperties, RecordUpdateStageEOptionalId {
	// Non-Id Properties
	actorRecordId?: number | IQNumberField;
	updatedValue?: any | IQUntypedField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	schemaVersion?: SchemaVersionESelect;
	entity?: SchemaEntityESelect;
	repository?: RepositoryESelect;
	actor?: ActorESelect;
	column?: SchemaColumnESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RecordUpdateStageEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface RecordUpdateStageEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RecordUpdateStageEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	actorRecordId?: number | IQNumberField;
	updatedValue?: any | IQUntypedField;

	// Non-Id Relations - ids only & no OneToMany's
	schemaVersion?: SchemaVersionEOptionalId;
	entity?: SchemaEntityEOptionalId;
	repository?: RepositoryEOptionalId;
	actor?: ActorEOptionalId;
	column?: SchemaColumnEOptionalId;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface RecordUpdateStageEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	ACTOR_RECORD_ID?: number | IQNumberField;
	UPDATED_VALUE?: any | IQUntypedField;
	SCHEMA_VERSION_ID?: number | IQNumberField;
	SCHEMA_ENTITY_ID?: number | IQNumberField;
	REPOSITORY_ID?: number | IQNumberField;
	ACTOR_ID?: number | IQNumberField;
	SCHEMA_COLUMN_ID?: number | IQNumberField;

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
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRecordUpdateStage extends IQEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	actorRecordId: IQNumberField;
	updatedValue: IQUntypedField;

	// Non-Id Relations
	schemaVersion: QSchemaVersionQRelation;
	entity: QSchemaEntityQRelation;
	repository: QRepositoryQRelation;
	actor: QActorQRelation;
	column: QSchemaColumnQRelation;

}


// Entity Id Interface
export interface QRecordUpdateStageQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QRecordUpdateStageQRelation
	extends IQRelation<QRecordUpdateStage>, QRecordUpdateStageQId {
}


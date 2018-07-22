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
	IActor,
	ActorEId,
	ActorEOptionalId,
	ActorEUpdateProperties,
	ActorESelect,
	QActor,
	QActorQId,
	QActorQRelation,
	IRepository,
	RepositoryEId,
	RepositoryEOptionalId,
	RepositoryEUpdateProperties,
	RepositoryESelect,
	QRepository,
	QRepositoryQId,
	QRepositoryQRelation,
} from '@airport/holding-pattern';


declare function require(moduleName: string): any;


//////////////////////////////
//     ENTITY INTERFACE     //
//////////////////////////////

export interface IRecordUpdateStage {
	
	// Id Properties
	actorRecordId?: number;

	// Id Relations
	schemaVersion?: ISchemaVersion;
	entity?: ISchemaEntity;
	actor?: IActor;
	column?: ISchemaColumn;

	// Non-Id Properties
	updatedValue?: any;

	// Non-Id Relations
	repository?: IRepository;

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
    extends IEntitySelectProperties, RecordUpdateStageEOptionalId, RecordUpdateStageEUpdateProperties {
	// Id Relations - full property interfaces
	schemaVersion?: SchemaVersionESelect;
	entity?: SchemaEntityESelect;
	actor?: ActorESelect;
	column?: SchemaColumnESelect;

  // Non-Id relations (including OneToMany's)
	repository?: RepositoryESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RecordUpdateStageEId
    extends IEntityIdProperties {
	// Id Properties
	actorRecordId: number | IQNumberField;

	// Id Relations - Ids only
	schemaVersion: SchemaVersionEId;
	entity: SchemaEntityEId;
	actor: ActorEId;
	column: SchemaColumnEId;

}

/**
 * Ids fields and relations only (optional).
 */
export interface RecordUpdateStageEOptionalId {
	// Id Properties
	actorRecordId?: number | IQNumberField;

	// Id Relations - Ids only
	schemaVersion?: SchemaVersionEOptionalId;
	entity?: SchemaEntityEOptionalId;
	actor?: ActorEOptionalId;
	column?: SchemaColumnEOptionalId;

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RecordUpdateStageEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	updatedValue?: any | IQUntypedField;

	// Non-Id Relations - ids only & no OneToMany's
	repository?: RepositoryEOptionalId;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface RecordUpdateStageEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	UPDATED_VALUE?: any | IQUntypedField;
	REPOSITORY_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RecordUpdateStageECreateProperties
extends RecordUpdateStageEId, RecordUpdateStageEUpdateProperties {
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
export interface QRecordUpdateStage extends QEntity
{
	// Id Fields
	actorRecordId: IQNumberField;

	// Id Relations
	schemaVersion: QSchemaVersionQRelation;
	entity: QSchemaEntityQRelation;
	actor: QActorQRelation;
	column: QSchemaColumnQRelation;

	// Non-Id Fields
	updatedValue: IQUntypedField;

	// Non-Id Relations
	repository: QRepositoryQRelation;

}


// Entity Id Interface
export interface QRecordUpdateStageQId
{
	
	// Id Fields
	actorRecordId: IQNumberField;

	// Id Relations
	schemaVersion: QSchemaVersionQId;
	entity: QSchemaEntityQId;
	actor: QActorQId;
	column: QSchemaColumnQId;


}

// Entity Relation Interface
export interface QRecordUpdateStageQRelation
	extends QRelation<QRecordUpdateStage>, QRecordUpdateStageQId {
}


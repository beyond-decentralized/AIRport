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
	ISchemaVersion,
	SchemaVersionECascadeGraph,
	SchemaVersionEId,
	SchemaVersionEOptionalId,
	SchemaVersionEUpdateProperties,
	SchemaVersionESelect,
	QSchemaVersion,
	QSchemaVersionQId,
	QSchemaVersionQRelation,
	ISchemaEntity,
	SchemaEntityECascadeGraph,
	SchemaEntityEId,
	SchemaEntityEOptionalId,
	SchemaEntityEUpdateProperties,
	SchemaEntityESelect,
	QSchemaEntity,
	QSchemaEntityQId,
	QSchemaEntityQRelation,
} from '@airport/traffic-pattern';
import {
	IRepository,
	RepositoryECascadeGraph,
	RepositoryEId,
	RepositoryEOptionalId,
	RepositoryEUpdateProperties,
	RepositoryESelect,
	QRepository,
	QRepositoryQId,
	QRepositoryQRelation,
	IActor,
	ActorECascadeGraph,
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

export interface IMissingRecord {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	actorRecordId?: number;
	status?: number;

	// Non-Id Relations
	schemaVersion?: ISchemaVersion;
	entity?: ISchemaEntity;
	repository?: IRepository;
	actor?: IActor;

	// Transient Properties

	// Public Methods
	
}		
		
//////////////////////////////
//  API SPECIFIC INTERFACES //
//////////////////////////////

/**
 * SELECT - All fields and relations (optional).
 */
export interface MissingRecordESelect
    extends IEntitySelectProperties, MissingRecordEOptionalId {
	// Non-Id Properties
	actorRecordId?: number | IQNumberField;
	status?: number | IQNumberField;

	// Id Relations - full property interfaces

  // Non-Id relations (including OneToMany's)
	schemaVersion?: SchemaVersionESelect;
	entity?: SchemaEntityESelect;
	repository?: RepositoryESelect;
	actor?: ActorESelect;

}

/**
 * DELETE - Ids fields and relations only (required).
 */
export interface MissingRecordEId
    extends IEntityIdProperties {
	// Id Properties
	id: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * Ids fields and relations only (optional).
 */
export interface MissingRecordEOptionalId {
	// Id Properties
	id?: number | IQNumberField;

	// Id Relations - Ids only

}

/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface MissingRecordEUpdateProperties
	extends IEntityUpdateProperties {
	// Non-Id Properties
	actorRecordId?: number | IQNumberField;
	status?: number | IQNumberField;

	// Non-Id Relations - ids only & no OneToMany's
	schemaVersion?: SchemaVersionEOptionalId;
	entity?: SchemaEntityEOptionalId;
	repository?: RepositoryEOptionalId;
	actor?: ActorEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface MissingRecordECascadeGraph
	extends IEntityCascadeGraph {
	// Cascading Relations

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface MissingRecordEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	ACTOR_RECORD_ID?: number | IQNumberField;
	STATUS?: number | IQNumberField;
	SCHEMA_VERSION_ID?: number | IQNumberField;
	SCHEMA_ENTITY_ID?: number | IQNumberField;
	REPOSITORY_ID?: number | IQNumberField;
	ACTOR_ID?: number | IQNumberField;

}

/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface MissingRecordECreateProperties
extends Partial<MissingRecordEId>, MissingRecordEUpdateProperties {
}

/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface MissingRecordECreateColumns
extends MissingRecordEId, MissingRecordEUpdateColumns {
}




///////////////////////////////////////////////
//  QUERY IMPLEMENTATION SPECIFIC INTERFACES //
///////////////////////////////////////////////

/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QMissingRecord extends IQEntity
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	actorRecordId: IQNumberField;
	status: IQNumberField;

	// Non-Id Relations
	schemaVersion: QSchemaVersionQRelation;
	entity: QSchemaEntityQRelation;
	repository: QRepositoryQRelation;
	actor: QActorQRelation;

}


// Entity Id Interface
export interface QMissingRecordQId
{
	
	// Id Fields
	id: IQNumberField;

	// Id Relations


}

// Entity Relation Interface
export interface QMissingRecordQRelation
	extends IQRelation<QMissingRecord>, QMissingRecordQId {
}


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
	SchemaVersionGraph,
	SchemaVersionEId,
	SchemaVersionEOptionalId,
	SchemaVersionEUpdateProperties,
	SchemaVersionESelect,
	QSchemaVersion,
	QSchemaVersionQId,
	QSchemaVersionQRelation,
	SchemaVersion,
	SchemaEntityGraph,
	SchemaEntityEId,
	SchemaEntityEOptionalId,
	SchemaEntityEUpdateProperties,
	SchemaEntityESelect,
	QSchemaEntity,
	QSchemaEntityQId,
	QSchemaEntityQRelation,
	SchemaEntity,
} from '@airport/traffic-pattern';
import {
	RepositoryGraph,
	RepositoryEId,
	RepositoryEOptionalId,
	RepositoryEUpdateProperties,
	RepositoryESelect,
	QRepository,
	QRepositoryQId,
	QRepositoryQRelation,
	Repository,
	ActorGraph,
	ActorEId,
	ActorEOptionalId,
	ActorEUpdateProperties,
	ActorESelect,
	QActor,
	QActorQId,
	QActorQRelation,
	Actor,
} from '@airport/holding-pattern';
import {
	MissingRecord,
} from '../../ddl/missingRecord/MissingRecord';


declare function require(moduleName: string): any;


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
	status?: string | IQStringField;

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
	status?: string | IQStringField;

	// Non-Id Relations - ids only & no OneToMany's
	schemaVersion?: SchemaVersionEOptionalId;
	entity?: SchemaEntityEOptionalId;
	repository?: RepositoryEOptionalId;
	actor?: ActorEOptionalId;

}

/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface MissingRecordGraph
	extends MissingRecordEOptionalId, IEntityCascadeGraph {
// NOT USED: Cascading Relations
// NOT USED: ${relationsForCascadeGraph}
	// Non-Id Properties
	actorRecordId?: number | IQNumberField;
	status?: string | IQStringField;

	// Relations
	schemaVersion?: SchemaVersionGraph;
	entity?: SchemaEntityGraph;
	repository?: RepositoryGraph;
	actor?: ActorGraph;

}

/**
 * UPDATE - non-id columns (optional).
 */
export interface MissingRecordEUpdateColumns
	extends IEntityUpdateColumns {
	// Non-Id Columns
	ACTOR_RECORD_ID?: number | IQNumberField;
	STATUS?: string | IQStringField;
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
export interface QMissingRecord extends IQEntity<MissingRecord>
{
	// Id Fields
	id: IQNumberField;

	// Id Relations

	// Non-Id Fields
	actorRecordId: IQNumberField;
	status: IQStringField;

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
	extends IQRelation<MissingRecord, QMissingRecord>, QMissingRecordQId {
}


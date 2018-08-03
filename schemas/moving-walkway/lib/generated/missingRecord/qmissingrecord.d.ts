import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, QEntity, QRelation } from '@airport/air-control';
import { ISchemaVersion, SchemaVersionEOptionalId, SchemaVersionESelect, QSchemaVersionQRelation, ISchemaEntity, SchemaEntityEOptionalId, SchemaEntityESelect, QSchemaEntityQRelation } from '@airport/traffic-pattern';
import { IRepository, RepositoryEOptionalId, RepositoryESelect, QRepositoryQRelation, IActor, ActorEOptionalId, ActorESelect, QActorQRelation } from '@airport/holding-pattern';
export interface IMissingRecord {
    id?: number;
    actorRecordId?: number;
    status?: number;
    schemaVersion?: ISchemaVersion;
    entity?: ISchemaEntity;
    repository?: IRepository;
    actor?: IActor;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface MissingRecordESelect extends IEntitySelectProperties, MissingRecordEOptionalId, MissingRecordEUpdateProperties {
    schemaVersion?: SchemaVersionESelect;
    entity?: SchemaEntityESelect;
    repository?: RepositoryESelect;
    actor?: ActorESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface MissingRecordEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface MissingRecordEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface MissingRecordEUpdateProperties extends IEntityUpdateProperties {
    actorRecordId?: number | IQNumberField;
    status?: number | IQNumberField;
    schemaVersion?: SchemaVersionEOptionalId;
    entity?: SchemaEntityEOptionalId;
    repository?: RepositoryEOptionalId;
    actor?: ActorEOptionalId;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface MissingRecordEUpdateColumns extends IEntityUpdateColumns {
    ACTOR_RECORD_ID?: number | IQNumberField;
    STATUS?: number | IQNumberField;
    SCHEMA_VERSION_ID?: number | IQNumberField;
    ENTITY_INDEX?: number | IQNumberField;
    REPOSITORY_ID?: number | IQNumberField;
    ACTOR_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface MissingRecordECreateProperties extends Partial<MissingRecordEId>, MissingRecordEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface MissingRecordECreateColumns extends MissingRecordEId, MissingRecordEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QMissingRecord extends QEntity {
    id: IQNumberField;
    actorRecordId: IQNumberField;
    status: IQNumberField;
    schemaVersion: QSchemaVersionQRelation;
    entity: QSchemaEntityQRelation;
    repository: QRepositoryQRelation;
    actor: QActorQRelation;
}
export interface QMissingRecordQId {
    id: IQNumberField;
}
export interface QMissingRecordQRelation extends QRelation<QMissingRecord>, QMissingRecordQId {
}

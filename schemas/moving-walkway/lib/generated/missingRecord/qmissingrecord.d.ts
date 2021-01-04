import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQEntity, IQRelation } from '@airport/air-control';
import { SchemaVersionGraph, SchemaVersionEOptionalId, SchemaVersionESelect, QSchemaVersionQRelation, SchemaEntityGraph, SchemaEntityEOptionalId, SchemaEntityESelect, QSchemaEntityQRelation } from '@airport/traffic-pattern';
import { RepositoryGraph, RepositoryEOptionalId, RepositoryESelect, QRepositoryQRelation, ActorGraph, ActorEOptionalId, ActorESelect, QActorQRelation } from '@airport/holding-pattern';
import { MissingRecord } from '../../ddl/missingRecord/MissingRecord';
/**
 * SELECT - All fields and relations (optional).
 */
export interface MissingRecordESelect extends IEntitySelectProperties, MissingRecordEOptionalId {
    actorRecordId?: number | IQNumberField;
    status?: number | IQNumberField;
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
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface MissingRecordGraph extends MissingRecordEOptionalId, IEntityCascadeGraph {
    actorRecordId?: number | IQNumberField;
    status?: number | IQNumberField;
    schemaVersion?: SchemaVersionGraph;
    entity?: SchemaEntityGraph;
    repository?: RepositoryGraph;
    actor?: ActorGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface MissingRecordEUpdateColumns extends IEntityUpdateColumns {
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
export interface QMissingRecord extends IQEntity<MissingRecord> {
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
export interface QMissingRecordQRelation extends IQRelation<MissingRecord, QMissingRecord>, QMissingRecordQId {
}
//# sourceMappingURL=qmissingrecord.d.ts.map
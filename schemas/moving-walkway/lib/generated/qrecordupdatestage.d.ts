import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQUntypedField, IQEntity, IQRelation } from '@airport/air-control';
import { SchemaVersionGraph, SchemaVersionEOptionalId, SchemaVersionESelect, QSchemaVersionQRelation, SchemaEntityGraph, SchemaEntityEOptionalId, SchemaEntityESelect, QSchemaEntityQRelation, SchemaColumnGraph, SchemaColumnEOptionalId, SchemaColumnESelect, QSchemaColumnQRelation } from '@airport/traffic-pattern';
import { RepositoryGraph, RepositoryEOptionalId, RepositoryESelect, QRepositoryQRelation, ActorGraph, ActorEOptionalId, ActorESelect, QActorQRelation } from '@airport/holding-pattern';
import { RecordUpdateStage } from '../ddl/RecordUpdateStage';
/**
 * SELECT - All fields and relations (optional).
 */
export interface RecordUpdateStageESelect extends IEntitySelectProperties, RecordUpdateStageEOptionalId {
    actorRecordId?: number | IQNumberField;
    updatedValue?: any | IQUntypedField;
    schemaVersion?: SchemaVersionESelect;
    entity?: SchemaEntityESelect;
    repository?: RepositoryESelect;
    actor?: ActorESelect;
    column?: SchemaColumnESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RecordUpdateStageEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface RecordUpdateStageEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RecordUpdateStageEUpdateProperties extends IEntityUpdateProperties {
    actorRecordId?: number | IQNumberField;
    updatedValue?: any | IQUntypedField;
    schemaVersion?: SchemaVersionEOptionalId;
    entity?: SchemaEntityEOptionalId;
    repository?: RepositoryEOptionalId;
    actor?: ActorEOptionalId;
    column?: SchemaColumnEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RecordUpdateStageGraph extends RecordUpdateStageEOptionalId, IEntityCascadeGraph {
    actorRecordId?: number | IQNumberField;
    updatedValue?: any | IQUntypedField;
    schemaVersion?: SchemaVersionGraph;
    entity?: SchemaEntityGraph;
    repository?: RepositoryGraph;
    actor?: ActorGraph;
    column?: SchemaColumnGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface RecordUpdateStageEUpdateColumns extends IEntityUpdateColumns {
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
export interface RecordUpdateStageECreateProperties extends Partial<RecordUpdateStageEId>, RecordUpdateStageEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RecordUpdateStageECreateColumns extends RecordUpdateStageEId, RecordUpdateStageEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRecordUpdateStage extends IQEntity<RecordUpdateStage> {
    id: IQNumberField;
    actorRecordId: IQNumberField;
    updatedValue: IQUntypedField;
    schemaVersion: QSchemaVersionQRelation;
    entity: QSchemaEntityQRelation;
    repository: QRepositoryQRelation;
    actor: QActorQRelation;
    column: QSchemaColumnQRelation;
}
export interface QRecordUpdateStageQId {
    id: IQNumberField;
}
export interface QRecordUpdateStageQRelation extends IQRelation<RecordUpdateStage, QRecordUpdateStage>, QRecordUpdateStageQId {
}
//# sourceMappingURL=qrecordupdatestage.d.ts.map
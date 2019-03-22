import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQUntypedField, QEntity, QRelation } from '@airport/air-control';
import { ISchemaVersion, SchemaVersionEOptionalId, SchemaVersionESelect, QSchemaVersionQRelation, ISchemaEntity, SchemaEntityEOptionalId, SchemaEntityESelect, QSchemaEntityQRelation, ISchemaColumn, SchemaColumnEOptionalId, SchemaColumnESelect, QSchemaColumnQRelation } from '@airport/traffic-pattern';
import { IRepository, RepositoryEOptionalId, RepositoryESelect, QRepositoryQRelation, IActor, ActorEOptionalId, ActorESelect, QActorQRelation } from '@airport/holding-pattern';
export interface IRecordUpdateStage {
    id?: number;
    actorRecordId?: number;
    updatedValue?: any;
    schemaVersion?: ISchemaVersion;
    entity?: ISchemaEntity;
    repository?: IRepository;
    actor?: IActor;
    column?: ISchemaColumn;
}
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
 * UPDATE - non-id columns (optional).
 */
export interface RecordUpdateStageEUpdateColumns extends IEntityUpdateColumns {
    ACTOR_RECORD_ID?: number | IQNumberField;
    UPDATED_VALUE?: any | IQUntypedField;
    SCHEMA_VERSION_ID?: number | IQNumberField;
    TABLE_INDEX?: number | IQNumberField;
    REPOSITORY_ID?: number | IQNumberField;
    ACTOR_ID?: number | IQNumberField;
    SCHEMA_ENTITY_ID?: number | IQNumberField;
    COLUMN_INDEX?: number | IQNumberField;
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
export interface QRecordUpdateStage extends QEntity {
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
export interface QRecordUpdateStageQRelation extends QRelation<QRecordUpdateStage>, QRecordUpdateStageQId {
}

import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQUntypedField, QEntity, QRelation } from '@airport/air-control';
import { ISchema, SchemaEId, SchemaEOptionalId, SchemaESelect, QSchemaQId, QSchemaQRelation, ISchemaEntity, SchemaEntityEId, SchemaEntityEOptionalId, SchemaEntityESelect, QSchemaEntityQId, QSchemaEntityQRelation, ISchemaColumn, SchemaColumnEId, SchemaColumnEOptionalId, SchemaColumnESelect, QSchemaColumnQId, QSchemaColumnQRelation } from '@airport/traffic-pattern';
import { IActor, ActorEId, ActorEOptionalId, ActorESelect, QActorQId, QActorQRelation, IRepository, RepositoryEOptionalId, RepositoryESelect, QRepositoryQRelation } from '@airport/holding-pattern';
export interface IRecordUpdateStage {
    actorRecordId?: number;
    schema?: ISchema;
    entity?: ISchemaEntity;
    actor?: IActor;
    column?: ISchemaColumn;
    updatedValue?: any;
    repository?: IRepository;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface RecordUpdateStageESelect extends IEntitySelectProperties, RecordUpdateStageEOptionalId, RecordUpdateStageEUpdateProperties {
    schema?: SchemaESelect;
    entity?: SchemaEntityESelect;
    actor?: ActorESelect;
    column?: SchemaColumnESelect;
    repository?: RepositoryESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RecordUpdateStageEId extends IEntityIdProperties {
    actorRecordId: number | IQNumberField;
    schema: SchemaEId;
    entity: SchemaEntityEId;
    actor: ActorEId;
    column: SchemaColumnEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface RecordUpdateStageEOptionalId {
    actorRecordId?: number | IQNumberField;
    schema?: SchemaEOptionalId;
    entity?: SchemaEntityEOptionalId;
    actor?: ActorEOptionalId;
    column?: SchemaColumnEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RecordUpdateStageEUpdateProperties extends IEntityUpdateProperties {
    updatedValue?: any | IQUntypedField;
    repository?: RepositoryEOptionalId;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface RecordUpdateStageEUpdateColumns extends IEntityUpdateColumns {
    UPDATED_VALUE?: any | IQUntypedField;
    REPOSITORY_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RecordUpdateStageECreateProperties extends RecordUpdateStageEId, RecordUpdateStageEUpdateProperties {
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
    actorRecordId: IQNumberField;
    schema: QSchemaQRelation;
    entity: QSchemaEntityQRelation;
    actor: QActorQRelation;
    column: QSchemaColumnQRelation;
    updatedValue: IQUntypedField;
    repository: QRepositoryQRelation;
}
export interface QRecordUpdateStageQId {
    actorRecordId: IQNumberField;
    schema: QSchemaQId;
    entity: QSchemaEntityQId;
    actor: QActorQId;
    column: QSchemaColumnQId;
}
export interface QRecordUpdateStageQRelation extends QRelation<QRecordUpdateStage>, QRecordUpdateStageQId {
}

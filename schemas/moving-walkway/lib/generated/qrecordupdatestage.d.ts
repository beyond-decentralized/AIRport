import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQUntypedField, IQEntity, IQRelation } from '@airport/air-traffic-control';
import { ApplicationVersionGraph, ApplicationVersionEOptionalId, ApplicationVersionESelect, QApplicationVersionQRelation, ApplicationEntityGraph, ApplicationEntityEOptionalId, ApplicationEntityESelect, QApplicationEntityQRelation, ApplicationColumnGraph, ApplicationColumnEOptionalId, ApplicationColumnESelect, QApplicationColumnQRelation } from '@airport/airspace';
import { RepositoryGraph, RepositoryEOptionalId, RepositoryESelect, QRepositoryQRelation, ActorGraph, ActorEOptionalId, ActorESelect, QActorQRelation } from '@airport/holding-pattern';
/**
 * SELECT - All fields and relations (optional).
 */
export interface RecordUpdateStageESelect extends IEntitySelectProperties, RecordUpdateStageEOptionalId {
    _actorRecordId?: number | IQNumberField;
    updatedValue?: any | IQUntypedField;
    applicationVersion?: ApplicationVersionESelect;
    entity?: ApplicationEntityESelect;
    repository?: RepositoryESelect;
    actor?: ActorESelect;
    column?: ApplicationColumnESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RecordUpdateStageEId extends IEntityIdProperties {
    _localId: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface RecordUpdateStageEOptionalId {
    _localId?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RecordUpdateStageEUpdateProperties extends IEntityUpdateProperties {
    _actorRecordId?: number | IQNumberField;
    updatedValue?: any | IQUntypedField;
    applicationVersion?: ApplicationVersionEOptionalId;
    entity?: ApplicationEntityEOptionalId;
    repository?: RepositoryEOptionalId;
    actor?: ActorEOptionalId;
    column?: ApplicationColumnEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RecordUpdateStageGraph extends RecordUpdateStageEOptionalId, IEntityCascadeGraph {
    _actorRecordId?: number | IQNumberField;
    updatedValue?: any | IQUntypedField;
    applicationVersion?: ApplicationVersionGraph;
    entity?: ApplicationEntityGraph;
    repository?: RepositoryGraph;
    actor?: ActorGraph;
    column?: ApplicationColumnGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface RecordUpdateStageEUpdateColumns extends IEntityUpdateColumns {
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
export interface RecordUpdateStageECreateProperties extends Partial<RecordUpdateStageEId>, RecordUpdateStageEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RecordUpdateStageECreateColumns extends RecordUpdateStageEId, RecordUpdateStageEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QRecordUpdateStage extends IQEntity {
    _localId: IQNumberField;
    _actorRecordId: IQNumberField;
    updatedValue: IQUntypedField;
    applicationVersion: QApplicationVersionQRelation;
    entity: QApplicationEntityQRelation;
    repository: QRepositoryQRelation;
    actor: QActorQRelation;
    column: QApplicationColumnQRelation;
}
export interface QRecordUpdateStageQId {
    _localId: IQNumberField;
}
export interface QRecordUpdateStageQRelation extends IQRelation<QRecordUpdateStage>, QRecordUpdateStageQId {
}
//# sourceMappingURL=qrecordupdatestage.d.ts.map
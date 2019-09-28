import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQEntity, IQRelation } from '@airport/air-control';
import { ActorEId, ActorEOptionalId, ActorESelect, QActorQId, QActorQRelation } from './qactor';
import { ApplicationEOptionalId, ApplicationESelect, QApplicationQRelation } from './qapplication';
/**
 * SELECT - All fields and relations (optional).
 */
export interface ActorApplicationESelect extends IEntitySelectProperties, ActorApplicationEOptionalId {
    actor?: ActorESelect;
    application?: ApplicationESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ActorApplicationEId extends IEntityIdProperties {
    id: number | IQNumberField;
    actor: ActorEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface ActorApplicationEOptionalId {
    id?: number | IQNumberField;
    actor?: ActorEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ActorApplicationEUpdateProperties extends IEntityUpdateProperties {
    application?: ApplicationEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ActorApplicationECascadeGraph extends IEntityCascadeGraph {
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ActorApplicationEUpdateColumns extends IEntityUpdateColumns {
    APPLICATION_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ActorApplicationECreateProperties extends Partial<ActorApplicationEId>, ActorApplicationEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ActorApplicationECreateColumns extends ActorApplicationEId, ActorApplicationEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QActorApplication extends IQEntity {
    id: IQNumberField;
    actor: QActorQRelation;
    application: QApplicationQRelation;
}
export interface QActorApplicationQId {
    id: IQNumberField;
    actor: QActorQId;
}
export interface QActorApplicationQRelation extends IQRelation<QActorApplication>, QActorApplicationQId {
}

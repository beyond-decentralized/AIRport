import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQBooleanField, IQEntity, IQRelation } from '@airport/air-control';
import { ISynchronizationConflict, SynchronizationConflictEId, SynchronizationConflictEOptionalId, SynchronizationConflictESelect, QSynchronizationConflictQId, QSynchronizationConflictQRelation } from './qsynchronizationconflict';
import { IActor, ActorEId, ActorEOptionalId, ActorESelect, QActorQId, QActorQRelation } from '@airport/holding-pattern';
export interface ISynchronizationConflictPendingNotification {
    synchronizationConflict: ISynchronizationConflict;
    actor: IActor;
    acknowledged?: boolean;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface SynchronizationConflictPendingNotificationESelect extends IEntitySelectProperties, SynchronizationConflictPendingNotificationEOptionalId {
    acknowledged?: boolean | IQBooleanField;
    synchronizationConflict?: SynchronizationConflictESelect;
    actor?: ActorESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SynchronizationConflictPendingNotificationEId extends IEntityIdProperties {
    synchronizationConflict: SynchronizationConflictEId;
    actor: ActorEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SynchronizationConflictPendingNotificationEOptionalId {
    synchronizationConflict?: SynchronizationConflictEOptionalId;
    actor?: ActorEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SynchronizationConflictPendingNotificationEUpdateProperties extends IEntityUpdateProperties {
    acknowledged?: boolean | IQBooleanField;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SynchronizationConflictPendingNotificationECascadeGraph extends IEntityCascadeGraph {
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SynchronizationConflictPendingNotificationEUpdateColumns extends IEntityUpdateColumns {
    ACKNOWLEDGED?: boolean | IQBooleanField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SynchronizationConflictPendingNotificationECreateProperties extends Partial<SynchronizationConflictPendingNotificationEId>, SynchronizationConflictPendingNotificationEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SynchronizationConflictPendingNotificationECreateColumns extends SynchronizationConflictPendingNotificationEId, SynchronizationConflictPendingNotificationEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSynchronizationConflictPendingNotification extends IQEntity {
    synchronizationConflict: QSynchronizationConflictQRelation;
    actor: QActorQRelation;
    acknowledged: IQBooleanField;
}
export interface QSynchronizationConflictPendingNotificationQId {
    synchronizationConflict: QSynchronizationConflictQId;
    actor: QActorQId;
}
export interface QSynchronizationConflictPendingNotificationQRelation extends IQRelation<QSynchronizationConflictPendingNotification>, QSynchronizationConflictPendingNotificationQId {
}

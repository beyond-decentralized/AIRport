import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQStringField, IQEntity, IQRelation } from '@airport/air-traffic-control';
import { UserGraph, UserEOptionalId, UserESelect, QUserQRelation, TerminalGraph, TerminalEOptionalId, TerminalESelect, QTerminalQRelation, ClientGraph, ClientEOptionalId, ClientESelect, QClientQRelation } from '@airport/travel-document-checkpoint';
import { ApplicationGraph, ApplicationEOptionalId, ApplicationESelect, QApplicationQRelation } from '@airport/airspace';
/**
 * SELECT - All fields and relations (optional).
 */
export interface ActorESelect extends IEntitySelectProperties, ActorEOptionalId {
    GUID?: string | IQStringField;
    user?: UserESelect;
    terminal?: TerminalESelect;
    application?: ApplicationESelect;
    client?: ClientESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ActorEId extends IEntityIdProperties {
    _localId?: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface ActorEOptionalId {
    _localId?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ActorEUpdateProperties extends IEntityUpdateProperties {
    GUID?: string | IQStringField;
    user?: UserEOptionalId;
    terminal?: TerminalEOptionalId;
    application?: ApplicationEOptionalId;
    client?: ClientEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ActorGraph extends ActorEOptionalId, IEntityCascadeGraph {
    GUID?: string | IQStringField;
    user?: UserGraph;
    terminal?: TerminalGraph;
    application?: ApplicationGraph;
    client?: ClientGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ActorEUpdateColumns extends IEntityUpdateColumns {
    GUID?: string | IQStringField;
    USER_LID?: number | IQNumberField;
    TERMINAL_LID?: number | IQNumberField;
    APPLICATION_INDEX?: number | IQNumberField;
    CLIENT_LID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ActorECreateProperties extends Partial<ActorEId>, ActorEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ActorECreateColumns extends ActorEId, ActorEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QActor extends IQEntity {
    _localId: IQNumberField;
    GUID: IQStringField;
    user: QUserQRelation;
    terminal: QTerminalQRelation;
    application: QApplicationQRelation;
    client: QClientQRelation;
}
export interface QActorQId {
    _localId: IQNumberField;
}
export interface QActorQRelation extends IQRelation<QActor>, QActorQId {
}
//# sourceMappingURL=qactor.d.ts.map
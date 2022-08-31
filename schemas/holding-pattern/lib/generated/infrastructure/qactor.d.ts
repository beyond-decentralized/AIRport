import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQStringField, IQEntity, IQRelation } from '@airport/tarmaq-query';
import { UserAccountGraph, UserAccountEOptionalId, UserAccountESelect, QUserAccountQRelation, TerminalGraph, TerminalEOptionalId, TerminalESelect, QTerminalQRelation } from '@airport/travel-document-checkpoint';
import { ApplicationGraph, ApplicationEOptionalId, ApplicationESelect, QApplicationQRelation } from '@airport/airspace';
/**
 * SELECT - All fields and relations (optional).
 */
export interface ActorESelect extends IEntitySelectProperties, ActorEOptionalId {
    GUID?: string | IQStringField;
    userAccount?: UserAccountESelect;
    terminal?: TerminalESelect;
    application?: ApplicationESelect;
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
    userAccount?: UserAccountEOptionalId;
    terminal?: TerminalEOptionalId;
    application?: ApplicationEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ActorGraph extends ActorEOptionalId, IEntityCascadeGraph {
    GUID?: string | IQStringField;
    userAccount?: UserAccountGraph;
    terminal?: TerminalGraph;
    application?: ApplicationGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ActorEUpdateColumns extends IEntityUpdateColumns {
    GUID?: string | IQStringField;
    USER_ACCOUNT_LID?: number | IQNumberField;
    TERMINAL_LID?: number | IQNumberField;
    APPLICATION_INDEX?: number | IQNumberField;
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
export interface QActor<IQE extends QActor = any> extends IQEntity<IQE | QActor> {
    _localId: IQNumberField;
    GUID: IQStringField;
    userAccount: QUserAccountQRelation;
    terminal: QTerminalQRelation;
    application: QApplicationQRelation;
}
export interface QActorQId {
    _localId: IQNumberField;
}
export interface QActorQRelation extends IQRelation<QActor>, QActorQId {
}
//# sourceMappingURL=qactor.d.ts.map
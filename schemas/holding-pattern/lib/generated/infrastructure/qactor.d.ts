import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQStringField, IQEntity, IQRelation } from '@airport/air-traffic-control';
import { UserGraph, UserEOptionalId, UserESelect, QUserQRelation, TerminalGraph, TerminalEOptionalId, TerminalESelect, QTerminalQRelation, ClientGraph, ClientEOptionalId, ClientESelect, QClientQRelation } from '@airport/travel-document-checkpoint';
import { ApplicationGraph, ApplicationEOptionalId, ApplicationESelect, QApplicationQRelation } from '@airport/airspace';
/**
 * SELECT - All fields and relations (optional).
 */
export interface ActorESelect extends IEntitySelectProperties, ActorEOptionalId {
    uuId?: string | IQStringField;
    user?: UserESelect;
    terminal?: TerminalESelect;
    application?: ApplicationESelect;
    client?: ClientESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ActorEId extends IEntityIdProperties {
    id?: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface ActorEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ActorEUpdateProperties extends IEntityUpdateProperties {
    uuId?: string | IQStringField;
    user?: UserEOptionalId;
    terminal?: TerminalEOptionalId;
    application?: ApplicationEOptionalId;
    client?: ClientEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ActorGraph extends ActorEOptionalId, IEntityCascadeGraph {
    uuId?: string | IQStringField;
    user?: UserGraph;
    terminal?: TerminalGraph;
    application?: ApplicationGraph;
    client?: ClientGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ActorEUpdateColumns extends IEntityUpdateColumns {
    UU_ID?: string | IQStringField;
    USER_ID?: number | IQNumberField;
    TERMINAL_ID?: number | IQNumberField;
    APPLICATION_INDEX?: number | IQNumberField;
    CLIENT_ID?: number | IQNumberField;
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
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QActor extends IQEntity {
    id: IQNumberField;
    uuId: IQStringField;
    user: QUserQRelation;
    terminal: QTerminalQRelation;
    application: QApplicationQRelation;
    client: QClientQRelation;
}
export interface QActorQId {
    id: IQNumberField;
}
export interface QActorQRelation extends IQRelation<QActor>, QActorQId {
}
//# sourceMappingURL=qactor.d.ts.map
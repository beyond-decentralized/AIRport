import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQBooleanField, IQNumberField, IQStringField, IQEntity, IQRelation } from '@airport/air-traffic-control';
import { UserGraph, UserEOptionalId, UserESelect, QUserQRelation } from './quser';
/**
 * SELECT - All fields and relations (optional).
 */
export interface TerminalESelect extends IEntitySelectProperties, TerminalEOptionalId {
    uuId?: string | IQStringField;
    isLocal?: boolean | IQBooleanField;
    owner?: UserESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface TerminalEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface TerminalEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface TerminalEUpdateProperties extends IEntityUpdateProperties {
    uuId?: string | IQStringField;
    isLocal?: boolean | IQBooleanField;
    owner?: UserEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface TerminalGraph extends TerminalEOptionalId, IEntityCascadeGraph {
    uuId?: string | IQStringField;
    isLocal?: boolean | IQBooleanField;
    owner?: UserGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface TerminalEUpdateColumns extends IEntityUpdateColumns {
    UUID?: string | IQStringField;
    IS_LOCAL?: boolean | IQBooleanField;
    OWNER_USER_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface TerminalECreateProperties extends Partial<TerminalEId>, TerminalEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface TerminalECreateColumns extends TerminalEId, TerminalEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QTerminal extends IQEntity {
    id: IQNumberField;
    uuId: IQStringField;
    isLocal: IQBooleanField;
    owner: QUserQRelation;
}
export interface QTerminalQId {
    id: IQNumberField;
}
export interface QTerminalQRelation extends IQRelation<QTerminal>, QTerminalQId {
}
//# sourceMappingURL=qterminal.d.ts.map
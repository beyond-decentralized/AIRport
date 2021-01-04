import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQEntity, IQRelation } from '@airport/air-control';
import { UserGraph, UserEId, UserEOptionalId, UserESelect, QUserQId, QUserQRelation } from './quser';
import { TerminalGraph, TerminalEId, TerminalEOptionalId, TerminalESelect, QTerminalQId, QTerminalQRelation } from './qterminal';
import { UserTerminal } from '../ddl/UserTerminal';
/**
 * SELECT - All fields and relations (optional).
 */
export interface UserTerminalESelect extends IEntitySelectProperties, UserTerminalEOptionalId {
    user?: UserESelect;
    terminal?: TerminalESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface UserTerminalEId extends IEntityIdProperties {
    user: UserEId;
    terminal: TerminalEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface UserTerminalEOptionalId {
    user?: UserEOptionalId;
    terminal?: TerminalEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface UserTerminalEUpdateProperties extends IEntityUpdateProperties {
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface UserTerminalGraph extends UserTerminalEOptionalId, IEntityCascadeGraph {
    user?: UserGraph;
    terminal?: TerminalGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface UserTerminalEUpdateColumns extends IEntityUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface UserTerminalECreateProperties extends Partial<UserTerminalEId>, UserTerminalEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface UserTerminalECreateColumns extends UserTerminalEId, UserTerminalEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QUserTerminal extends IQEntity<UserTerminal> {
    user: QUserQRelation;
    terminal: QTerminalQRelation;
}
export interface QUserTerminalQId {
    user: QUserQId;
    terminal: QTerminalQId;
}
export interface QUserTerminalQRelation extends IQRelation<UserTerminal, QUserTerminal>, QUserTerminalQId {
}
//# sourceMappingURL=quserterminal.d.ts.map
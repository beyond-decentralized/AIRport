import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQEntity, IQRelation } from '@airport/tarmaq-query';
import { UserAccountGraph, UserAccountEId, UserAccountEOptionalId, UserAccountESelect, QUserAccountQId, QUserAccountQRelation } from '../quserAccount';
import { TerminalGraph, TerminalEId, TerminalEOptionalId, TerminalESelect, QTerminalQId, QTerminalQRelation } from './qterminal';
/**
 * SELECT - All fields and relations (optional).
 */
export interface UserAccountTerminalESelect extends IEntitySelectProperties, UserAccountTerminalEOptionalId {
    userAccount?: UserAccountESelect;
    terminal?: TerminalESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface UserAccountTerminalEId extends IEntityIdProperties {
    userAccount: UserAccountEId;
    terminal: TerminalEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface UserAccountTerminalEOptionalId {
    userAccount?: UserAccountEOptionalId;
    terminal?: TerminalEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface UserAccountTerminalEUpdateProperties extends IEntityUpdateProperties {
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface UserAccountTerminalGraph extends UserAccountTerminalEOptionalId, IEntityCascadeGraph {
    userAccount?: UserAccountGraph;
    terminal?: TerminalGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface UserAccountTerminalEUpdateColumns extends IEntityUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface UserAccountTerminalECreateProperties extends Partial<UserAccountTerminalEId>, UserAccountTerminalEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface UserAccountTerminalECreateColumns extends UserAccountTerminalEId, UserAccountTerminalEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QUserAccountTerminal extends IQEntity {
    userAccount: QUserAccountQRelation;
    terminal: QTerminalQRelation;
}
export interface QUserAccountTerminalQId {
    userAccount: QUserAccountQId;
    terminal: QTerminalQId;
}
export interface QUserAccountTerminalQRelation extends IQRelation<QUserAccountTerminal>, QUserAccountTerminalQId {
}
//# sourceMappingURL=quserterminal.d.ts.map
import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, QEntity, QRelation } from '@airport/air-control';
import { IUser, UserEOptionalId, UserESelect, QUserQRelation } from './quser';
import { ITerminal, TerminalEOptionalId, TerminalESelect, QTerminalQRelation } from './qterminal';
export interface IUserTerminal {
    user?: IUser;
    terminal?: ITerminal;
}
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
}
/**
 * Ids fields and relations only (optional).
 */
export interface UserTerminalEOptionalId {
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface UserTerminalEUpdateProperties extends IEntityUpdateProperties {
    user?: UserEOptionalId;
    terminal?: TerminalEOptionalId;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface UserTerminalEUpdateColumns extends IEntityUpdateColumns {
    USER_ID?: number | IQNumberField;
    TERMINAL_ID?: number | IQNumberField;
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
export interface QUserTerminal extends QEntity {
    user: QUserQRelation;
    terminal: QTerminalQRelation;
}
export interface QUserTerminalQId {
}
export interface QUserTerminalQRelation extends QRelation<QUserTerminal>, QUserTerminalQId {
}

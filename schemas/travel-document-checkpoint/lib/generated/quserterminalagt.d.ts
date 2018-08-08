import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, QEntity, QRelation } from '@airport/air-control';
import { IUser, UserEOptionalId, UserESelect, QUserQRelation } from './quser';
import { ITerminal, TerminalEOptionalId, TerminalESelect, QTerminalQRelation } from './qterminal';
import { IAgt, AgtEOptionalId, AgtESelect, QAgtQRelation } from './qagt';
import { ITerminalAgt, TerminalAgtEOptionalId, TerminalAgtESelect, QTerminalAgtQRelation } from './qterminalagt';
export interface IUserTerminalAgt {
    id?: number;
    agtId?: number;
    password?: number;
    user?: IUser;
    terminal?: ITerminal;
    agt?: IAgt;
    terminalAgt?: ITerminalAgt;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface UserTerminalAgtESelect extends IEntitySelectProperties, UserTerminalAgtEOptionalId, UserTerminalAgtEUpdateProperties {
    user?: UserESelect;
    terminal?: TerminalESelect;
    agt?: AgtESelect;
    terminalAgt?: TerminalAgtESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface UserTerminalAgtEId extends IEntityIdProperties {
    id: number | IQNumberField;
    agtId: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface UserTerminalAgtEOptionalId {
    id?: number | IQNumberField;
    agtId?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface UserTerminalAgtEUpdateProperties extends IEntityUpdateProperties {
    password?: number | IQNumberField;
    user?: UserEOptionalId;
    terminal?: TerminalEOptionalId;
    agt?: AgtEOptionalId;
    terminalAgt?: TerminalAgtEOptionalId;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface UserTerminalAgtEUpdateColumns extends IEntityUpdateColumns {
    PASSWORD?: number | IQNumberField;
    USER_ID?: number | IQNumberField;
    TERMINAL_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface UserTerminalAgtECreateProperties extends Partial<UserTerminalAgtEId>, UserTerminalAgtEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface UserTerminalAgtECreateColumns extends UserTerminalAgtEId, UserTerminalAgtEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QUserTerminalAgt extends QEntity {
    id: IQNumberField;
    agtId: IQNumberField;
    password: IQNumberField;
    user: QUserQRelation;
    terminal: QTerminalQRelation;
    agt: QAgtQRelation;
    terminalAgt: QTerminalAgtQRelation;
}
export interface QUserTerminalAgtQId {
    id: IQNumberField;
    agtId: IQNumberField;
}
export interface QUserTerminalAgtQRelation extends QRelation<QUserTerminalAgt>, QUserTerminalAgtQId {
}

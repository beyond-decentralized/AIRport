import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQBooleanField, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { IUser, UserEOptionalId, UserESelect, QUserQRelation } from './quser';
import { ITerminalAgt, TerminalAgtESelect, QTerminalAgt } from './qterminalagt';
import { IUserTerminal, UserTerminalESelect, QUserTerminal } from './quserterminal';
import { IUserTerminalAgt, UserTerminalAgtESelect, QUserTerminalAgt } from './quserterminalagt';
export interface ITerminal {
    id?: number;
    name?: string;
    secondId?: number;
    isLocal?: boolean;
    owner?: IUser;
    terminalAgts?: ITerminalAgt[];
    userTerminal?: IUserTerminal[];
    userTerminalAgt?: IUserTerminalAgt[];
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface TerminalESelect extends IEntitySelectProperties, TerminalEOptionalId {
    name?: string | IQStringField;
    secondId?: number | IQNumberField;
    isLocal?: boolean | IQBooleanField;
    owner?: UserESelect;
    terminalAgts?: TerminalAgtESelect;
    userTerminal?: UserTerminalESelect;
    userTerminalAgt?: UserTerminalAgtESelect;
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
    name?: string | IQStringField;
    secondId?: number | IQNumberField;
    isLocal?: boolean | IQBooleanField;
    owner?: UserEOptionalId;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface TerminalEUpdateColumns extends IEntityUpdateColumns {
    NAME?: string | IQStringField;
    SECOND_ID?: number | IQNumberField;
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
    name: IQStringField;
    secondId: IQNumberField;
    isLocal: IQBooleanField;
    owner: QUserQRelation;
    terminalAgts: IQOneToManyRelation<QTerminalAgt>;
    userTerminal: IQOneToManyRelation<QUserTerminal>;
    userTerminalAgt: IQOneToManyRelation<QUserTerminalAgt>;
}
export interface QTerminalQId {
    id: IQNumberField;
}
export interface QTerminalQRelation extends IQRelation<QTerminal>, QTerminalQId {
}

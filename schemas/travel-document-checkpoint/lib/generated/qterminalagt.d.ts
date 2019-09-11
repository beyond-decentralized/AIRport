import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { ITerminal, TerminalEId, TerminalEOptionalId, TerminalESelect, QTerminalQId, QTerminalQRelation } from './qterminal';
import { IAgt, AgtEId, AgtEOptionalId, AgtESelect, QAgtQId, QAgtQRelation } from './qagt';
import { IUserTerminalAgt, UserTerminalAgtESelect, QUserTerminalAgt } from './quserterminalagt';
export interface ITerminalAgt {
    terminal: ITerminal;
    agt: IAgt;
    password?: string;
    userTerminalAgts?: IUserTerminalAgt[];
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface TerminalAgtESelect extends IEntitySelectProperties, TerminalAgtEOptionalId {
    password?: string | IQStringField;
    terminal?: TerminalESelect;
    agt?: AgtESelect;
    userTerminalAgts?: UserTerminalAgtESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface TerminalAgtEId extends IEntityIdProperties {
    terminal: TerminalEId;
    agt: AgtEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface TerminalAgtEOptionalId {
    terminal?: TerminalEOptionalId;
    agt?: AgtEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface TerminalAgtEUpdateProperties extends IEntityUpdateProperties {
    password?: string | IQStringField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface TerminalAgtEUpdateColumns extends IEntityUpdateColumns {
    PASSWORD?: string | IQStringField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface TerminalAgtECreateProperties extends Partial<TerminalAgtEId>, TerminalAgtEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface TerminalAgtECreateColumns extends TerminalAgtEId, TerminalAgtEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QTerminalAgt extends IQEntity {
    terminal: QTerminalQRelation;
    agt: QAgtQRelation;
    password: IQStringField;
    userTerminalAgts: IQOneToManyRelation<QUserTerminalAgt>;
}
export interface QTerminalAgtQId {
    terminal: QTerminalQId;
    agt: QAgtQId;
}
export interface QTerminalAgtQRelation extends IQRelation<QTerminalAgt>, QTerminalAgtQId {
}

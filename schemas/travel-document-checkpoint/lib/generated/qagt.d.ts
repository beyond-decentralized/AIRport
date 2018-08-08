import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, IQStringField, QEntity, QRelation } from '@airport/air-control';
import { ITerminalAgt, TerminalAgtESelect, QTerminalAgt } from './qterminalagt';
import { IUserTerminalAgt, UserTerminalAgtESelect, QUserTerminalAgt } from './quserterminalagt';
export interface IAgt {
    id?: number;
    address?: string;
    terminalAgts?: ITerminalAgt[];
    userTerminalAgts?: IUserTerminalAgt[];
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface AgtESelect extends IEntitySelectProperties, AgtEOptionalId, AgtEUpdateProperties {
    terminalAgts?: TerminalAgtESelect;
    userTerminalAgts?: UserTerminalAgtESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface AgtEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface AgtEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface AgtEUpdateProperties extends IEntityUpdateProperties {
    address?: string | IQStringField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface AgtEUpdateColumns extends IEntityUpdateColumns {
    ADDRESS?: string | IQStringField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface AgtECreateProperties extends Partial<AgtEId>, AgtEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface AgtECreateColumns extends AgtEId, AgtEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QAgt extends QEntity {
    id: IQNumberField;
    address: IQStringField;
    terminalAgts: IQOneToManyRelation<QTerminalAgt>;
    userTerminalAgts: IQOneToManyRelation<QUserTerminalAgt>;
}
export interface QAgtQId {
    id: IQNumberField;
}
export interface QAgtQRelation extends QRelation<QAgt>, QAgtQId {
}

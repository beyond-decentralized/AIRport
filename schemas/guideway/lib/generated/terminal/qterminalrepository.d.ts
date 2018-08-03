import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, QEntity, QRelation } from '@airport/air-control';
import { ITerminal, TerminalEId, TerminalEOptionalId, TerminalESelect, QTerminalQId, QTerminalQRelation } from './qterminal';
import { IRepository, RepositoryEId, RepositoryEOptionalId, RepositoryESelect, QRepositoryQId, QRepositoryQRelation } from '../repository/qrepository';
export interface ITerminalRepository {
    terminal?: ITerminal;
    repository?: IRepository;
    permission?: number;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface TerminalRepositoryESelect extends IEntitySelectProperties, TerminalRepositoryEOptionalId, TerminalRepositoryEUpdateProperties {
    terminal?: TerminalESelect;
    repository?: RepositoryESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface TerminalRepositoryEId extends IEntityIdProperties {
    terminal: TerminalEId;
    repository: RepositoryEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface TerminalRepositoryEOptionalId {
    terminal?: TerminalEOptionalId;
    repository?: RepositoryEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface TerminalRepositoryEUpdateProperties extends IEntityUpdateProperties {
    permission?: number | IQNumberField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface TerminalRepositoryEUpdateColumns extends IEntityUpdateColumns {
    PERMISSION?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface TerminalRepositoryECreateProperties extends Partial<TerminalRepositoryEId>, TerminalRepositoryEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface TerminalRepositoryECreateColumns extends TerminalRepositoryEId, TerminalRepositoryEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QTerminalRepository extends QEntity {
    terminal: QTerminalQRelation;
    repository: QRepositoryQRelation;
    permission: IQNumberField;
}
export interface QTerminalRepositoryQId {
    terminal: QTerminalQId;
    repository: QRepositoryQId;
}
export interface QTerminalRepositoryQRelation extends QRelation<QTerminalRepository>, QTerminalRepositoryQId {
}

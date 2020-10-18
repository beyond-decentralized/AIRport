import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQEntity, IQRelation } from '@airport/air-control';
import { TerminalGraph, TerminalEId, TerminalEOptionalId, TerminalESelect, QTerminalQId, QTerminalQRelation } from './qterminal';
import { RepositoryGraph, RepositoryEId, RepositoryEOptionalId, RepositoryESelect, QRepositoryQId, QRepositoryQRelation } from '../repository/qrepository';
/**
 * SELECT - All fields and relations (optional).
 */
export interface TerminalRepositoryESelect extends IEntitySelectProperties, TerminalRepositoryEOptionalId {
    permission?: number | IQNumberField;
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
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface TerminalRepositoryGraph extends IEntitySelectProperties, TerminalRepositoryEOptionalId, IEntityCascadeGraph {
    permission?: number | IQNumberField;
    terminal?: TerminalGraph;
    repository?: RepositoryGraph;
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
export interface QTerminalRepository extends IQEntity {
    terminal: QTerminalQRelation;
    repository: QRepositoryQRelation;
    permission: IQNumberField;
}
export interface QTerminalRepositoryQId {
    terminal: QTerminalQId;
    repository: QRepositoryQId;
}
export interface QTerminalRepositoryQRelation extends IQRelation<QTerminalRepository>, QTerminalRepositoryQId {
}
//# sourceMappingURL=qterminalrepository.d.ts.map
import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQEntity, IQRelation } from '@airport/air-traffic-control';
import { RepositoryGraph, RepositoryEId, RepositoryEOptionalId, RepositoryESelect, QRepositoryQId, QRepositoryQRelation } from './qrepository';
import { TerminalGraph, TerminalEId, TerminalEOptionalId, TerminalESelect, QTerminalQId, QTerminalQRelation } from '@airport/travel-document-checkpoint';
/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryTerminalESelect extends IEntitySelectProperties, RepositoryTerminalEOptionalId {
    repository?: RepositoryESelect;
    terminal?: TerminalESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepositoryTerminalEId extends IEntityIdProperties {
    repository: RepositoryEId;
    terminal: TerminalEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface RepositoryTerminalEOptionalId {
    repository?: RepositoryEOptionalId;
    terminal?: TerminalEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepositoryTerminalEUpdateProperties extends IEntityUpdateProperties {
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepositoryTerminalGraph extends RepositoryTerminalEOptionalId, IEntityCascadeGraph {
    repository?: RepositoryGraph;
    terminal?: TerminalGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryTerminalEUpdateColumns extends IEntityUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepositoryTerminalECreateProperties extends Partial<RepositoryTerminalEId>, RepositoryTerminalEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepositoryTerminalECreateColumns extends RepositoryTerminalEId, RepositoryTerminalEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRepositoryTerminal extends IQEntity {
    repository: QRepositoryQRelation;
    terminal: QTerminalQRelation;
}
export interface QRepositoryTerminalQId {
    repository: QRepositoryQId;
    terminal: QTerminalQId;
}
export interface QRepositoryTerminalQRelation extends IQRelation<QRepositoryTerminal>, QRepositoryTerminalQId {
}
//# sourceMappingURL=qrepositoryterminal.d.ts.map
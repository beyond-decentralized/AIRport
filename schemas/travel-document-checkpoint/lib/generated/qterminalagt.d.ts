import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/air-traffic-control';
import { TerminalGraph, TerminalEId, TerminalEOptionalId, TerminalESelect, QTerminalQId, QTerminalQRelation } from './qterminal';
import { AgtGraph, AgtEId, AgtEOptionalId, AgtESelect, QAgtQId, QAgtQRelation } from './qagt';
import { UserTerminalAgtGraph, UserTerminalAgtESelect, QUserTerminalAgt } from './quserterminalagt';
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
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface TerminalAgtGraph extends TerminalAgtEOptionalId, IEntityCascadeGraph {
    password?: string | IQStringField;
    terminal?: TerminalGraph;
    agt?: AgtGraph;
    userTerminalAgts?: UserTerminalAgtGraph[];
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
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
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
//# sourceMappingURL=qterminalagt.d.ts.map
import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQEntity, IQRelation } from '@airport/air-traffic-control';
import { TerminalGraph, TerminalEId, TerminalEOptionalId, TerminalESelect, QTerminalQId, QTerminalQRelation } from './qterminal';
import { TypeGraph, TypeEId, TypeEOptionalId, TypeESelect, QTypeQId, QTypeQRelation } from '../type/qtype';
/**
 * SELECT - All fields and relations (optional).
 */
export interface TerminalTypeESelect extends IEntitySelectProperties, TerminalTypeEOptionalId {
    terminal?: TerminalESelect;
    type?: TypeESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface TerminalTypeEId extends IEntityIdProperties {
    terminal: TerminalEId;
    type: TypeEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface TerminalTypeEOptionalId {
    terminal?: TerminalEOptionalId;
    type?: TypeEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface TerminalTypeEUpdateProperties extends IEntityUpdateProperties {
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface TerminalTypeGraph extends TerminalTypeEOptionalId, IEntityCascadeGraph {
    terminal?: TerminalGraph;
    type?: TypeGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface TerminalTypeEUpdateColumns extends IEntityUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface TerminalTypeECreateProperties extends Partial<TerminalTypeEId>, TerminalTypeEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface TerminalTypeECreateColumns extends TerminalTypeEId, TerminalTypeEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QTerminalType extends IQEntity {
    terminal: QTerminalQRelation;
    type: QTypeQRelation;
}
export interface QTerminalTypeQId {
    terminal: QTerminalQId;
    type: QTypeQId;
}
export interface QTerminalTypeQRelation extends IQRelation<QTerminalType>, QTerminalTypeQId {
}
//# sourceMappingURL=qterminaltype.d.ts.map
import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQStringField, IQEntity, IQRelation } from '@airport/air-traffic-control';
/**
 * SELECT - All fields and relations (optional).
 */
export interface TerminalTypeESelect extends IEntitySelectProperties, TerminalTypeEOptionalId {
    name?: string | IQStringField;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface TerminalTypeEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface TerminalTypeEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface TerminalTypeEUpdateProperties extends IEntityUpdateProperties {
    name?: string | IQStringField;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface TerminalTypeGraph extends TerminalTypeEOptionalId, IEntityCascadeGraph {
    name?: string | IQStringField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface TerminalTypeEUpdateColumns extends IEntityUpdateColumns {
    NAME?: string | IQStringField;
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
    id: IQNumberField;
    name: IQStringField;
}
export interface QTerminalTypeQId {
    id: IQNumberField;
}
export interface QTerminalTypeQRelation extends IQRelation<QTerminalType>, QTerminalTypeQId {
}
//# sourceMappingURL=qterminaltype.d.ts.map
import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQEntity, IQRelation } from '@airport/air-control';
/**
 * SELECT - All fields and relations (optional).
 */
export interface LogESelect extends IEntitySelectProperties, LogEOptionalId {
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface LogEId extends IEntityIdProperties {
}
/**
 * Ids fields and relations only (optional).
 */
export interface LogEOptionalId {
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface LogEUpdateProperties extends IEntityUpdateProperties {
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface LogGraph extends IEntitySelectProperties, LogEOptionalId, IEntityCascadeGraph {
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface LogEUpdateColumns extends IEntityUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface LogECreateProperties extends Partial<LogEId>, LogEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface LogECreateColumns extends LogEId, LogEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QLog extends IQEntity {
}
export interface QLogQId {
}
export interface QLogQRelation extends IQRelation<QLog>, QLogQId {
}
//# sourceMappingURL=qlog.d.ts.map
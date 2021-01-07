import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQEntity, IQRelation } from '@airport/air-control';
import { SystemWideOperationId } from '../ddl/SystemWideOperationId';
/**
 * SELECT - All fields and relations (optional).
 */
export interface SystemWideOperationIdESelect extends IEntitySelectProperties, SystemWideOperationIdEOptionalId {
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SystemWideOperationIdEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SystemWideOperationIdEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SystemWideOperationIdEUpdateProperties extends IEntityUpdateProperties {
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SystemWideOperationIdGraph extends SystemWideOperationIdEOptionalId, IEntityCascadeGraph {
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SystemWideOperationIdEUpdateColumns extends IEntityUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SystemWideOperationIdECreateProperties extends Partial<SystemWideOperationIdEId>, SystemWideOperationIdEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SystemWideOperationIdECreateColumns extends SystemWideOperationIdEId, SystemWideOperationIdEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSystemWideOperationId extends IQEntity<SystemWideOperationId> {
    id: IQNumberField;
}
export interface QSystemWideOperationIdQId {
    id: IQNumberField;
}
export interface QSystemWideOperationIdQRelation extends IQRelation<SystemWideOperationId, QSystemWideOperationId>, QSystemWideOperationIdQId {
}
//# sourceMappingURL=qsystemwideoperationid.d.ts.map
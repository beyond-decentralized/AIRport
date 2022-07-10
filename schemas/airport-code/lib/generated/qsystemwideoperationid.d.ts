import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQEntity, IQRelation } from '@airport/tarmaq-query';
/**
 * SELECT - All fields and relations (optional).
 */
export interface SystemWideOperationIdESelect extends IEntitySelectProperties, SystemWideOperationIdEOptionalId {
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SystemWideOperationIdEId extends IEntityIdProperties {
    _localId: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SystemWideOperationIdEOptionalId {
    _localId?: number | IQNumberField;
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
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QSystemWideOperationId extends IQEntity {
    _localId: IQNumberField;
}
export interface QSystemWideOperationIdQId {
    _localId: IQNumberField;
}
export interface QSystemWideOperationIdQRelation extends IQRelation<QSystemWideOperationId>, QSystemWideOperationIdQId {
}
//# sourceMappingURL=qsystemwideoperationid.d.ts.map
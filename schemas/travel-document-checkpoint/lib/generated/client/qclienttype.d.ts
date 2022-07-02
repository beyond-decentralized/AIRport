import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQStringField, IQEntity, IQRelation } from '@airport/air-traffic-control';
/**
 * SELECT - All fields and relations (optional).
 */
export interface ClientTypeESelect extends IEntitySelectProperties, ClientTypeEOptionalId {
    name?: string | IQStringField;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ClientTypeEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface ClientTypeEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ClientTypeEUpdateProperties extends IEntityUpdateProperties {
    name?: string | IQStringField;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ClientTypeGraph extends ClientTypeEOptionalId, IEntityCascadeGraph {
    name?: string | IQStringField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ClientTypeEUpdateColumns extends IEntityUpdateColumns {
    NAME?: string | IQStringField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ClientTypeECreateProperties extends Partial<ClientTypeEId>, ClientTypeEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ClientTypeECreateColumns extends ClientTypeEId, ClientTypeEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QClientType extends IQEntity {
    id: IQNumberField;
    name: IQStringField;
}
export interface QClientTypeQId {
    id: IQNumberField;
}
export interface QClientTypeQRelation extends IQRelation<QClientType>, QClientTypeQId {
}
//# sourceMappingURL=qclienttype.d.ts.map
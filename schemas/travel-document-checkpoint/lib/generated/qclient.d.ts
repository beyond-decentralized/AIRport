import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQStringField, IQEntity, IQRelation } from '@airport/air-traffic-control';
/**
 * SELECT - All fields and relations (optional).
 */
export interface ClientESelect extends IEntitySelectProperties, ClientEOptionalId {
    domain?: string | IQStringField;
    GUID?: string | IQStringField;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ClientEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface ClientEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ClientEUpdateProperties extends IEntityUpdateProperties {
    domain?: string | IQStringField;
    GUID?: string | IQStringField;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ClientGraph extends ClientEOptionalId, IEntityCascadeGraph {
    domain?: string | IQStringField;
    GUID?: string | IQStringField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ClientEUpdateColumns extends IEntityUpdateColumns {
    DOMAIN?: string | IQStringField;
    GUID?: string | IQStringField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ClientECreateProperties extends Partial<ClientEId>, ClientEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ClientECreateColumns extends ClientEId, ClientEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QClient extends IQEntity {
    id: IQNumberField;
    domain: IQStringField;
    GUID: IQStringField;
}
export interface QClientQId {
    id: IQNumberField;
}
export interface QClientQRelation extends IQRelation<QClient>, QClientQId {
}
//# sourceMappingURL=qclient.d.ts.map
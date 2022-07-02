import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQEntity, IQRelation } from '@airport/air-traffic-control';
import { ClientGraph, ClientEId, ClientEOptionalId, ClientESelect, QClientQId, QClientQRelation } from './qclient';
import { TypeGraph, TypeEId, TypeEOptionalId, TypeESelect, QTypeQId, QTypeQRelation } from '../type/qtype';
/**
 * SELECT - All fields and relations (optional).
 */
export interface ClientTypeESelect extends IEntitySelectProperties, ClientTypeEOptionalId {
    client?: ClientESelect;
    type?: TypeESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ClientTypeEId extends IEntityIdProperties {
    client: ClientEId;
    type: TypeEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface ClientTypeEOptionalId {
    client?: ClientEOptionalId;
    type?: TypeEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ClientTypeEUpdateProperties extends IEntityUpdateProperties {
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ClientTypeGraph extends ClientTypeEOptionalId, IEntityCascadeGraph {
    client?: ClientGraph;
    type?: TypeGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ClientTypeEUpdateColumns extends IEntityUpdateColumns {
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
    client: QClientQRelation;
    type: QTypeQRelation;
}
export interface QClientTypeQId {
    client: QClientQId;
    type: QTypeQId;
}
export interface QClientTypeQRelation extends IQRelation<QClientType>, QClientTypeQId {
}
//# sourceMappingURL=qclienttype.d.ts.map
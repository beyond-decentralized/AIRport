import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQStringField, QEntity, QRelation } from '@airport/air-control';
export interface IShard {
    id?: number;
    description?: string;
    secret?: string;
    address?: string;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface ShardESelect extends IEntitySelectProperties, ShardEOptionalId, ShardEUpdateProperties {
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ShardEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface ShardEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ShardEUpdateProperties extends IEntityUpdateProperties {
    description?: string | IQStringField;
    secret?: string | IQStringField;
    address?: string | IQStringField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ShardEUpdateColumns extends IEntityUpdateColumns {
    DESCRIPTION?: string | IQStringField;
    SECRET?: string | IQStringField;
    ADDRESS?: string | IQStringField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ShardECreateProperties extends ShardEId, ShardEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ShardECreateColumns extends ShardEId, ShardEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QShard extends QEntity {
    id: IQNumberField;
    description: IQStringField;
    secret: IQStringField;
    address: IQStringField;
}
export interface QShardQId {
    id: IQNumberField;
}
export interface QShardQRelation extends QRelation<QShard>, QShardQId {
}

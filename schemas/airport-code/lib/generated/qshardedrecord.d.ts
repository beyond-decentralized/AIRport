import { IQEntityInternal, IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, QEntity, QRelation } from '@airport/air-control';
import { IShard, ShardEId, ShardEOptionalId, ShardESelect, QShardQId, QShardQRelation } from './qshard';
export interface IShardedRecord {
    shard?: IShard;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface ShardedRecordESelect extends IEntitySelectProperties, ShardedRecordEOptionalId, ShardedRecordEUpdateProperties {
    shard?: ShardESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ShardedRecordEId extends IEntityIdProperties {
    shard: ShardEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface ShardedRecordEOptionalId {
    shard?: ShardEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ShardedRecordEUpdateProperties extends IEntityUpdateProperties {
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ShardedRecordEUpdateColumns extends IEntityUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ShardedRecordECreateProperties extends ShardedRecordEId, ShardedRecordEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ShardedRecordECreateColumns extends ShardedRecordEId, ShardedRecordEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QShardedRecord extends QEntity {
    shard: QShardQRelation;
}
export interface QShardedRecordQId {
    shard: QShardQId;
}
export interface QShardedRecordQRelation<SubType extends IQEntityInternal> extends QRelation<SubType>, QShardedRecordQId {
}

import { IDmo } from "@airport/air-control";
import { Dmo } from "@airport/check-in";
import { IShard, ShardESelect, ShardECreateProperties, ShardEUpdateProperties, ShardEId, QShard } from './qshard';
import { IShardedRecord, ShardedRecordESelect, ShardedRecordECreateProperties, ShardedRecordEUpdateProperties, ShardedRecordEId, QShardedRecord } from './qshardedrecord';
export interface IBaseShardDmo extends IDmo<IShard, ShardESelect, ShardECreateProperties, ShardEUpdateProperties, ShardEId, QShard> {
}
export declare class BaseShardDmo extends Dmo<IShard, ShardESelect, ShardECreateProperties, ShardEUpdateProperties, ShardEId, QShard> implements IBaseShardDmo {
    constructor();
}
export interface IBaseShardedRecordDmo extends IDmo<IShardedRecord, ShardedRecordESelect, ShardedRecordECreateProperties, ShardedRecordEUpdateProperties, ShardedRecordEId, QShardedRecord> {
}
export declare class BaseShardedRecordDmo extends Dmo<IShardedRecord, ShardedRecordESelect, ShardedRecordECreateProperties, ShardedRecordEUpdateProperties, ShardedRecordEId, QShardedRecord> implements IBaseShardedRecordDmo {
    constructor();
}

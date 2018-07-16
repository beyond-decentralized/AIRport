import { IDao, IUtils } from '@airport/air-control';
import { Dao } from '@airport/check-in';
import { IShard, ShardESelect, ShardECreateProperties, ShardEUpdateColumns, ShardEUpdateProperties, ShardEId, QShard } from './qshard';
import { IShardedRecord, ShardedRecordESelect, ShardedRecordECreateProperties, ShardedRecordEUpdateColumns, ShardedRecordEUpdateProperties, ShardedRecordEId, QShardedRecord } from './qshardedrecord';
export interface IBaseShardDao extends IDao<IShard, ShardESelect, ShardECreateProperties, ShardEUpdateColumns, ShardEUpdateProperties, ShardEId, QShard> {
}
export declare class BaseShardDao extends Dao<IShard, ShardESelect, ShardECreateProperties, ShardEUpdateColumns, ShardEUpdateProperties, ShardEId, QShard> implements IBaseShardDao {
    constructor(utils: IUtils);
}
export interface IBaseShardedRecordDao extends IDao<IShardedRecord, ShardedRecordESelect, ShardedRecordECreateProperties, ShardedRecordEUpdateColumns, ShardedRecordEUpdateProperties, ShardedRecordEId, QShardedRecord> {
}
export declare class BaseShardedRecordDao extends Dao<IShardedRecord, ShardedRecordESelect, ShardedRecordECreateProperties, ShardedRecordEUpdateColumns, ShardedRecordEUpdateProperties, ShardedRecordEId, QShardedRecord> implements IBaseShardedRecordDao {
    constructor(utils: IUtils);
}

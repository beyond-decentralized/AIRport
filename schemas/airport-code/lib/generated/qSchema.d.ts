import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema } from '@airport/ground-control';
import { QShard } from './qshard';
import { QShardedRecord } from './qshardedrecord';
import { IBaseShardDmo, IBaseShardedRecordDmo } from './baseDmos';
import { IBaseShardDao, IBaseShardedRecordDao } from './baseDaos';
export interface LocalQSchema extends AirportQSchema {
    db: DbSchema;
    dmo: {
        Shard: IBaseShardDmo;
        ShardedRecord: IBaseShardedRecordDmo;
    };
    dao: {
        Shard: IBaseShardDao;
        ShardedRecord: IBaseShardedRecordDao;
    };
    Shard: QShard;
    ShardedRecord: QShardedRecord;
}
export declare const Q_SCHEMA: LocalQSchema;
export declare const Q: LocalQSchema;

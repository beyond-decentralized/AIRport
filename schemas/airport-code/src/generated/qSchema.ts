import { DbSchema, QSchema as AirportQSchema } from '@airport/air-control';
import { Shard } from '../ddl/Shard';
import { QShard } from './qshard';
import { ShardedRecord } from '../ddl/ShardedRecord';
import { QShardedRecord } from './qshardedrecord';

import {
	IBaseShardDmo,
	IBaseShardedRecordDmo
} from './baseDmos';

import {
	IBaseShardDao,
	IBaseShardedRecordDao
} from './baseDaos';

export interface LocalQSchema extends AirportQSchema {

  db: DbSchema;

	dmo: {
		Shard: IBaseShardDmo;
		ShardedRecord: IBaseShardedRecordDmo;
	}

	dao: {
		Shard: IBaseShardDao;
		ShardedRecord: IBaseShardedRecordDao;
	}
	
	Shard: QShard;
	ShardedRecord: QShardedRecord;

}

const __constructors__ = {
	Shard: Shard,
	ShardedRecord: ShardedRecord
};

export const Q_SCHEMA: LocalQSchema = <any>{
	__constructors__
};
export const Q: LocalQSchema = Q_SCHEMA;

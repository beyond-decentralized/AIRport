import {
	IDao, 
	IUtils 
} from '@airport/air-control';
import { Dao } from '@airport/check-in';
import { Q } from './qSchema';
import {
	IShard,
	ShardESelect,
	ShardECreateColumns,
	ShardECreateProperties,
	ShardEUpdateColumns,
	ShardEUpdateProperties,
	ShardEId,
	QShard
} from './qshard';
import {
	IShardedRecord,
	ShardedRecordESelect,
	ShardedRecordECreateColumns,
	ShardedRecordECreateProperties,
	ShardedRecordEUpdateColumns,
	ShardedRecordEUpdateProperties,
	ShardedRecordEId,
	QShardedRecord
} from './qshardedrecord';


export interface IBaseShardDao
  extends IDao<IShard, ShardESelect, ShardECreateProperties, ShardEUpdateColumns, ShardEUpdateProperties, ShardEId, QShard> {
}

export class BaseShardDao
  extends Dao<IShard, ShardESelect, ShardECreateProperties, ShardEUpdateColumns, ShardEUpdateProperties, ShardEId, QShard>
	implements IBaseShardDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['Shard'], Q, utils);
	}
}


export interface IBaseShardedRecordDao
  extends IDao<IShardedRecord, ShardedRecordESelect, ShardedRecordECreateProperties, ShardedRecordEUpdateColumns, ShardedRecordEUpdateProperties, ShardedRecordEId, QShardedRecord> {
}

export class BaseShardedRecordDao
  extends Dao<IShardedRecord, ShardedRecordESelect, ShardedRecordECreateProperties, ShardedRecordEUpdateColumns, ShardedRecordEUpdateProperties, ShardedRecordEId, QShardedRecord>
	implements IBaseShardedRecordDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['ShardedRecord'], Q, utils);
	}
}

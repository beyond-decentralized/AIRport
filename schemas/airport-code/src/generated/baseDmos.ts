import { IDmo } from "@airport/air-control";
import { Dmo } from "@airport/check-in";
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


export interface IBaseShardDmo
  extends IDmo<IShard, ShardESelect, ShardECreateProperties, ShardEUpdateProperties, ShardEId, QShard> {
}

export class BaseShardDmo
  extends Dmo<IShard, ShardESelect, ShardECreateProperties, ShardEUpdateProperties, ShardEId, QShard>
	implements IBaseShardDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['Shard']);
	}
}


export interface IBaseShardedRecordDmo
  extends IDmo<IShardedRecord, ShardedRecordESelect, ShardedRecordECreateProperties, ShardedRecordEUpdateProperties, ShardedRecordEId, QShardedRecord> {
}

export class BaseShardedRecordDmo
  extends Dmo<IShardedRecord, ShardedRecordESelect, ShardedRecordECreateProperties, ShardedRecordEUpdateProperties, ShardedRecordEId, QShardedRecord>
	implements IBaseShardedRecordDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['ShardedRecord']);
	}
}

import {
	IDao, 
	IUtils 
} from '@airport/air-control';
import { Dao } from '@airport/check-in';
import { Q } from './qSchema';
import {
	IDailyArchive,
	DailyArchiveESelect,
	DailyArchiveECreateColumns,
	DailyArchiveECreateProperties,
	DailyArchiveEUpdateColumns,
	DailyArchiveEUpdateProperties,
	DailyArchiveEId,
	QDailyArchive
} from './qdailyarchive';


export interface IBaseDailyArchiveDao
  extends IDao<IDailyArchive, DailyArchiveESelect, DailyArchiveECreateProperties, DailyArchiveEUpdateColumns, DailyArchiveEUpdateProperties, DailyArchiveEId, QDailyArchive> {
}

export class BaseDailyArchiveDao
  extends Dao<IDailyArchive, DailyArchiveESelect, DailyArchiveECreateProperties, DailyArchiveEUpdateColumns, DailyArchiveEUpdateProperties, DailyArchiveEId, QDailyArchive>
	implements IBaseDailyArchiveDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['DailyArchive'], Q, utils);
	}
}

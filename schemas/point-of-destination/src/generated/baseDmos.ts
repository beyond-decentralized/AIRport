import { IDmo } from "@airport/air-control";
import { Dmo } from "@airport/check-in";
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


export interface IBaseDailyArchiveDmo
  extends IDmo<IDailyArchive, DailyArchiveESelect, DailyArchiveECreateProperties, DailyArchiveEUpdateProperties, DailyArchiveEId, QDailyArchive> {
}

export class BaseDailyArchiveDmo
  extends Dmo<IDailyArchive, DailyArchiveESelect, DailyArchiveECreateProperties, DailyArchiveEUpdateProperties, DailyArchiveEId, QDailyArchive>
	implements IBaseDailyArchiveDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['DailyArchive']);
	}
}

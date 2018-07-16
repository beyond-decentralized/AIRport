import {
	IDao, 
	IUtils 
} from '@airport/air-control';
import { Dao } from '@airport/check-in';
import { Q } from './qSchema';
import {
	IDailySyncLog,
	DailySyncLogESelect,
	DailySyncLogECreateColumns,
	DailySyncLogECreateProperties,
	DailySyncLogEUpdateColumns,
	DailySyncLogEUpdateProperties,
	DailySyncLogEId,
	QDailySyncLog
} from './qdailysynclog';
import {
	ILog,
	LogESelect,
	LogECreateColumns,
	LogECreateProperties,
	LogEUpdateColumns,
	LogEUpdateProperties,
	LogEId,
	QLog
} from './log/qlog';
import {
	IMonthlySyncLog,
	MonthlySyncLogESelect,
	MonthlySyncLogECreateColumns,
	MonthlySyncLogECreateProperties,
	MonthlySyncLogEUpdateColumns,
	MonthlySyncLogEUpdateProperties,
	MonthlySyncLogEId,
	QMonthlySyncLog
} from './qmonthlysynclog';


export interface IBaseDailySyncLogDao
  extends IDao<IDailySyncLog, DailySyncLogESelect, DailySyncLogECreateProperties, DailySyncLogEUpdateColumns, DailySyncLogEUpdateProperties, DailySyncLogEId, QDailySyncLog> {
}

export class BaseDailySyncLogDao
  extends Dao<IDailySyncLog, DailySyncLogESelect, DailySyncLogECreateProperties, DailySyncLogEUpdateColumns, DailySyncLogEUpdateProperties, DailySyncLogEId, QDailySyncLog>
	implements IBaseDailySyncLogDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['DailySyncLog'], Q, utils);
	}
}


export interface IBaseLogDao
  extends IDao<ILog, LogESelect, LogECreateProperties, LogEUpdateColumns, LogEUpdateProperties, LogEId, QLog> {
}

export class BaseLogDao
  extends Dao<ILog, LogESelect, LogECreateProperties, LogEUpdateColumns, LogEUpdateProperties, LogEId, QLog>
	implements IBaseLogDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['Log'], Q, utils);
	}
}


export interface IBaseMonthlySyncLogDao
  extends IDao<IMonthlySyncLog, MonthlySyncLogESelect, MonthlySyncLogECreateProperties, MonthlySyncLogEUpdateColumns, MonthlySyncLogEUpdateProperties, MonthlySyncLogEId, QMonthlySyncLog> {
}

export class BaseMonthlySyncLogDao
  extends Dao<IMonthlySyncLog, MonthlySyncLogESelect, MonthlySyncLogECreateProperties, MonthlySyncLogEUpdateColumns, MonthlySyncLogEUpdateProperties, MonthlySyncLogEId, QMonthlySyncLog>
	implements IBaseMonthlySyncLogDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['MonthlySyncLog'], Q, utils);
	}
}

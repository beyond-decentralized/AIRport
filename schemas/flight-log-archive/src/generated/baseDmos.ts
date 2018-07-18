import { IDmo } from "@airport/air-control";
import { Dmo } from "@airport/check-in";
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


export interface IBaseDailySyncLogDmo
  extends IDmo<IDailySyncLog, DailySyncLogESelect, DailySyncLogECreateProperties, DailySyncLogEUpdateProperties, DailySyncLogEId, QDailySyncLog> {
}

export class BaseDailySyncLogDmo
  extends Dmo<IDailySyncLog, DailySyncLogESelect, DailySyncLogECreateProperties, DailySyncLogEUpdateProperties, DailySyncLogEId, QDailySyncLog>
	implements IBaseDailySyncLogDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['DailySyncLog']);
	}
}


export interface IBaseLogDmo
  extends IDmo<ILog, LogESelect, LogECreateProperties, LogEUpdateProperties, LogEId, QLog> {
}

export class BaseLogDmo
  extends Dmo<ILog, LogESelect, LogECreateProperties, LogEUpdateProperties, LogEId, QLog>
	implements IBaseLogDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['Log']);
	}
}


export interface IBaseMonthlySyncLogDmo
  extends IDmo<IMonthlySyncLog, MonthlySyncLogESelect, MonthlySyncLogECreateProperties, MonthlySyncLogEUpdateProperties, MonthlySyncLogEId, QMonthlySyncLog> {
}

export class BaseMonthlySyncLogDmo
  extends Dmo<IMonthlySyncLog, MonthlySyncLogESelect, MonthlySyncLogECreateProperties, MonthlySyncLogEUpdateProperties, MonthlySyncLogEId, QMonthlySyncLog>
	implements IBaseMonthlySyncLogDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['MonthlySyncLog']);
	}
}

import {
	IDmo,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateProperties,
	IQEntity
} from '@airport/air-control';
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


// Schema Q object Dependency Injection readiness detection DAO
export class SQDIDmo<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	IQE extends IQEntity>
	extends Dmo<Entity,
		EntitySelect,
		EntityCreate,
		EntityUpdateProperties,
		EntityId,
		IQE> {

	static diSet(): boolean {
		return Q.db as any
	}

	constructor(
		dbEntityName: string
	) {
		super(dbEntityName, Q)
	}
}


export interface IBaseDailySyncLogDmo
  extends IDmo<IDailySyncLog, DailySyncLogESelect, DailySyncLogECreateProperties, DailySyncLogEUpdateProperties, DailySyncLogEId, QDailySyncLog> {
}

export class BaseDailySyncLogDmo
  extends SQDIDmo<IDailySyncLog, DailySyncLogESelect, DailySyncLogECreateProperties, DailySyncLogEUpdateProperties, DailySyncLogEId, QDailySyncLog>
	implements IBaseDailySyncLogDmo {
	constructor() {
		super('DailySyncLog');
	}
}


export interface IBaseLogDmo
  extends IDmo<ILog, LogESelect, LogECreateProperties, LogEUpdateProperties, LogEId, QLog> {
}

export class BaseLogDmo
  extends SQDIDmo<ILog, LogESelect, LogECreateProperties, LogEUpdateProperties, LogEId, QLog>
	implements IBaseLogDmo {
	constructor() {
		super('Log');
	}
}


export interface IBaseMonthlySyncLogDmo
  extends IDmo<IMonthlySyncLog, MonthlySyncLogESelect, MonthlySyncLogECreateProperties, MonthlySyncLogEUpdateProperties, MonthlySyncLogEId, QMonthlySyncLog> {
}

export class BaseMonthlySyncLogDmo
  extends SQDIDmo<IMonthlySyncLog, MonthlySyncLogESelect, MonthlySyncLogECreateProperties, MonthlySyncLogEUpdateProperties, MonthlySyncLogEId, QMonthlySyncLog>
	implements IBaseMonthlySyncLogDmo {
	constructor() {
		super('MonthlySyncLog');
	}
}

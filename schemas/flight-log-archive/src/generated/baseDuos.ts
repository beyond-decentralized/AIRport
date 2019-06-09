import {
	IDuo,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateProperties,
	IQEntity
} from '@airport/air-control'
import { Duo } from "@airport/check-in"
import {
	EntityId as DbEntityId
} from '@airport/ground-control'
import {
	Q,
	diSet
} from './qSchema'
import {
	IDailySyncLog,
	DailySyncLogESelect,
	DailySyncLogECreateColumns,
	DailySyncLogECreateProperties,
	DailySyncLogEUpdateColumns,
	DailySyncLogEUpdateProperties,
	DailySyncLogEId,
	QDailySyncLog
} from './qdailysynclog'
import {
	ILog,
	LogESelect,
	LogECreateColumns,
	LogECreateProperties,
	LogEUpdateColumns,
	LogEUpdateProperties,
	LogEId,
	QLog
} from './log/qlog'
import {
	IMonthlySyncLog,
	MonthlySyncLogESelect,
	MonthlySyncLogECreateColumns,
	MonthlySyncLogECreateProperties,
	MonthlySyncLogEUpdateColumns,
	MonthlySyncLogEUpdateProperties,
	MonthlySyncLogEId,
	QMonthlySyncLog
} from './qmonthlysynclog'


// Schema Q object Dependency Injection readiness detection DAO
export class SQDIDuo<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	IQE extends IQEntity>
	extends Duo<Entity,
		EntitySelect,
		EntityCreate,
		EntityUpdateProperties,
		EntityId,
		IQE> {

	constructor(
		dbEntityId: DbEntityId
	) {
		super(dbEntityId, Q)
	}
}


export interface IBaseDailySyncLogDuo
  extends IDuo<IDailySyncLog, DailySyncLogESelect, DailySyncLogECreateProperties, DailySyncLogEUpdateProperties, DailySyncLogEId, QDailySyncLog> {
}

export class BaseDailySyncLogDuo
  extends SQDIDuo<IDailySyncLog, DailySyncLogESelect, DailySyncLogECreateProperties, DailySyncLogEUpdateProperties, DailySyncLogEId, QDailySyncLog>
	implements IBaseDailySyncLogDuo {

	static diSet(): boolean {
		return diSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseLogDuo
  extends IDuo<ILog, LogESelect, LogECreateProperties, LogEUpdateProperties, LogEId, QLog> {
}

export class BaseLogDuo
  extends SQDIDuo<ILog, LogESelect, LogECreateProperties, LogEUpdateProperties, LogEId, QLog>
	implements IBaseLogDuo {

	static diSet(): boolean {
		return diSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBaseMonthlySyncLogDuo
  extends IDuo<IMonthlySyncLog, MonthlySyncLogESelect, MonthlySyncLogECreateProperties, MonthlySyncLogEUpdateProperties, MonthlySyncLogEId, QMonthlySyncLog> {
}

export class BaseMonthlySyncLogDuo
  extends SQDIDuo<IMonthlySyncLog, MonthlySyncLogESelect, MonthlySyncLogECreateProperties, MonthlySyncLogEUpdateProperties, MonthlySyncLogEId, QMonthlySyncLog>
	implements IBaseMonthlySyncLogDuo {

	static diSet(): boolean {
		return diSet(1)
	}
	
	constructor() {
		super(1)
	}
}

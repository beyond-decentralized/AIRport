import {
	IDuo,
	IEntityCascadeGraph,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity
} from '@airport/air-control'
import { Duo } from '@airport/check-in'
import {
	EntityId as DbEntityId
} from '@airport/ground-control'
import {
	Q,
	duoDiSet
} from './qSchema'
import {
	IDailySyncLog
} from './dailysynclog'
import {
	DailySyncLogESelect,
	DailySyncLogECreateColumns,
	DailySyncLogECreateProperties,
	DailySyncLogEUpdateColumns,
	DailySyncLogEUpdateProperties,
	DailySyncLogEId,
	DailySyncLogECascadeGraph,
	QDailySyncLog
} from './qdailysynclog'
import {
	ILog
} from './log/log'
import {
	LogESelect,
	LogECreateColumns,
	LogECreateProperties,
	LogEUpdateColumns,
	LogEUpdateProperties,
	LogEId,
	LogECascadeGraph,
	QLog
} from './log/qlog'
import {
	IMonthlySyncLog
} from './monthlysynclog'
import {
	MonthlySyncLogESelect,
	MonthlySyncLogECreateColumns,
	MonthlySyncLogECreateProperties,
	MonthlySyncLogEUpdateColumns,
	MonthlySyncLogEUpdateProperties,
	MonthlySyncLogEId,
	MonthlySyncLogECascadeGraph,
	QMonthlySyncLog
} from './qmonthlysynclog'


// Schema Q object Dependency Injection readiness detection Duo
export class SQDIDuo<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
  EntityUpdateColumns extends IEntityUpdateColumns,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	EntityCascadeGraph extends IEntityCascadeGraph,
	IQE extends IQEntity>
	extends Duo<Entity,
		EntitySelect,
		EntityCreate,
		EntityUpdateColumns,
		EntityUpdateProperties,
		EntityId,
		EntityCascadeGraph,
		IQE> {

	constructor(
		dbEntityId: DbEntityId
	) {
		super(dbEntityId, Q)
	}
}


export interface IBaseDailySyncLogDuo
  extends IDuo<IDailySyncLog, DailySyncLogESelect, DailySyncLogECreateProperties, DailySyncLogEUpdateColumns, DailySyncLogEUpdateProperties, DailySyncLogEId, DailySyncLogECascadeGraph, QDailySyncLog> {
}

export class BaseDailySyncLogDuo
  extends SQDIDuo<IDailySyncLog, DailySyncLogESelect, DailySyncLogECreateProperties, DailySyncLogEUpdateColumns, DailySyncLogEUpdateProperties, DailySyncLogEId, DailySyncLogECascadeGraph, QDailySyncLog>
	implements IBaseDailySyncLogDuo {

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseLogDuo
  extends IDuo<ILog, LogESelect, LogECreateProperties, LogEUpdateColumns, LogEUpdateProperties, LogEId, LogECascadeGraph, QLog> {
}

export class BaseLogDuo
  extends SQDIDuo<ILog, LogESelect, LogECreateProperties, LogEUpdateColumns, LogEUpdateProperties, LogEId, LogECascadeGraph, QLog>
	implements IBaseLogDuo {

	static diSet(): boolean {
		return duoDiSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBaseMonthlySyncLogDuo
  extends IDuo<IMonthlySyncLog, MonthlySyncLogESelect, MonthlySyncLogECreateProperties, MonthlySyncLogEUpdateColumns, MonthlySyncLogEUpdateProperties, MonthlySyncLogEId, MonthlySyncLogECascadeGraph, QMonthlySyncLog> {
}

export class BaseMonthlySyncLogDuo
  extends SQDIDuo<IMonthlySyncLog, MonthlySyncLogESelect, MonthlySyncLogECreateProperties, MonthlySyncLogEUpdateColumns, MonthlySyncLogEUpdateProperties, MonthlySyncLogEId, MonthlySyncLogECascadeGraph, QMonthlySyncLog>
	implements IBaseMonthlySyncLogDuo {

	static diSet(): boolean {
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}

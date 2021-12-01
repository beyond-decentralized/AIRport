/* eslint-disable */
import {
	IDailySyncLog,
} from './dailysynclog';
import {
	DailySyncLogESelect,
	DailySyncLogECreateColumns,
	DailySyncLogECreateProperties,
	DailySyncLogEUpdateColumns,
	DailySyncLogEUpdateProperties,
	DailySyncLogEId,
	DailySyncLogGraph,
	QDailySyncLog,
} from './qdailysynclog';
import {
	ILog,
} from './log/log';
import {
	LogESelect,
	LogECreateColumns,
	LogECreateProperties,
	LogEUpdateColumns,
	LogEUpdateProperties,
	LogEId,
	LogGraph,
	QLog,
} from './log/qlog';
import {
	IMonthlySyncLog,
} from './monthlysynclog';
import {
	MonthlySyncLogESelect,
	MonthlySyncLogECreateColumns,
	MonthlySyncLogECreateProperties,
	MonthlySyncLogEUpdateColumns,
	MonthlySyncLogEUpdateProperties,
	MonthlySyncLogEId,
	MonthlySyncLogGraph,
	QMonthlySyncLog,
} from './qmonthlysynclog';
import {
	IDao,
	IEntityCascadeGraph,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity,
} from '@airport/air-control';
import {
	Dao,
	DaoQueryDecorators,
} from '@airport/check-in';
import {
	EntityId as DbEntityId,
} from '@airport/ground-control';
import {
	Q,
	duoDiSet,
} from './qApplication';


// Application Q object Dependency Injection readiness detection Dao
export class SQDIDao<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
  EntityUpdateColumns extends IEntityUpdateColumns,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	EntityCascadeGraph extends IEntityCascadeGraph,
	IQE extends IQEntity<Entity>>
	extends Dao<Entity,
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


export interface IBaseDailySyncLogDao
  extends IDao<IDailySyncLog, DailySyncLogESelect, DailySyncLogECreateProperties, DailySyncLogEUpdateColumns, DailySyncLogEUpdateProperties, DailySyncLogEId, DailySyncLogGraph, QDailySyncLog> {
}

export class BaseDailySyncLogDao
  extends SQDIDao<IDailySyncLog, DailySyncLogESelect, DailySyncLogECreateProperties, DailySyncLogEUpdateColumns, DailySyncLogEUpdateProperties, DailySyncLogEId, DailySyncLogGraph, QDailySyncLog>
	implements IBaseDailySyncLogDao {
	
	static Find      = new DaoQueryDecorators<DailySyncLogESelect>();
	static FindOne   = new DaoQueryDecorators<DailySyncLogESelect>();
	static Search    = new DaoQueryDecorators<DailySyncLogESelect>();
	static SearchOne = new DaoQueryDecorators<DailySyncLogESelect>();
	static Save(
		config: DailySyncLogGraph
	): PropertyDecorator {
		return Dao.BaseSave<DailySyncLogGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseLogDao
  extends IDao<ILog, LogESelect, LogECreateProperties, LogEUpdateColumns, LogEUpdateProperties, LogEId, LogGraph, QLog> {
}

export class BaseLogDao
  extends SQDIDao<ILog, LogESelect, LogECreateProperties, LogEUpdateColumns, LogEUpdateProperties, LogEId, LogGraph, QLog>
	implements IBaseLogDao {
	
	static Find      = new DaoQueryDecorators<LogESelect>();
	static FindOne   = new DaoQueryDecorators<LogESelect>();
	static Search    = new DaoQueryDecorators<LogESelect>();
	static SearchOne = new DaoQueryDecorators<LogESelect>();
	static Save(
		config: LogGraph
	): PropertyDecorator {
		return Dao.BaseSave<LogGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseMonthlySyncLogDao
  extends IDao<IMonthlySyncLog, MonthlySyncLogESelect, MonthlySyncLogECreateProperties, MonthlySyncLogEUpdateColumns, MonthlySyncLogEUpdateProperties, MonthlySyncLogEId, MonthlySyncLogGraph, QMonthlySyncLog> {
}

export class BaseMonthlySyncLogDao
  extends SQDIDao<IMonthlySyncLog, MonthlySyncLogESelect, MonthlySyncLogECreateProperties, MonthlySyncLogEUpdateColumns, MonthlySyncLogEUpdateProperties, MonthlySyncLogEId, MonthlySyncLogGraph, QMonthlySyncLog>
	implements IBaseMonthlySyncLogDao {
	
	static Find      = new DaoQueryDecorators<MonthlySyncLogESelect>();
	static FindOne   = new DaoQueryDecorators<MonthlySyncLogESelect>();
	static Search    = new DaoQueryDecorators<MonthlySyncLogESelect>();
	static SearchOne = new DaoQueryDecorators<MonthlySyncLogESelect>();
	static Save(
		config: MonthlySyncLogGraph
	): PropertyDecorator {
		return Dao.BaseSave<MonthlySyncLogGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(2)
	}
	
	constructor() {
		super(2)
	}
}

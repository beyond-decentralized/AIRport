/* eslint-disable */
import {
	ILogEntry,
} from './logentry';
import {
	LogEntryESelect,
	LogEntryECreateColumns,
	LogEntryECreateProperties,
	LogEntryEUpdateColumns,
	LogEntryEUpdateProperties,
	LogEntryEId,
	LogEntryGraph,
	QLogEntry,
} from './qlogentry';
import {
	ILogEntryType,
} from './logentrytype';
import {
	LogEntryTypeESelect,
	LogEntryTypeECreateColumns,
	LogEntryTypeECreateProperties,
	LogEntryTypeEUpdateColumns,
	LogEntryTypeEUpdateProperties,
	LogEntryTypeEId,
	LogEntryTypeGraph,
	QLogEntryType,
} from './qlogentrytype';
import {
	ILogEntryValue,
} from './logentryvalue';
import {
	LogEntryValueESelect,
	LogEntryValueECreateColumns,
	LogEntryValueECreateProperties,
	LogEntryValueEUpdateColumns,
	LogEntryValueEUpdateProperties,
	LogEntryValueEId,
	LogEntryValueGraph,
	QLogEntryValue,
} from './qlogentryvalue';
import {
	ILoggedError,
} from './loggederror';
import {
	LoggedErrorESelect,
	LoggedErrorECreateColumns,
	LoggedErrorECreateProperties,
	LoggedErrorEUpdateColumns,
	LoggedErrorEUpdateProperties,
	LoggedErrorEId,
	LoggedErrorGraph,
	QLoggedError,
} from './qloggederror';
import {
	ILoggedErrorStackTrace,
} from './loggederrorstacktrace';
import {
	LoggedErrorStackTraceESelect,
	LoggedErrorStackTraceECreateColumns,
	LoggedErrorStackTraceECreateProperties,
	LoggedErrorStackTraceEUpdateColumns,
	LoggedErrorStackTraceEUpdateProperties,
	LoggedErrorStackTraceEId,
	LoggedErrorStackTraceGraph,
	QLoggedErrorStackTrace,
} from './qloggederrorstacktrace';
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
} from './qSchema';


// Schema Q object Dependency Injection readiness detection Dao
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


export interface IBaseLogEntryDao
  extends IDao<ILogEntry, LogEntryESelect, LogEntryECreateProperties, LogEntryEUpdateColumns, LogEntryEUpdateProperties, LogEntryEId, LogEntryGraph, QLogEntry> {
}

export class BaseLogEntryDao
  extends SQDIDao<ILogEntry, LogEntryESelect, LogEntryECreateProperties, LogEntryEUpdateColumns, LogEntryEUpdateProperties, LogEntryEId, LogEntryGraph, QLogEntry>
	implements IBaseLogEntryDao {
	
	static Find      = new DaoQueryDecorators<LogEntryESelect>();
	static FindOne   = new DaoQueryDecorators<LogEntryESelect>();
	static Search    = new DaoQueryDecorators<LogEntryESelect>();
	static SearchOne = new DaoQueryDecorators<LogEntryESelect>();
	static Save(
		config: LogEntryGraph
	): PropertyDecorator {
		return Dao.BaseSave<LogEntryGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBaseLogEntryTypeDao
  extends IDao<ILogEntryType, LogEntryTypeESelect, LogEntryTypeECreateProperties, LogEntryTypeEUpdateColumns, LogEntryTypeEUpdateProperties, LogEntryTypeEId, LogEntryTypeGraph, QLogEntryType> {
}

export class BaseLogEntryTypeDao
  extends SQDIDao<ILogEntryType, LogEntryTypeESelect, LogEntryTypeECreateProperties, LogEntryTypeEUpdateColumns, LogEntryTypeEUpdateProperties, LogEntryTypeEId, LogEntryTypeGraph, QLogEntryType>
	implements IBaseLogEntryTypeDao {
	
	static Find      = new DaoQueryDecorators<LogEntryTypeESelect>();
	static FindOne   = new DaoQueryDecorators<LogEntryTypeESelect>();
	static Search    = new DaoQueryDecorators<LogEntryTypeESelect>();
	static SearchOne = new DaoQueryDecorators<LogEntryTypeESelect>();
	static Save(
		config: LogEntryTypeGraph
	): PropertyDecorator {
		return Dao.BaseSave<LogEntryTypeGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseLogEntryValueDao
  extends IDao<ILogEntryValue, LogEntryValueESelect, LogEntryValueECreateProperties, LogEntryValueEUpdateColumns, LogEntryValueEUpdateProperties, LogEntryValueEId, LogEntryValueGraph, QLogEntryValue> {
}

export class BaseLogEntryValueDao
  extends SQDIDao<ILogEntryValue, LogEntryValueESelect, LogEntryValueECreateProperties, LogEntryValueEUpdateColumns, LogEntryValueEUpdateProperties, LogEntryValueEId, LogEntryValueGraph, QLogEntryValue>
	implements IBaseLogEntryValueDao {
	
	static Find      = new DaoQueryDecorators<LogEntryValueESelect>();
	static FindOne   = new DaoQueryDecorators<LogEntryValueESelect>();
	static Search    = new DaoQueryDecorators<LogEntryValueESelect>();
	static SearchOne = new DaoQueryDecorators<LogEntryValueESelect>();
	static Save(
		config: LogEntryValueGraph
	): PropertyDecorator {
		return Dao.BaseSave<LogEntryValueGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseLoggedErrorDao
  extends IDao<ILoggedError, LoggedErrorESelect, LoggedErrorECreateProperties, LoggedErrorEUpdateColumns, LoggedErrorEUpdateProperties, LoggedErrorEId, LoggedErrorGraph, QLoggedError> {
}

export class BaseLoggedErrorDao
  extends SQDIDao<ILoggedError, LoggedErrorESelect, LoggedErrorECreateProperties, LoggedErrorEUpdateColumns, LoggedErrorEUpdateProperties, LoggedErrorEId, LoggedErrorGraph, QLoggedError>
	implements IBaseLoggedErrorDao {
	
	static Find      = new DaoQueryDecorators<LoggedErrorESelect>();
	static FindOne   = new DaoQueryDecorators<LoggedErrorESelect>();
	static Search    = new DaoQueryDecorators<LoggedErrorESelect>();
	static SearchOne = new DaoQueryDecorators<LoggedErrorESelect>();
	static Save(
		config: LoggedErrorGraph
	): PropertyDecorator {
		return Dao.BaseSave<LoggedErrorGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(4)
	}
	
	constructor() {
		super(4)
	}
}


export interface IBaseLoggedErrorStackTraceDao
  extends IDao<ILoggedErrorStackTrace, LoggedErrorStackTraceESelect, LoggedErrorStackTraceECreateProperties, LoggedErrorStackTraceEUpdateColumns, LoggedErrorStackTraceEUpdateProperties, LoggedErrorStackTraceEId, LoggedErrorStackTraceGraph, QLoggedErrorStackTrace> {
}

export class BaseLoggedErrorStackTraceDao
  extends SQDIDao<ILoggedErrorStackTrace, LoggedErrorStackTraceESelect, LoggedErrorStackTraceECreateProperties, LoggedErrorStackTraceEUpdateColumns, LoggedErrorStackTraceEUpdateProperties, LoggedErrorStackTraceEId, LoggedErrorStackTraceGraph, QLoggedErrorStackTrace>
	implements IBaseLoggedErrorStackTraceDao {
	
	static Find      = new DaoQueryDecorators<LoggedErrorStackTraceESelect>();
	static FindOne   = new DaoQueryDecorators<LoggedErrorStackTraceESelect>();
	static Search    = new DaoQueryDecorators<LoggedErrorStackTraceESelect>();
	static SearchOne = new DaoQueryDecorators<LoggedErrorStackTraceESelect>();
	static Save(
		config: LoggedErrorStackTraceGraph
	): PropertyDecorator {
		return Dao.BaseSave<LoggedErrorStackTraceGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(3)
	}
	
	constructor() {
		super(3)
	}
}

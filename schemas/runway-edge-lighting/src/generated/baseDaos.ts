import {
	IDao,
	IEntityCascadeGraph,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity
} from '@airport/air-control'
import {
	Dao
} from '@airport/check-in'
import {
	EntityId as DbEntityId
} from '@airport/ground-control'
import {
	Q,
	diSet
} from './qSchema'
import {
	ILogEntry,
	LogEntryESelect,
	LogEntryECascadeGraph,
	LogEntryECreateColumns,
	LogEntryECreateProperties,
	LogEntryEUpdateColumns,
	LogEntryEUpdateProperties,
	LogEntryEId,
	QLogEntry
} from './qlogentry'
import {
	ILogEntryType,
	LogEntryTypeESelect,
	LogEntryTypeECascadeGraph,
	LogEntryTypeECreateColumns,
	LogEntryTypeECreateProperties,
	LogEntryTypeEUpdateColumns,
	LogEntryTypeEUpdateProperties,
	LogEntryTypeEId,
	QLogEntryType
} from './qlogentrytype'
import {
	ILogEntryValue,
	LogEntryValueESelect,
	LogEntryValueECascadeGraph,
	LogEntryValueECreateColumns,
	LogEntryValueECreateProperties,
	LogEntryValueEUpdateColumns,
	LogEntryValueEUpdateProperties,
	LogEntryValueEId,
	QLogEntryValue
} from './qlogentryvalue'
import {
	ILoggedError,
	LoggedErrorESelect,
	LoggedErrorECascadeGraph,
	LoggedErrorECreateColumns,
	LoggedErrorECreateProperties,
	LoggedErrorEUpdateColumns,
	LoggedErrorEUpdateProperties,
	LoggedErrorEId,
	QLoggedError
} from './qloggederror'
import {
	ILoggedErrorStackTrace,
	LoggedErrorStackTraceESelect,
	LoggedErrorStackTraceECascadeGraph,
	LoggedErrorStackTraceECreateColumns,
	LoggedErrorStackTraceECreateProperties,
	LoggedErrorStackTraceEUpdateColumns,
	LoggedErrorStackTraceEUpdateProperties,
	LoggedErrorStackTraceEId,
	QLoggedErrorStackTrace
} from './qloggederrorstacktrace'

// Schema Q object Dependency Injection readiness detection DAO
export class SQDIDao<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
	EntityUpdateColumns extends IEntityUpdateColumns,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	EntityCascadeGraph extends IEntityCascadeGraph,
	IQE extends IQEntity>
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
  extends IDao<ILogEntry, LogEntryESelect, LogEntryECreateProperties, LogEntryEUpdateColumns, LogEntryEUpdateProperties, LogEntryEId, LogEntryECascadeGraph, QLogEntry> {
}

export class BaseLogEntryDao
  extends SQDIDao<ILogEntry, LogEntryESelect, LogEntryECreateProperties, LogEntryEUpdateColumns, LogEntryEUpdateProperties, LogEntryEId, LogEntryECascadeGraph, QLogEntry>
	implements IBaseLogEntryDao {

	static diSet(): boolean {
		return diSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBaseLogEntryTypeDao
  extends IDao<ILogEntryType, LogEntryTypeESelect, LogEntryTypeECreateProperties, LogEntryTypeEUpdateColumns, LogEntryTypeEUpdateProperties, LogEntryTypeEId, LogEntryTypeECascadeGraph, QLogEntryType> {
}

export class BaseLogEntryTypeDao
  extends SQDIDao<ILogEntryType, LogEntryTypeESelect, LogEntryTypeECreateProperties, LogEntryTypeEUpdateColumns, LogEntryTypeEUpdateProperties, LogEntryTypeEId, LogEntryTypeECascadeGraph, QLogEntryType>
	implements IBaseLogEntryTypeDao {

	static diSet(): boolean {
		return diSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseLogEntryValueDao
  extends IDao<ILogEntryValue, LogEntryValueESelect, LogEntryValueECreateProperties, LogEntryValueEUpdateColumns, LogEntryValueEUpdateProperties, LogEntryValueEId, LogEntryValueECascadeGraph, QLogEntryValue> {
}

export class BaseLogEntryValueDao
  extends SQDIDao<ILogEntryValue, LogEntryValueESelect, LogEntryValueECreateProperties, LogEntryValueEUpdateColumns, LogEntryValueEUpdateProperties, LogEntryValueEId, LogEntryValueECascadeGraph, QLogEntryValue>
	implements IBaseLogEntryValueDao {

	static diSet(): boolean {
		return diSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseLoggedErrorDao
  extends IDao<ILoggedError, LoggedErrorESelect, LoggedErrorECreateProperties, LoggedErrorEUpdateColumns, LoggedErrorEUpdateProperties, LoggedErrorEId, LoggedErrorECascadeGraph, QLoggedError> {
}

export class BaseLoggedErrorDao
  extends SQDIDao<ILoggedError, LoggedErrorESelect, LoggedErrorECreateProperties, LoggedErrorEUpdateColumns, LoggedErrorEUpdateProperties, LoggedErrorEId, LoggedErrorECascadeGraph, QLoggedError>
	implements IBaseLoggedErrorDao {

	static diSet(): boolean {
		return diSet(4)
	}
	
	constructor() {
		super(4)
	}
}


export interface IBaseLoggedErrorStackTraceDao
  extends IDao<ILoggedErrorStackTrace, LoggedErrorStackTraceESelect, LoggedErrorStackTraceECreateProperties, LoggedErrorStackTraceEUpdateColumns, LoggedErrorStackTraceEUpdateProperties, LoggedErrorStackTraceEId, LoggedErrorStackTraceECascadeGraph, QLoggedErrorStackTrace> {
}

export class BaseLoggedErrorStackTraceDao
  extends SQDIDao<ILoggedErrorStackTrace, LoggedErrorStackTraceESelect, LoggedErrorStackTraceECreateProperties, LoggedErrorStackTraceEUpdateColumns, LoggedErrorStackTraceEUpdateProperties, LoggedErrorStackTraceEId, LoggedErrorStackTraceECascadeGraph, QLoggedErrorStackTrace>
	implements IBaseLoggedErrorStackTraceDao {

	static diSet(): boolean {
		return diSet(3)
	}
	
	constructor() {
		super(3)
	}
}

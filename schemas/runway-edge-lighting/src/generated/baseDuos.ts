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
	ILogEntry
} from './logentry'
import {
	LogEntryESelect,
	LogEntryECreateColumns,
	LogEntryECreateProperties,
	LogEntryEUpdateColumns,
	LogEntryEUpdateProperties,
	LogEntryEId,
	LogEntryECascadeGraph,
	QLogEntry
} from './qlogentry'
import {
	ILogEntryType
} from './logentrytype'
import {
	LogEntryTypeESelect,
	LogEntryTypeECreateColumns,
	LogEntryTypeECreateProperties,
	LogEntryTypeEUpdateColumns,
	LogEntryTypeEUpdateProperties,
	LogEntryTypeEId,
	LogEntryTypeECascadeGraph,
	QLogEntryType
} from './qlogentrytype'
import {
	ILogEntryValue
} from './logentryvalue'
import {
	LogEntryValueESelect,
	LogEntryValueECreateColumns,
	LogEntryValueECreateProperties,
	LogEntryValueEUpdateColumns,
	LogEntryValueEUpdateProperties,
	LogEntryValueEId,
	LogEntryValueECascadeGraph,
	QLogEntryValue
} from './qlogentryvalue'
import {
	ILoggedError
} from './loggederror'
import {
	LoggedErrorESelect,
	LoggedErrorECreateColumns,
	LoggedErrorECreateProperties,
	LoggedErrorEUpdateColumns,
	LoggedErrorEUpdateProperties,
	LoggedErrorEId,
	LoggedErrorECascadeGraph,
	QLoggedError
} from './qloggederror'
import {
	ILoggedErrorStackTrace
} from './loggederrorstacktrace'
import {
	LoggedErrorStackTraceESelect,
	LoggedErrorStackTraceECreateColumns,
	LoggedErrorStackTraceECreateProperties,
	LoggedErrorStackTraceEUpdateColumns,
	LoggedErrorStackTraceEUpdateProperties,
	LoggedErrorStackTraceEId,
	LoggedErrorStackTraceECascadeGraph,
	QLoggedErrorStackTrace
} from './qloggederrorstacktrace'


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


export interface IBaseLogEntryDuo
  extends IDuo<ILogEntry, LogEntryESelect, LogEntryECreateProperties, LogEntryEUpdateColumns, LogEntryEUpdateProperties, LogEntryEId, LogEntryECascadeGraph, QLogEntry> {
}

export class BaseLogEntryDuo
  extends SQDIDuo<ILogEntry, LogEntryESelect, LogEntryECreateProperties, LogEntryEUpdateColumns, LogEntryEUpdateProperties, LogEntryEId, LogEntryECascadeGraph, QLogEntry>
	implements IBaseLogEntryDuo {

	static diSet(): boolean {
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseLogEntryTypeDuo
  extends IDuo<ILogEntryType, LogEntryTypeESelect, LogEntryTypeECreateProperties, LogEntryTypeEUpdateColumns, LogEntryTypeEUpdateProperties, LogEntryTypeEId, LogEntryTypeECascadeGraph, QLogEntryType> {
}

export class BaseLogEntryTypeDuo
  extends SQDIDuo<ILogEntryType, LogEntryTypeESelect, LogEntryTypeECreateProperties, LogEntryTypeEUpdateColumns, LogEntryTypeEUpdateProperties, LogEntryTypeEId, LogEntryTypeECascadeGraph, QLogEntryType>
	implements IBaseLogEntryTypeDuo {

	static diSet(): boolean {
		return duoDiSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBaseLogEntryValueDuo
  extends IDuo<ILogEntryValue, LogEntryValueESelect, LogEntryValueECreateProperties, LogEntryValueEUpdateColumns, LogEntryValueEUpdateProperties, LogEntryValueEId, LogEntryValueECascadeGraph, QLogEntryValue> {
}

export class BaseLogEntryValueDuo
  extends SQDIDuo<ILogEntryValue, LogEntryValueESelect, LogEntryValueECreateProperties, LogEntryValueEUpdateColumns, LogEntryValueEUpdateProperties, LogEntryValueEId, LogEntryValueECascadeGraph, QLogEntryValue>
	implements IBaseLogEntryValueDuo {

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseLoggedErrorDuo
  extends IDuo<ILoggedError, LoggedErrorESelect, LoggedErrorECreateProperties, LoggedErrorEUpdateColumns, LoggedErrorEUpdateProperties, LoggedErrorEId, LoggedErrorECascadeGraph, QLoggedError> {
}

export class BaseLoggedErrorDuo
  extends SQDIDuo<ILoggedError, LoggedErrorESelect, LoggedErrorECreateProperties, LoggedErrorEUpdateColumns, LoggedErrorEUpdateProperties, LoggedErrorEId, LoggedErrorECascadeGraph, QLoggedError>
	implements IBaseLoggedErrorDuo {

	static diSet(): boolean {
		return duoDiSet(4)
	}
	
	constructor() {
		super(4)
	}
}


export interface IBaseLoggedErrorStackTraceDuo
  extends IDuo<ILoggedErrorStackTrace, LoggedErrorStackTraceESelect, LoggedErrorStackTraceECreateProperties, LoggedErrorStackTraceEUpdateColumns, LoggedErrorStackTraceEUpdateProperties, LoggedErrorStackTraceEId, LoggedErrorStackTraceECascadeGraph, QLoggedErrorStackTrace> {
}

export class BaseLoggedErrorStackTraceDuo
  extends SQDIDuo<ILoggedErrorStackTrace, LoggedErrorStackTraceESelect, LoggedErrorStackTraceECreateProperties, LoggedErrorStackTraceEUpdateColumns, LoggedErrorStackTraceEUpdateProperties, LoggedErrorStackTraceEId, LoggedErrorStackTraceECascadeGraph, QLoggedErrorStackTrace>
	implements IBaseLoggedErrorStackTraceDuo {

	static diSet(): boolean {
		return duoDiSet(3)
	}
	
	constructor() {
		super(3)
	}
}

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
	duoDiSet
} from './qSchema'
import {
	ILogEntry,
	LogEntryESelect,
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
	LoggedErrorStackTraceECreateColumns,
	LoggedErrorStackTraceECreateProperties,
	LoggedErrorStackTraceEUpdateColumns,
	LoggedErrorStackTraceEUpdateProperties,
	LoggedErrorStackTraceEId,
	QLoggedErrorStackTrace
} from './qloggederrorstacktrace'


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


export interface IBaseLogEntryDuo
  extends IDuo<ILogEntry, LogEntryESelect, LogEntryECreateProperties, LogEntryEUpdateProperties, LogEntryEId, QLogEntry> {
}

export class BaseLogEntryDuo
  extends SQDIDuo<ILogEntry, LogEntryESelect, LogEntryECreateProperties, LogEntryEUpdateProperties, LogEntryEId, QLogEntry>
	implements IBaseLogEntryDuo {

	static diSet(): boolean {
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseLogEntryTypeDuo
  extends IDuo<ILogEntryType, LogEntryTypeESelect, LogEntryTypeECreateProperties, LogEntryTypeEUpdateProperties, LogEntryTypeEId, QLogEntryType> {
}

export class BaseLogEntryTypeDuo
  extends SQDIDuo<ILogEntryType, LogEntryTypeESelect, LogEntryTypeECreateProperties, LogEntryTypeEUpdateProperties, LogEntryTypeEId, QLogEntryType>
	implements IBaseLogEntryTypeDuo {

	static diSet(): boolean {
		return duoDiSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBaseLogEntryValueDuo
  extends IDuo<ILogEntryValue, LogEntryValueESelect, LogEntryValueECreateProperties, LogEntryValueEUpdateProperties, LogEntryValueEId, QLogEntryValue> {
}

export class BaseLogEntryValueDuo
  extends SQDIDuo<ILogEntryValue, LogEntryValueESelect, LogEntryValueECreateProperties, LogEntryValueEUpdateProperties, LogEntryValueEId, QLogEntryValue>
	implements IBaseLogEntryValueDuo {

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseLoggedErrorDuo
  extends IDuo<ILoggedError, LoggedErrorESelect, LoggedErrorECreateProperties, LoggedErrorEUpdateProperties, LoggedErrorEId, QLoggedError> {
}

export class BaseLoggedErrorDuo
  extends SQDIDuo<ILoggedError, LoggedErrorESelect, LoggedErrorECreateProperties, LoggedErrorEUpdateProperties, LoggedErrorEId, QLoggedError>
	implements IBaseLoggedErrorDuo {

	static diSet(): boolean {
		return duoDiSet(4)
	}
	
	constructor() {
		super(4)
	}
}


export interface IBaseLoggedErrorStackTraceDuo
  extends IDuo<ILoggedErrorStackTrace, LoggedErrorStackTraceESelect, LoggedErrorStackTraceECreateProperties, LoggedErrorStackTraceEUpdateProperties, LoggedErrorStackTraceEId, QLoggedErrorStackTrace> {
}

export class BaseLoggedErrorStackTraceDuo
  extends SQDIDuo<ILoggedErrorStackTrace, LoggedErrorStackTraceESelect, LoggedErrorStackTraceECreateProperties, LoggedErrorStackTraceEUpdateProperties, LoggedErrorStackTraceEId, QLoggedErrorStackTrace>
	implements IBaseLoggedErrorStackTraceDuo {

	static diSet(): boolean {
		return duoDiSet(3)
	}
	
	constructor() {
		super(3)
	}
}

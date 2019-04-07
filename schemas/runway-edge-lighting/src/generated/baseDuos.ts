import {
	IDuo,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateProperties,
	IQEntity
} from '@airport/air-control';
import { Duo } from "@airport/check-in";
import { Q } from './qSchema';
import {
	ILogEntry,
	LogEntryESelect,
	LogEntryECreateColumns,
	LogEntryECreateProperties,
	LogEntryEUpdateColumns,
	LogEntryEUpdateProperties,
	LogEntryEId,
	QLogEntry
} from './qlogentry';
import {
	ILogEntryType,
	LogEntryTypeESelect,
	LogEntryTypeECreateColumns,
	LogEntryTypeECreateProperties,
	LogEntryTypeEUpdateColumns,
	LogEntryTypeEUpdateProperties,
	LogEntryTypeEId,
	QLogEntryType
} from './qlogentrytype';
import {
	ILogEntryValue,
	LogEntryValueESelect,
	LogEntryValueECreateColumns,
	LogEntryValueECreateProperties,
	LogEntryValueEUpdateColumns,
	LogEntryValueEUpdateProperties,
	LogEntryValueEId,
	QLogEntryValue
} from './qlogentryvalue';
import {
	ILoggedError,
	LoggedErrorESelect,
	LoggedErrorECreateColumns,
	LoggedErrorECreateProperties,
	LoggedErrorEUpdateColumns,
	LoggedErrorEUpdateProperties,
	LoggedErrorEId,
	QLoggedError
} from './qloggederror';
import {
	ILoggedErrorStackTrace,
	LoggedErrorStackTraceESelect,
	LoggedErrorStackTraceECreateColumns,
	LoggedErrorStackTraceECreateProperties,
	LoggedErrorStackTraceEUpdateColumns,
	LoggedErrorStackTraceEUpdateProperties,
	LoggedErrorStackTraceEId,
	QLoggedErrorStackTrace
} from './qloggederrorstacktrace';


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

	static diSet(): boolean {
		return Q.db as any
	}

	constructor(
		dbEntityName: string
	) {
		super(dbEntityName, Q)
	}
}


export interface IBaseLogEntryDuo
  extends IDuo<ILogEntry, LogEntryESelect, LogEntryECreateProperties, LogEntryEUpdateProperties, LogEntryEId, QLogEntry> {
}

export class BaseLogEntryDuo
  extends SQDIDuo<ILogEntry, LogEntryESelect, LogEntryECreateProperties, LogEntryEUpdateProperties, LogEntryEId, QLogEntry>
	implements IBaseLogEntryDuo {
	constructor() {
		super('LogEntry');
	}
}


export interface IBaseLogEntryTypeDuo
  extends IDuo<ILogEntryType, LogEntryTypeESelect, LogEntryTypeECreateProperties, LogEntryTypeEUpdateProperties, LogEntryTypeEId, QLogEntryType> {
}

export class BaseLogEntryTypeDuo
  extends SQDIDuo<ILogEntryType, LogEntryTypeESelect, LogEntryTypeECreateProperties, LogEntryTypeEUpdateProperties, LogEntryTypeEId, QLogEntryType>
	implements IBaseLogEntryTypeDuo {
	constructor() {
		super('LogEntryType');
	}
}


export interface IBaseLogEntryValueDuo
  extends IDuo<ILogEntryValue, LogEntryValueESelect, LogEntryValueECreateProperties, LogEntryValueEUpdateProperties, LogEntryValueEId, QLogEntryValue> {
}

export class BaseLogEntryValueDuo
  extends SQDIDuo<ILogEntryValue, LogEntryValueESelect, LogEntryValueECreateProperties, LogEntryValueEUpdateProperties, LogEntryValueEId, QLogEntryValue>
	implements IBaseLogEntryValueDuo {
	constructor() {
		super('LogEntryValue');
	}
}


export interface IBaseLoggedErrorDuo
  extends IDuo<ILoggedError, LoggedErrorESelect, LoggedErrorECreateProperties, LoggedErrorEUpdateProperties, LoggedErrorEId, QLoggedError> {
}

export class BaseLoggedErrorDuo
  extends SQDIDuo<ILoggedError, LoggedErrorESelect, LoggedErrorECreateProperties, LoggedErrorEUpdateProperties, LoggedErrorEId, QLoggedError>
	implements IBaseLoggedErrorDuo {
	constructor() {
		super('LoggedError');
	}
}


export interface IBaseLoggedErrorStackTraceDuo
  extends IDuo<ILoggedErrorStackTrace, LoggedErrorStackTraceESelect, LoggedErrorStackTraceECreateProperties, LoggedErrorStackTraceEUpdateProperties, LoggedErrorStackTraceEId, QLoggedErrorStackTrace> {
}

export class BaseLoggedErrorStackTraceDuo
  extends SQDIDuo<ILoggedErrorStackTrace, LoggedErrorStackTraceESelect, LoggedErrorStackTraceECreateProperties, LoggedErrorStackTraceEUpdateProperties, LoggedErrorStackTraceEId, QLoggedErrorStackTrace>
	implements IBaseLoggedErrorStackTraceDuo {
	constructor() {
		super('LoggedErrorStackTrace');
	}
}

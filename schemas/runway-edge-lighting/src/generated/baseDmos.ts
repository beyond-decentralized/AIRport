import { IDmo } from "@airport/air-control";
import { Dmo } from "@airport/check-in";
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


export interface IBaseLogEntryDmo
  extends IDmo<ILogEntry, LogEntryESelect, LogEntryECreateProperties, LogEntryEUpdateProperties, LogEntryEId, QLogEntry> {
}

export class BaseLogEntryDmo
  extends Dmo<ILogEntry, LogEntryESelect, LogEntryECreateProperties, LogEntryEUpdateProperties, LogEntryEId, QLogEntry>
	implements IBaseLogEntryDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['LogEntry']);
	}
}


export interface IBaseLogEntryTypeDmo
  extends IDmo<ILogEntryType, LogEntryTypeESelect, LogEntryTypeECreateProperties, LogEntryTypeEUpdateProperties, LogEntryTypeEId, QLogEntryType> {
}

export class BaseLogEntryTypeDmo
  extends Dmo<ILogEntryType, LogEntryTypeESelect, LogEntryTypeECreateProperties, LogEntryTypeEUpdateProperties, LogEntryTypeEId, QLogEntryType>
	implements IBaseLogEntryTypeDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['LogEntryType']);
	}
}


export interface IBaseLogEntryValueDmo
  extends IDmo<ILogEntryValue, LogEntryValueESelect, LogEntryValueECreateProperties, LogEntryValueEUpdateProperties, LogEntryValueEId, QLogEntryValue> {
}

export class BaseLogEntryValueDmo
  extends Dmo<ILogEntryValue, LogEntryValueESelect, LogEntryValueECreateProperties, LogEntryValueEUpdateProperties, LogEntryValueEId, QLogEntryValue>
	implements IBaseLogEntryValueDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['LogEntryValue']);
	}
}


export interface IBaseLoggedErrorDmo
  extends IDmo<ILoggedError, LoggedErrorESelect, LoggedErrorECreateProperties, LoggedErrorEUpdateProperties, LoggedErrorEId, QLoggedError> {
}

export class BaseLoggedErrorDmo
  extends Dmo<ILoggedError, LoggedErrorESelect, LoggedErrorECreateProperties, LoggedErrorEUpdateProperties, LoggedErrorEId, QLoggedError>
	implements IBaseLoggedErrorDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['LoggedError']);
	}
}


export interface IBaseLoggedErrorStackTraceDmo
  extends IDmo<ILoggedErrorStackTrace, LoggedErrorStackTraceESelect, LoggedErrorStackTraceECreateProperties, LoggedErrorStackTraceEUpdateProperties, LoggedErrorStackTraceEId, QLoggedErrorStackTrace> {
}

export class BaseLoggedErrorStackTraceDmo
  extends Dmo<ILoggedErrorStackTrace, LoggedErrorStackTraceESelect, LoggedErrorStackTraceECreateProperties, LoggedErrorStackTraceEUpdateProperties, LoggedErrorStackTraceEId, QLoggedErrorStackTrace>
	implements IBaseLoggedErrorStackTraceDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['LoggedErrorStackTrace']);
	}
}

import {
	IDao, 
	IUtils 
} from '@airport/air-control';
import { Dao } from '@airport/check-in';
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


export interface IBaseLogEntryDao
  extends IDao<ILogEntry, LogEntryESelect, LogEntryECreateProperties, LogEntryEUpdateColumns, LogEntryEUpdateProperties, LogEntryEId, QLogEntry> {
}

export class BaseLogEntryDao
  extends Dao<ILogEntry, LogEntryESelect, LogEntryECreateProperties, LogEntryEUpdateColumns, LogEntryEUpdateProperties, LogEntryEId, QLogEntry>
	implements IBaseLogEntryDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['LogEntry'], Q, utils);
	}
}


export interface IBaseLogEntryTypeDao
  extends IDao<ILogEntryType, LogEntryTypeESelect, LogEntryTypeECreateProperties, LogEntryTypeEUpdateColumns, LogEntryTypeEUpdateProperties, LogEntryTypeEId, QLogEntryType> {
}

export class BaseLogEntryTypeDao
  extends Dao<ILogEntryType, LogEntryTypeESelect, LogEntryTypeECreateProperties, LogEntryTypeEUpdateColumns, LogEntryTypeEUpdateProperties, LogEntryTypeEId, QLogEntryType>
	implements IBaseLogEntryTypeDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['LogEntryType'], Q, utils);
	}
}


export interface IBaseLogEntryValueDao
  extends IDao<ILogEntryValue, LogEntryValueESelect, LogEntryValueECreateProperties, LogEntryValueEUpdateColumns, LogEntryValueEUpdateProperties, LogEntryValueEId, QLogEntryValue> {
}

export class BaseLogEntryValueDao
  extends Dao<ILogEntryValue, LogEntryValueESelect, LogEntryValueECreateProperties, LogEntryValueEUpdateColumns, LogEntryValueEUpdateProperties, LogEntryValueEId, QLogEntryValue>
	implements IBaseLogEntryValueDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['LogEntryValue'], Q, utils);
	}
}


export interface IBaseLoggedErrorDao
  extends IDao<ILoggedError, LoggedErrorESelect, LoggedErrorECreateProperties, LoggedErrorEUpdateColumns, LoggedErrorEUpdateProperties, LoggedErrorEId, QLoggedError> {
}

export class BaseLoggedErrorDao
  extends Dao<ILoggedError, LoggedErrorESelect, LoggedErrorECreateProperties, LoggedErrorEUpdateColumns, LoggedErrorEUpdateProperties, LoggedErrorEId, QLoggedError>
	implements IBaseLoggedErrorDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['LoggedError'], Q, utils);
	}
}


export interface IBaseLoggedErrorStackTraceDao
  extends IDao<ILoggedErrorStackTrace, LoggedErrorStackTraceESelect, LoggedErrorStackTraceECreateProperties, LoggedErrorStackTraceEUpdateColumns, LoggedErrorStackTraceEUpdateProperties, LoggedErrorStackTraceEId, QLoggedErrorStackTrace> {
}

export class BaseLoggedErrorStackTraceDao
  extends Dao<ILoggedErrorStackTrace, LoggedErrorStackTraceESelect, LoggedErrorStackTraceECreateProperties, LoggedErrorStackTraceEUpdateColumns, LoggedErrorStackTraceEUpdateProperties, LoggedErrorStackTraceEId, QLoggedErrorStackTrace>
	implements IBaseLoggedErrorStackTraceDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['LoggedErrorStackTrace'], Q, utils);
	}
}

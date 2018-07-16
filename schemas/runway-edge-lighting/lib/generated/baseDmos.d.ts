import { IDmo } from "@airport/air-control";
import { Dmo } from "@airport/check-in";
import { ILogEntry, LogEntryESelect, LogEntryECreateProperties, LogEntryEUpdateProperties, LogEntryEId, QLogEntry } from './qlogentry';
import { ILogEntryType, LogEntryTypeESelect, LogEntryTypeECreateProperties, LogEntryTypeEUpdateProperties, LogEntryTypeEId, QLogEntryType } from './qlogentrytype';
import { ILogEntryValue, LogEntryValueESelect, LogEntryValueECreateProperties, LogEntryValueEUpdateProperties, LogEntryValueEId, QLogEntryValue } from './qlogentryvalue';
import { ILoggedError, LoggedErrorESelect, LoggedErrorECreateProperties, LoggedErrorEUpdateProperties, LoggedErrorEId, QLoggedError } from './qloggederror';
import { ILoggedErrorStackTrace, LoggedErrorStackTraceESelect, LoggedErrorStackTraceECreateProperties, LoggedErrorStackTraceEUpdateProperties, LoggedErrorStackTraceEId, QLoggedErrorStackTrace } from './qloggederrorstacktrace';
export interface IBaseLogEntryDmo extends IDmo<ILogEntry, LogEntryESelect, LogEntryECreateProperties, LogEntryEUpdateProperties, LogEntryEId, QLogEntry> {
}
export declare class BaseLogEntryDmo extends Dmo<ILogEntry, LogEntryESelect, LogEntryECreateProperties, LogEntryEUpdateProperties, LogEntryEId, QLogEntry> implements IBaseLogEntryDmo {
    constructor();
}
export interface IBaseLogEntryTypeDmo extends IDmo<ILogEntryType, LogEntryTypeESelect, LogEntryTypeECreateProperties, LogEntryTypeEUpdateProperties, LogEntryTypeEId, QLogEntryType> {
}
export declare class BaseLogEntryTypeDmo extends Dmo<ILogEntryType, LogEntryTypeESelect, LogEntryTypeECreateProperties, LogEntryTypeEUpdateProperties, LogEntryTypeEId, QLogEntryType> implements IBaseLogEntryTypeDmo {
    constructor();
}
export interface IBaseLogEntryValueDmo extends IDmo<ILogEntryValue, LogEntryValueESelect, LogEntryValueECreateProperties, LogEntryValueEUpdateProperties, LogEntryValueEId, QLogEntryValue> {
}
export declare class BaseLogEntryValueDmo extends Dmo<ILogEntryValue, LogEntryValueESelect, LogEntryValueECreateProperties, LogEntryValueEUpdateProperties, LogEntryValueEId, QLogEntryValue> implements IBaseLogEntryValueDmo {
    constructor();
}
export interface IBaseLoggedErrorDmo extends IDmo<ILoggedError, LoggedErrorESelect, LoggedErrorECreateProperties, LoggedErrorEUpdateProperties, LoggedErrorEId, QLoggedError> {
}
export declare class BaseLoggedErrorDmo extends Dmo<ILoggedError, LoggedErrorESelect, LoggedErrorECreateProperties, LoggedErrorEUpdateProperties, LoggedErrorEId, QLoggedError> implements IBaseLoggedErrorDmo {
    constructor();
}
export interface IBaseLoggedErrorStackTraceDmo extends IDmo<ILoggedErrorStackTrace, LoggedErrorStackTraceESelect, LoggedErrorStackTraceECreateProperties, LoggedErrorStackTraceEUpdateProperties, LoggedErrorStackTraceEId, QLoggedErrorStackTrace> {
}
export declare class BaseLoggedErrorStackTraceDmo extends Dmo<ILoggedErrorStackTrace, LoggedErrorStackTraceESelect, LoggedErrorStackTraceECreateProperties, LoggedErrorStackTraceEUpdateProperties, LoggedErrorStackTraceEId, QLoggedErrorStackTrace> implements IBaseLoggedErrorStackTraceDmo {
    constructor();
}

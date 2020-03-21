import { ILogEntry } from './logentry';
import { ILoggedErrorStackTrace } from './loggederrorstacktrace';
export interface ILoggedError {
    logEntry: ILogEntry;
    stackTrace?: ILoggedErrorStackTrace;
}
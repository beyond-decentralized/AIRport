import { ILogEntry } from './logentry';
export interface ILogEntryValue {
    id: number;
    position?: number;
    value?: any;
    logEntry?: ILogEntry;
}

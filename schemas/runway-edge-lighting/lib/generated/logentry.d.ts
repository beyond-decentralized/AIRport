import { ILogEntryType } from './logentrytype';
import { ILogEntryValue } from './logentryvalue';
export interface ILogEntry {
    id: number;
    timestamp?: Date;
    type?: ILogEntryType;
    values?: ILogEntryValue[];
}

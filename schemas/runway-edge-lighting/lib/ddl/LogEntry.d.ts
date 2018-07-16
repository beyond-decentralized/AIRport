import { LogEntryType } from "./LogEntryType";
import { LogEntryValue } from "./LogEntryValue";
export declare type LogEntryId = number;
export declare type LogEntryTimestamp = Date;
export declare class LogEntry {
    id: LogEntryId;
    timestamp: LogEntryTimestamp;
    type: LogEntryType;
    values: LogEntryValue[];
}

import { LogEntry } from "./LogEntry";
export declare type LogEntryValueId = number;
export declare type LogEntryValuePosition = number;
export declare type LogEntryValueValue = boolean | number | string;
export declare class LogEntryValue {
    id: LogEntryValueId;
    logEntry: LogEntry;
    position: LogEntryValuePosition;
    value: LogEntryValueValue;
}
//# sourceMappingURL=LogEntryValue.d.ts.map
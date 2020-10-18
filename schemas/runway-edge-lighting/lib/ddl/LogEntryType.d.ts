import { ApplicationPackage, PackagedUnit } from "@airport/territory";
import { LogEntry } from "./LogEntry";
import { LogLevel } from "./LogLevel";
export declare type LogEntryTypeId = number;
export declare type LogEntryTypeText = string;
export declare class LogEntryType {
    id: LogEntryTypeId;
    level: LogLevel;
    applicationPackage: ApplicationPackage;
    packagedUnit: PackagedUnit;
    text: LogEntryTypeText;
    logEntries: LogEntry[];
}
//# sourceMappingURL=LogEntryType.d.ts.map
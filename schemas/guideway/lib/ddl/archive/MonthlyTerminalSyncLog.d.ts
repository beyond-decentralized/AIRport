import { Terminal } from "../terminal/Terminal";
import { MonthlyArchiveLog } from "./MonthlyArchiveLog";
export declare type MonthlyTerminalSyncLogAcknowledged = boolean;
export declare type MonthlyTerminalSyncLogMonthlySyncStatuses = string;
export declare class MonthlyTerminalSyncLog {
    monthlyArchiveLog: MonthlyArchiveLog;
    terminal: Terminal;
    allAcknowledged: MonthlyTerminalSyncLogAcknowledged;
    dailySyncStatuses: MonthlyTerminalSyncLogMonthlySyncStatuses;
}

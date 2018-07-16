import { Terminal } from "../terminal/Terminal";
import { DailyArchiveLog } from "./DailyArchiveLog";
export declare type DailyTerminalSyncLogAcknowledged = boolean;
export declare class DailyTerminalSyncLog {
    dailyArchiveLog: DailyArchiveLog;
    terminal: Terminal;
    acknowledged: DailyTerminalSyncLogAcknowledged;
}

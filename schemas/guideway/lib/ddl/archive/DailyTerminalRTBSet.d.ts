import { Terminal } from "../terminal/Terminal";
import { DailyArchiveLog } from "./DailyArchiveLog";
export declare type DailyTerminalRTBSetAcknowledged = boolean;
export declare class DailyTerminalRTBSet {
    dailyArchiveLog: DailyArchiveLog;
    terminal: Terminal;
    acknowledged: DailyTerminalRTBSetAcknowledged;
}

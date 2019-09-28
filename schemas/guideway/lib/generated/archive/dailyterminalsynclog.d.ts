import { IDailyArchiveLog } from './dailyarchivelog';
import { ITerminal } from '../terminal/terminal';
export interface IDailyTerminalSyncLog {
    dailyArchiveLog: IDailyArchiveLog;
    terminal: ITerminal;
    acknowledged?: number;
}

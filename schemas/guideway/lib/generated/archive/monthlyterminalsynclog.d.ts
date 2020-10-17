import { IMonthlyArchiveLog } from './monthlyarchivelog';
import { ITerminal } from '../terminal/terminal';
export interface IMonthlyTerminalSyncLog {
    monthlyArchiveLog: IMonthlyArchiveLog;
    terminal: ITerminal;
    allAcknowledged?: boolean;
    dailySyncStatuses?: string;
}
//# sourceMappingURL=monthlyterminalsynclog.d.ts.map
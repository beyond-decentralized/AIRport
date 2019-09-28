import { ITerminal } from '../terminal/terminal';
import { ISyncLog } from './synclog';
export interface IAgtSharingMessage {
    id: number;
    tmSharingMessageId?: number;
    acknowledged?: number;
    terminal?: ITerminal;
    syncLogs?: ISyncLog[];
}

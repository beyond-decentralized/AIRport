import { ITerminal } from '../terminal/terminal';
import { ISyncLog } from './synclog';
export interface IAgtSharingMessage {
    id: number;
    tmSharingMessageId?: number;
    acknowledged?: string;
    terminal?: ITerminal;
    syncLogs?: ISyncLog[];
}
//# sourceMappingURL=agtsharingmessage.d.ts.map
import { IUser } from '../user/user';
import { ITerminalRepository } from './terminalrepository';
import { IAgtSharingMessage } from '../synchronization/agtsharingmessage';
export interface ITerminal {
    id: number;
    name?: string;
    secondId?: number;
    password?: string;
    lastPollConnectionDatetime?: number;
    lastSseConnectionDatetime?: number;
    user?: IUser;
    terminalRepositories?: ITerminalRepository[];
    sharingMessages?: IAgtSharingMessage[];
}
//# sourceMappingURL=terminal.d.ts.map
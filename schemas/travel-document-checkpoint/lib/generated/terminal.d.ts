import { IUser } from './user';
import { ITerminalAgt } from './terminalagt';
import { IUserTerminal } from './userterminal';
import { IUserTerminalAgt } from './userterminalagt';
export interface ITerminal {
    id: number;
    uuId?: string;
    isLocal?: boolean;
    owner?: IUser;
    terminalAgts?: ITerminalAgt[];
    userTerminal?: IUserTerminal[];
    userTerminalAgt?: IUserTerminalAgt[];
}
//# sourceMappingURL=terminal.d.ts.map
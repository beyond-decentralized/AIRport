import { IUser } from './user';
import { ITerminalAgt } from './terminalagt';
import { IUserTerminal } from './userterminal';
import { IUserTerminalAgt } from './userterminalagt';
export interface ITerminal {
    id: number;
    name?: string;
    secondId?: number;
    isLocal?: boolean;
    owner?: IUser;
    terminalAgts?: ITerminalAgt[];
    userTerminal?: IUserTerminal[];
    userTerminalAgt?: IUserTerminalAgt[];
}

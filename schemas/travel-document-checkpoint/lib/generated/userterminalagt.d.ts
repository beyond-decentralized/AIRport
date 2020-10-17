import { IUser } from './user';
import { ITerminal } from './terminal';
import { IAgt } from './agt';
import { ITerminalAgt } from './terminalagt';
export interface IUserTerminalAgt {
    id: number;
    agtId: number;
    password?: number;
    user?: IUser;
    terminal?: ITerminal;
    agt?: IAgt;
    terminalAgt?: ITerminalAgt;
}
//# sourceMappingURL=userterminalagt.d.ts.map
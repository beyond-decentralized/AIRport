import { IUserTerminal } from './userterminal';
import { IUserTerminalAgt } from './userterminalagt';
export interface IUser {
    id: number;
    uuId?: string;
    username?: string;
    userTerminal?: IUserTerminal[];
    userTerminalAgts?: IUserTerminalAgt[];
}
//# sourceMappingURL=user.d.ts.map
import { ITerminalAgt } from './terminalagt';
import { IUserTerminalAgt } from './userterminalagt';
export interface IAgt {
    id: number;
    address?: string;
    terminalAgts?: ITerminalAgt[];
    userTerminalAgts?: IUserTerminalAgt[];
}
//# sourceMappingURL=agt.d.ts.map
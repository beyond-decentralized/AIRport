import { ITerminal } from './terminal';
import { IAgt } from './agt';
import { IUserTerminalAgt } from './userterminalagt';
export interface ITerminalAgt {
    terminal: ITerminal;
    agt: IAgt;
    password?: string;
    userTerminalAgts?: IUserTerminalAgt[];
}

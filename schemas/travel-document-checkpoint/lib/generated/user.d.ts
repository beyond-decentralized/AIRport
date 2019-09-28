import { IUserTerminal } from './userterminal';
import { IUserTerminalAgt } from './userterminalagt';
export interface IUser {
    id: number;
    uniqueId?: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    phone?: string;
    userTerminal?: IUserTerminal[];
    userTerminalAgts?: IUserTerminalAgt[];
}

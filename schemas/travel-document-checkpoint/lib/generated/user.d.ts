import { ICountry } from './country';
import { IUserTerminal } from './userterminal';
import { IUserTerminalAgt } from './userterminalagt';
export interface IUser {
    id: number;
    privateId?: string;
    publicId?: string;
    email?: string;
    username?: string;
    country?: ICountry;
    userTerminal?: IUserTerminal[];
    userTerminalAgts?: IUserTerminalAgt[];
}
//# sourceMappingURL=user.d.ts.map
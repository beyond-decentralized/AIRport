import { Country } from './Country';
import { UserTerminal } from './UserTerminal';
import { UserTerminalAgt } from './UserTerminalAgt';
export declare type UserId = number;
export declare type User_PrivateId = string;
export declare type User_PublicId = string;
export declare type User_Username = string;
export declare type User_Email = string;
export declare class User {
    id: UserId;
    privateId: User_PrivateId;
    publicId: User_PublicId;
    email: User_Username;
    username: User_Email;
    country: Country;
    userTerminal: UserTerminal[];
    userTerminalAgts: UserTerminalAgt[];
}
//# sourceMappingURL=User.d.ts.map
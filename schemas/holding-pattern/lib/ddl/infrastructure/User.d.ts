import { IUser } from "../../generated/infrastructure/quser";
import { UserTerminal } from './UserTerminal';
import { UserTerminalAgt } from './UserTerminalAgt';
export declare type UserId = number;
export declare type UserUniqueId = string;
export declare type UserFirstName = string;
export declare type UserLastName = string;
export declare type UserMiddleName = string;
export declare type UserPhone = string;
export declare class User implements IUser {
    id: UserId;
    uniqueId: UserUniqueId;
    firstName: UserFirstName;
    lastName: UserLastName;
    middleName: UserMiddleName;
    phone: UserPhone;
    userTerminal: UserTerminal[];
    userTerminalAgts: UserTerminalAgt[];
}

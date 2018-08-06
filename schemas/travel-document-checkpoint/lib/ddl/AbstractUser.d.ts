import { AbstractTerminal } from './AbstractTerminal';
export declare type UserId = number;
export declare type UserUniqueId = string;
export declare class AbstractUser<T extends AbstractTerminal<any>> {
    id: UserId;
    uniqueId: UserUniqueId;
    terminals: T[];
}

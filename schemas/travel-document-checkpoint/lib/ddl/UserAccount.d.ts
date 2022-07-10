import { Domain } from '@airport/airspace';
import { Country } from './locality/Country';
import { Continent } from './locality/Continent';
import { MetroArea } from './locality/MetroArea';
import { State } from './locality/State';
export declare type UserAccount_LocalId = number;
export declare type UserAccount_GUID = string;
export declare type UserAccount_Email = string;
export declare type UserAccount_PasswordHash = string;
export declare type UserAccount_UserAccountname = string;
export declare class UserAccount {
    _localId?: UserAccount_LocalId;
    email: UserAccount_Email;
    passwordHash?: UserAccount_PasswordHash;
    ranking?: number;
    username: UserAccount_UserAccountname;
    GUID?: UserAccount_GUID;
    domain?: Domain;
    continent?: Continent;
    country?: Country;
    state?: State;
    metroArea?: MetroArea;
}
//# sourceMappingURL=UserAccount.d.ts.map
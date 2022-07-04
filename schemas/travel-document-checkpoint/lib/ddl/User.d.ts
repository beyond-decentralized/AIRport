import { Domain } from '@airport/airspace';
import { Country } from './locality/Country';
import { Continent } from './locality/Continent';
import { MetroArea } from './locality/MetroArea';
import { State } from './locality/State';
export declare type User_LocalId = number;
export declare type User_GUID = string;
export declare type User_Email = string;
export declare type User_PasswordHash = string;
export declare type User_Username = string;
export declare class User {
    _localId?: User_LocalId;
    email: User_Email;
    passwordHash?: User_PasswordHash;
    ranking?: number;
    username: User_Username;
    GUID?: User_GUID;
    domain?: Domain;
    continent?: Continent;
    country?: Country;
    state?: State;
    metroArea?: MetroArea;
}
//# sourceMappingURL=User.d.ts.map
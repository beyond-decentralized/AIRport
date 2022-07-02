export declare type User_Id = number;
export declare type User_GUID = string;
export declare type User_Email = string;
export declare type User_PasswordHash = string;
export declare type User_Username = string;
export declare type User_Origin = string;
export declare type User_OriginId = string;
export declare class User {
    id?: User_Id;
    origin: User_Origin;
    originId: User_OriginId;
    email: User_Email;
    passwordHash?: User_PasswordHash;
    ranking?: number;
    username: User_Username;
    GUID?: User_GUID;
}
//# sourceMappingURL=User.d.ts.map
import { IUser } from "../generated/user";
import { UserDao } from "../dao/UserDao";
export declare enum AddUserErrorCodes {
    EMAIL_TAKEN = "EMAIL_TAKEN",
    INVALID_BIRTH_MONTH = "INVALID_BIRTH_MONTH",
    INVALID_COUNTRY = "INVALID_COUNTRY",
    INVALID_EMAIL = "INVALID_EMAIL",
    INVALID_USERNAME = "INVALID_USERNAME",
    USERNAME_TAKEN = "USERNAME_TAKEN"
}
export interface IAddUserResponse {
    errorCode?: AddUserErrorCodes;
    user?: IUser;
}
export declare class UserApi {
    userDao: UserDao;
    addUser(username: string, email: string): Promise<IAddUserResponse>;
    findUser(privateId: string): Promise<IUser>;
}
//# sourceMappingURL=UserApi.d.ts.map
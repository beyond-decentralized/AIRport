import { UserAccountDao } from "../dao/UserAccountDao";
import { UserAccount } from "../ddl/UserAccount";
export declare enum AddUserAccountErrorCodes {
    EMAIL_TAKEN = "EMAIL_TAKEN",
    INVALID_BIRTH_MONTH = "INVALID_BIRTH_MONTH",
    INVALID_COUNTRY = "INVALID_COUNTRY",
    INVALID_EMAIL = "INVALID_EMAIL",
    INVALID_USERNAME = "INVALID_USERNAME",
    USER_ACCOUNTNAME_TAKEN = "USER_ACCOUNTNAME_TAKEN"
}
export interface IAddUserAccountResponse {
    errorCode?: AddUserAccountErrorCodes;
    userAccount?: UserAccount;
}
export interface IUserAccountManager {
    addUserAccount(username: string, email: string, password: string): Promise<IAddUserAccountResponse>;
}
export declare class UserAccountManager {
    userAccountDao: UserAccountDao;
    addUserAccount(username: string, email: string, password: string): Promise<IAddUserAccountResponse>;
    private sha512;
}
//# sourceMappingURL=UserAccountManager.d.ts.map
import { IUserAccount } from '../../generated/userAccount';
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
    userAccount?: IUserAccount;
}
export declare class UserAccountApi {
    constructor();
    userAccountApi: UserAccountApi;
    addUserAccount(username: string, email: string): Promise<IAddUserAccountResponse>;
    findUserAccount(privateId: string): Promise<IUserAccount>;
}
//# sourceMappingURL=UserAccountApi.d.ts.map
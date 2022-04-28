import { IUser } from "../api-index";
import { IInterAppAPIClient } from "@airport/ground-control";
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
    interAppApiClient: IInterAppAPIClient;
    addUser(username: string, email: string): Promise<IAddUserResponse>;
    findUser(privateId: string): Promise<IUser>;
}
//# sourceMappingURL=UserApi.d.ts.map
import { DI } from "@airport/di";
import { USER_API } from "../api-tokens";
import { IUser } from "../api-index";

export enum AddUserErrorCodes {
    EMAIL_TAKEN = 'EMAIL_TAKEN',
    INVALID_BIRTH_MONTH = 'INVALID_BIRTH_MONTH',
    INVALID_COUNTRY = 'INVALID_COUNTRY',
    INVALID_EMAIL = 'INVALID_EMAIL',
    INVALID_USERNAME = 'INVALID_USERNAME',
    USERNAME_TAKEN = 'USERNAME_TAKEN'
}

export interface IAddUserResponse {
    errorCode?: AddUserErrorCodes
    user?: IUser
}

export class UserApi {

    async addUser(
        username: string,
        email: string,
    ): Promise<IAddUserResponse> {

        return null
    }

    async findUser(
        privateId: string
    ): Promise<IUser> {
        return null
    }
}
DI.set(USER_API, UserApi)
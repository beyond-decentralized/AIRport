import { IOC } from "@airport/direction-indicator"
import { IUser } from "../../generated/interfaces"
import { USER_API } from "../tokens"

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

export interface IUserApi {

    addUser(
        username: string,
        email: string,
    ): Promise<IAddUserResponse>

    findUser(
        privateId: string
    ): Promise<IUser>

}

export class UserApiClient {

    async addUser(
        username: string,
        email: string,
    ): Promise<IAddUserResponse> {
        const userApi = await IOC.get(USER_API)

        return await userApi.addUser(username, email)

    }

    async findUser(
        privateId: string
    ): Promise<IUser> {
        const userApi = await IOC.get(USER_API)

        return await userApi.findUser(privateId)
    }

}
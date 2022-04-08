import { container, DI } from "@airport/di";
import { USER_API } from "../api-tokens";
import { IUser } from "../api-index";
import { INTER_APP_API_CLIENT } from "@airport/ground-control";

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
        const interAppApiClient = await container(this).get(INTER_APP_API_CLIENT)

        return await interAppApiClient.invokeApiMethod(
            USER_API, 'addUser', [username, email])
    }

    async findUser(
        privateId: string
    ): Promise<IUser> {
        const interAppApiClient = await container(this).get(INTER_APP_API_CLIENT)

        return await interAppApiClient.invokeApiMethod(
            USER_API, 'findUser', [privateId])
    }

}
DI.set(USER_API, UserApi)
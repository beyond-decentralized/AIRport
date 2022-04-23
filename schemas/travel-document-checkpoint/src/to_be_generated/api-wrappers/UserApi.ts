import { DEPENDENCY_INJECTION } from "@airport/direction-indicator";
import { USER_API } from "../api-tokens";
import { IUser } from "../api-index";
import { IInterAppAPIClient } from "@airport/ground-control";

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

    interAppApiClient: IInterAppAPIClient

    async addUser(
        username: string,
        email: string,
    ): Promise<IAddUserResponse> {
        return await this.interAppApiClient.invokeApiMethod(
            USER_API, 'addUser', [username, email])
    }

    async findUser(
        privateId: string
    ): Promise<IUser> {
        return await this.interAppApiClient.invokeApiMethod(
            USER_API, 'findUser', [privateId])
    }

}
DEPENDENCY_INJECTION.set(USER_API, UserApi)
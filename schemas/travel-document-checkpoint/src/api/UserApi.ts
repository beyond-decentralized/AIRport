import { Api } from "@airport/check-in";
import { v4 as guidv4 } from "uuid";
import { IUser } from "../generated/user";
import { UserDao } from "../dao/UserDao";
import { Injected } from "@airport/direction-indicator";

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

@Injected()
export class UserApi {

    userDao: UserDao

    @Api()
    async addUser(
        username: string,
        email: string,
    ): Promise<IAddUserResponse> {
        const existingUsers = await this.userDao.findByUserNames([username])
        for (const existingUser of existingUsers) {
            if (existingUser.username === username) {
                return {
                    errorCode: AddUserErrorCodes.USERNAME_TAKEN
                }
            }
        }
        const user: IUser = {
            _localId: null,
            GUID: guidv4(),
            username
        }
        await this.userDao.save(user)

        return {
            user
        }
    }

    @Api()
    async findUser(
        privateId: string
    ): Promise<IUser> {
        const users = await this.userDao.findByGUIDs([privateId])

        if (users.length) {
            return users[0]
        }

        return null
    }

}

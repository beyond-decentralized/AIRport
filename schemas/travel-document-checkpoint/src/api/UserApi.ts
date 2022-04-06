import { Api } from "@airport/check-in";
import { DI } from "@airport/di";
import { v4 as uuidv4 } from "uuid";
import { USER_API } from "../to_be_generated/api-tokens";
import { IUser } from "../generated/generated";
import { UserDao } from "../dao/UserDao";

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

}

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
            id: null,
            uuId: uuidv4(),
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
        const users = await this.userDao.findByUuIds([privateId])

        if (users.length) {
            return users[0]
        }

        return null
    }

}
DI.set(USER_API, UserApi)

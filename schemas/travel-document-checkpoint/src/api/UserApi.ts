import { Api } from "@airport/check-in";
import { container, DI } from "@airport/di";
import { v4 as uuidv4 } from "uuid";
import { USER_API, USER_DAO } from "../tokens";
import { IUser } from "../generated/generated";

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

    @Api()
    async addUser(
        username: string,
        email: string,
    ): Promise<IAddUserResponse> {
        const userDao = await container(this).get(USER_DAO)
        const existingUsers = await userDao.findByEmailsOrUserNames([email], [username])
        for (const existingUser of existingUsers) {
            if (existingUser.email === email) {
                return {
                    errorCode: AddUserErrorCodes.EMAIL_TAKEN
                }
            } else if (existingUser.username === username) {
                return {
                    errorCode: AddUserErrorCodes.USERNAME_TAKEN
                }
            }
        }
        const user: IUser = {
            id: null,
            email,
            privateId: uuidv4(),
            publicId: uuidv4(),
            username
        }
        await userDao.save(user)

        return {
            user
        }
    }

    @Api()
    async findUser(
        privateId: string
    ): Promise<IUser> {
        const userDao = await container(this).get(USER_DAO)
        const users = await userDao.findByPrivateIds([privateId])

        if (users.length) {
            return users[0]
        }

        return null
    }

}
DI.set(USER_API, UserApi)

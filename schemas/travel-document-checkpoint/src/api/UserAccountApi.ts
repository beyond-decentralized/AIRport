import { Api } from "@airport/check-in";
import { v4 as guidv4 } from "uuid";
import { IUserAccount } from "../generated/userAccount";
import { UserAccountDao } from "../dao/UserAccountDao";
import { Injected } from "@airport/direction-indicator";

export enum AddUserAccountErrorCodes {
    EMAIL_TAKEN = 'EMAIL_TAKEN',
    INVALID_BIRTH_MONTH = 'INVALID_BIRTH_MONTH',
    INVALID_COUNTRY = 'INVALID_COUNTRY',
    INVALID_EMAIL = 'INVALID_EMAIL',
    INVALID_USERNAME = 'INVALID_USERNAME',
    USER_ACCOUNTNAME_TAKEN = 'USER_ACCOUNTNAME_TAKEN'
}

export interface IAddUserAccountResponse {
    errorCode?: AddUserAccountErrorCodes
    userAccount?: IUserAccount
}

@Injected()
export class UserAccountApi {

    userAccountDao: UserAccountDao

    @Api()
    async addUserAccount(
        username: string,
        email: string,
    ): Promise<IAddUserAccountResponse> {
        const existingUserAccounts = await this.userAccountDao.findByUserAccountNames([username])
        for (const existingUserAccount of existingUserAccounts) {
            if (existingUserAccount.username === username) {
                return {
                    errorCode: AddUserAccountErrorCodes.USER_ACCOUNTNAME_TAKEN
                }
            }
        }
        const userAccount: IUserAccount = {
            _localId: null,
            GUID: guidv4(),
            username
        }
        await this.userAccountDao.save(userAccount)

        return {
            userAccount
        }
    }

    @Api()
    async findUserAccount(
        privateId: string
    ): Promise<IUserAccount> {
        const userAccounts = await this.userAccountDao.findByGUIDs([privateId])

        if (userAccounts.length) {
            return userAccounts[0]
        }

        return null
    }

}

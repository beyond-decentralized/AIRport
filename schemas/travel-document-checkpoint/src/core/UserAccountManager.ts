import { IContext, Inject, Injected } from "@airport/direction-indicator";
import { v4 as guidv4 } from "uuid";
import { UserAccountDao } from "../dao/UserAccountDao";
import { UserAccount } from "../ddl/UserAccount";


export enum AddUserAccountErrorCodes {
    INVALID_BIRTH_MONTH = 'INVALID_BIRTH_MONTH',
    INVALID_COUNTRY = 'INVALID_COUNTRY',
    INVALID_EMAIL = 'INVALID_EMAIL',
    INVALID_USERNAME = 'INVALID_USERNAME'
}

export interface IAddUserAccountResponse {
    errorCode?: AddUserAccountErrorCodes
    userAccount?: UserAccount
}

export interface IUserAccountManager {

    addUserAccount(
        username: string,
        email: string,
        publicMetaSigningKey: string,
        context: IContext
    ): Promise<IAddUserAccountResponse>

}

@Injected()
export class UserAccountManager {

    @Inject()
    userAccountDao: UserAccountDao

    async addUserAccount(
        username: string,
        email: string,
        publicMetaSigningKey: string,
        context: IContext
    ): Promise<IAddUserAccountResponse> {
        const userAccount: UserAccount = {
            email,
            GUID: guidv4(),
            publicMetaSigningKey,
            username
        }

        await this.userAccountDao.save(userAccount, context)

        return {
            userAccount
        }
    }

}

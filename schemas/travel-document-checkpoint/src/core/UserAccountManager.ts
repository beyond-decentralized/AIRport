import { UserAccount_PublicSigningKey, UserAccount_Username } from "@airport/aviation-communication";
import { IContext, Inject, Injected } from "@airport/direction-indicator";
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
        publicMetaSigningKey: string,
        context: IContext
    ): Promise<IAddUserAccountResponse>

}

@Injected()
export class UserAccountManager {

    @Inject()
    userAccountDao: UserAccountDao

    async addUserAccount(
        username: UserAccount_Username,
        accountPublicSigningKey: UserAccount_PublicSigningKey,
        context: IContext
    ): Promise<IAddUserAccountResponse> {
        const userAccount: UserAccount = {
            _localId: null,
            accountPublicSigningKey,
            username
        }

        await this.userAccountDao.insert([userAccount], context)

        return {
            userAccount
        }
    }

}

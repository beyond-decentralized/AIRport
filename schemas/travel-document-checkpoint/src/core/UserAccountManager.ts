import { UserAccount_PublicSigningKey, UserAccount_Sha1sum, UserAccount_Username } from "@airport/aviation-communication";
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
        sha1sum: UserAccount_Sha1sum,
        context: IContext
    ): Promise<IAddUserAccountResponse>

}

@Injected()
export class UserAccountManager
    implements IUserAccountManager {

    @Inject()
    userAccountDao: UserAccountDao

    async addUserAccount(
        username: UserAccount_Username,
        accountPublicSigningKey: UserAccount_PublicSigningKey,
        sha1sum: UserAccount_Sha1sum,
        context: IContext
    ): Promise<IAddUserAccountResponse> {
        const userAccount: UserAccount = {
            _localId: null,
            accountPublicSigningKey,
            sha1sum,
            username
        }

        await this.userAccountDao.insert([userAccount], context)

        return {
            userAccount
        }
    }

}

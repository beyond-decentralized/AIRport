import { Inject, Injected } from "@airport/direction-indicator";
import { v4 as guidv4 } from "uuid";
import { UserAccountDao } from "../dao/UserAccountDao";
import { UserAccount } from "../ddl/UserAccount";


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
    userAccount?: UserAccount
}

export interface IUserAccountManager {

    addUserAccount(
        username: string,
        email: string,
        password: string
    ): Promise<IAddUserAccountResponse>

}

@Injected()
export class UserAccountManager {

    @Inject()
    userAccountDao: UserAccountDao

    async addUserAccount(
        username: string,
        email: string,
        password: string
    ): Promise<IAddUserAccountResponse> {
        const existingUserAccounts = await this.userAccountDao.findByUserAccountNames([username])
        for (const existingUserAccount of existingUserAccounts) {
            if (existingUserAccount.username === username) {
                return {
                    errorCode: AddUserAccountErrorCodes.USER_ACCOUNTNAME_TAKEN
                }
            }
        }
        const passwordHash = await this.sha512(password)
        const userAccount: UserAccount = {
            email,
            GUID: guidv4(),
            passwordHash,
            username
        }
        await this.userAccountDao.save(userAccount)

        return {
            userAccount
        }
    }

    private sha512(str): Promise<string> {
        return crypto.subtle.digest("SHA-512", new TextEncoder(/*"utf-8"*/).encode(str)).then(buf => {
            return Array.prototype.map.call(new Uint8Array(buf), x => (('00' + x.toString(16)).slice(-2))).join('');
        });
    }

}

import {
	USER_ACCOUNT_API,
} from '../../to_be_generated/common-tokens';
import {
	DEPENDENCY_INJECTION,
	Inject,
	Injected,
} from '@airport/direction-indicator';
import {
	Api,
} from '@airport/check-in';
import {
	v4 as guidv4,
} from 'uuid';
import {
	IUserAccount,
} from '../../generated/userAccount';
import {
	UserAccountDao,
} from '../../dao/UserAccountDao';


export enum AddUserAccountErrorCodes {
    EMAIL_TAKEN = 'EMAIL_TAKEN',
    INVALID_BIRTH_MONTH = 'INVALID_BIRTH_MONTH',
    INVALID_COUNTRY = 'INVALID_COUNTRY',
    INVALID_EMAIL = 'INVALID_EMAIL',
    INVALID_USERNAME = 'INVALID_USERNAME',
    USER_ACCOUNTNAME_TAKEN = 'USER_ACCOUNTNAME_TAKEN'
}
export interface IAddUserAccountResponse {
    errorCode?: AddUserAccountErrorCodes;
    userAccount?: IUserAccount;
}

// An API stub for other Applications and UIs to use
@Injected()
export class UserAccountApi {

    constructor() {
        DEPENDENCY_INJECTION.db().manualInject(this, USER_ACCOUNT_API)
    }
        
    @Inject()
    userAccountApi: UserAccountApi
            
    async  addUserAccount(
        username: string,
        email: string
    ): Promise<IAddUserAccountResponse> {
        return await this.userAccountApi.addUserAccount(
            username,
            email
        )
    }

    async  findUserAccount(
        privateId: string
    ): Promise<IUserAccount> {
        return await this.userAccountApi.findUserAccount(privateId)
    }

}

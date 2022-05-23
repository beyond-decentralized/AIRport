import {
	USER_API,
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
	v4 as uuidv4,
} from 'uuid';
import {
	IUser,
} from '../../generated/user';
import {
	UserDao,
} from '../../dao/UserDao';


export enum AddUserErrorCodes {
    EMAIL_TAKEN = 'EMAIL_TAKEN',
    INVALID_BIRTH_MONTH = 'INVALID_BIRTH_MONTH',
    INVALID_COUNTRY = 'INVALID_COUNTRY',
    INVALID_EMAIL = 'INVALID_EMAIL',
    INVALID_USERNAME = 'INVALID_USERNAME',
    USERNAME_TAKEN = 'USERNAME_TAKEN'
}
export interface IAddUserResponse {
    errorCode?: AddUserErrorCodes;
    user?: IUser;
}
export interface IUserApi {
    addUser(username: string, email: string): Promise<IAddUserResponse>;
    findUser(privateId: string): Promise<IUser>;
}

// An API stub for other Applications and UIs to use
@Injected()
export class UserApi {

    constructor() {
        DEPENDENCY_INJECTION.db().manualInject(this, USER_API)
    }
        
    @Inject()
    userApi: UserApi
            
    async  addUser(
        username: string,
        email: string
    ): Promise<IAddUserResponse> {
        return await this.userApi.addUser(
            username,
            email
        )
    }

    async  findUser(
        privateId: string
    ): Promise<IUser> {
        return await this.userApi.findUser(privateId)
    }

}

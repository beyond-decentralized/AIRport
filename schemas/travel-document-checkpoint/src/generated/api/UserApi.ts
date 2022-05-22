import {
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
import { IAddUserResponse } from '../../api/UserApi';


// An API stub for other Applications and UIs to use
@Injected()
export class UserApi {

    @Inject()
    userApi: UserApi

    async addUser(
        username: string,
        email: string
    ): Promise<IAddUserResponse> {
        return await this.userApi.addUser(
            username,
            email
        )
    }

    async findUser(
        privateId: string
    ): Promise<IUser> {
        return await this.userApi.findUser(privateId)
    }

}

import { IUser } from '../../generated/user';
import { IAddUserResponse } from '../../api/UserApi';
export declare class UserApi {
    userApi: UserApi;
    addUser(username: string, email: string): Promise<IAddUserResponse>;
    findUser(privateId: string): Promise<IUser>;
}
//# sourceMappingURL=UserApi.d.ts.map
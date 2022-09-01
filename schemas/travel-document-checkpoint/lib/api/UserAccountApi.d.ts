import { IUserAccount } from "../generated/userAccount";
import { UserAccountDao } from "../dao/UserAccountDao";
export declare class UserAccountApi {
    userAccountDao: UserAccountDao;
    findUserAccount(privateId: string): Promise<IUserAccount>;
}
//# sourceMappingURL=UserAccountApi.d.ts.map
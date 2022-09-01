import { Api } from "@airport/check-in";
import { IUserAccount } from "../generated/userAccount";
import { UserAccountDao } from "../dao/UserAccountDao";
import { Inject, Injected } from "@airport/direction-indicator";

@Injected()
export class UserAccountApi {

    @Inject()
    userAccountDao: UserAccountDao

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

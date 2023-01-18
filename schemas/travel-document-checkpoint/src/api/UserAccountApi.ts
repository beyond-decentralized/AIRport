import { Api } from "@airport/check-in";
import { UserAccountDao } from "../dao/UserAccountDao";
import { Inject, Injected } from "@airport/direction-indicator";
import { IUserAccount } from "@airport/aviation-communication";

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

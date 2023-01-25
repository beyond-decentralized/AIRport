import { Api } from "@airport/check-in";
import { UserAccountDao } from "../dao/UserAccountDao";
import { Inject, Injected } from "@airport/direction-indicator";
import { IUserAccount } from "@airport/ground-control";
import { UserAccount_PublicSigningKey } from "@airport/aviation-communication";

@Injected()
export class UserAccountApi {

    @Inject()
    userAccountDao: UserAccountDao

    @Api()
    async findUserAccount(
        accountPublicSingingKey: UserAccount_PublicSigningKey
    ): Promise<IUserAccount> {


        const userAccounts = await this.userAccountDao.findByAccountPublicSingingKeys([accountPublicSingingKey])

        if (userAccounts.length) {
            return userAccounts[0]
        }

        return null
    }

}

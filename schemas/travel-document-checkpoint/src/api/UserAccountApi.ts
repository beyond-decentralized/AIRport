import { UserAccountDao } from "../dao/UserAccountDao";
import { Inject, Injected } from "@airport/direction-indicator";
import { IUserAccount } from "@airport/ground-control";
import { UserAccount_PublicSigningKey } from "@airport/aviation-communication";
import { Api } from "@airport/air-traffic-control";

@Injected()
export class UserAccountApi {

    @Inject()
    userAccountDao: UserAccountDao

    @Api()
    async findUserAccount(
        accountPublicSingingKey: UserAccount_PublicSigningKey
    ): Promise<IUserAccount> {

        const userAccounts = await this.userAccountDao.findByAccountPublicSingingKeys(
            [accountPublicSingingKey],
            arguments[1])

        if (userAccounts.length) {
            return userAccounts[0]
        }

        return null
    }

}

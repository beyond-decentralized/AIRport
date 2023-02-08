import { Api } from "@airport/air-traffic-control";
import { Inject, Injected } from "@airport/direction-indicator";
import { ITerminalSessionManager } from "@airport/terminal-map";
import { UserAccount } from "@airport/travel-document-checkpoint/dist/app/bundle";

@Injected()
export class SessionStateApi {

    @Inject()
    terminalSessionManager: ITerminalSessionManager

    @Api()
    async getLoggedInUser(): Promise<UserAccount> {
        const userAccount = await this.terminalSessionManager.getUserAccountFromSession()

        return {
            _localId: null,
            username: userAccount.username,
            accountPublicSigningKey: userAccount.accountPublicSigningKey
        }
    }

}

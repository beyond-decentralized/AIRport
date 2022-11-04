import { Api } from "@airport/check-in";
import { Inject, Injected } from "@airport/direction-indicator";
import { ITerminalSessionManager } from "@airport/terminal-map";
import { UserAccount } from "@airport/travel-document-checkpoint";

@Injected()
export class SessionStateApi {

    @Inject()
    terminalSessionManager: ITerminalSessionManager

    @Api()
    async getLoggedInUser(): Promise<UserAccount> {
        const userSession = await this.terminalSessionManager.getUserSession()
        const userAccount = userSession.userAccount

        return {
            email: userAccount.email,
            username: userAccount.username,
            GUID: userAccount.GUID
        }
    }

}

import { Inject, Injected } from '@airport/direction-indicator';
import { IUserAccount } from '@airport/ground-control';
import { ITerminalSessionManager, IUserSession, TerminalStore, UserStore } from '@airport/terminal-map'

@Injected()
export class TerminalSessionManager
    implements ITerminalSessionManager {

    @Inject()
    terminalStore: TerminalStore

    @Inject()
    userStore: UserStore

    async getUserSession(): Promise<IUserSession> {
        let session: IUserSession
        if (this.terminalStore.getIsServer()) {
            throw new Error(`Implement`)
        } else {
            const allSessions = this.userStore.getAllSessions()
            if (allSessions.length != 1) {
                throw new Error(`No User Session found`)
            }
            session = allSessions[0]
        }

        return session
    }

    async getUserAccountFromSession(): Promise<IUserAccount> {
        const userSession = await this.getUserSession()
        const userAccount = userSession.userAccount
        if (!userAccount) {
            throw new Error(`No UserAccount found in User Session`)
        }

        return userAccount
    }

}
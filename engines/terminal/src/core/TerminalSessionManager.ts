import { Inject, Injected } from '@airport/direction-indicator';
import { ITerminalSessionManager, IUserSession, TerminalStore, UserState, UserStore } from '@airport/terminal-map'
import { UserAccount } from '@airport/travel-document-checkpoint';

@Injected()
export class TerminalSessionManager
    implements ITerminalSessionManager {

    @Inject()
    terminalStore: TerminalStore

    @Inject()
    userStore: UserStore

    async signUp(
        userAccount: UserAccount
    ): Promise<void> {
        const allSessions = this.userStore.getAllSessions()
        let session: IUserSession = {
            currentActor: null,
            userAccount
        }
        allSessions.push(session)

        const sessionMapByEmail = this.userStore.getSessionMapByEmail()
        sessionMapByEmail.set(userAccount.email, session)

        this.userStore.state.next({
            allSessions,
            sessionMapByEmail
        })
    }

    async login(
        userAccount: UserAccount
    ): Promise<void> {
        throw new Error(`Implement`);
    }

    async getUserSession(
        // FIXME: add the actual request object, may be platform specific
        requestObject?: any
    ): Promise<IUserSession> {
        let session: IUserSession
        if (this.terminalStore.getIsServer()) {
            throw new Error(`Implement`)
        } else {
            const allSessions = this.userStore.getAllSessions()
            if (allSessions.length != 1) {
                throw new Error(`Expecting exactly 1 user session`)
            }
            session = allSessions[0]
        }

        return session
    }

}
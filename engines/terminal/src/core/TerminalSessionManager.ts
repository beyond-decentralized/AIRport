import { Inject, Injected } from '@airport/direction-indicator';
import { ITerminalSessionManager, IUserAccountInfo, IUserSession, TerminalStore, UserStore } from '@airport/terminal-map'
import { IUserAccountManager } from '@airport/travel-document-checkpoint/dist/app/bundle';
import { SessionStateApi } from '@airport/session-state/dist/app/bundle'

@Injected()
export class TerminalSessionManager
    implements ITerminalSessionManager {

    @Inject()
    terminalStore: TerminalStore

    @Inject()
    userAccountManager: IUserAccountManager

    @Inject()
    userStore: UserStore

    @Inject()
    sessionStateApi: SessionStateApi

    async signUp(
        userAccountInfo: IUserAccountInfo
    ): Promise<void> {
        if (this.terminalStore.getIsServer()) {
            throw new Error('Implement');
        }
        const { userAccount } = await this.userAccountManager
            .addUserAccount(userAccountInfo.username, userAccountInfo.email,
                userAccountInfo.password)

        const allSessions = this.userStore.getAllSessions()
        let session: IUserSession = {
            currentActor: null,
            currentRootTransaction: null,
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
        userAccount: IUserAccountInfo
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
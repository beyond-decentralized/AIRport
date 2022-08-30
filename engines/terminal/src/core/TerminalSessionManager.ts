import { Inject, Injected } from '@airport/direction-indicator';
import { ITerminalSessionManager, IUserAccountInfo, IUserSession, TerminalStore, UserStore } from '@airport/terminal-map'
import { UserAccount } from '@airport/travel-document-checkpoint';
import { UserAccountDao } from '@airport/travel-document-checkpoint/lib/dao/UserAccountDao';

@Injected()
export class TerminalSessionManager
    implements ITerminalSessionManager {

    @Inject()
    terminalStore: TerminalStore

    @Inject()
    userAccountDao: UserAccountDao

    @Inject()
    userStore: UserStore

    async signUp(
        userAccountInfo: IUserAccountInfo
    ): Promise<void> {
        if (this.terminalStore.getIsServer()) {
            throw new Error('Implement');
        }
        const passwordHash = await this.sha512(userAccountInfo.password)
        let userAccount: UserAccount = {
            email: userAccountInfo.email,
            passwordHash,
            username: userAccountInfo.username
        }
        await this.userAccountDao.save(userAccount)

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

    private sha512(str): Promise<string> {
        return crypto.subtle.digest("SHA-512", new TextEncoder(/*"utf-8"*/).encode(str)).then(buf => {
            return Array.prototype.map.call(new Uint8Array(buf), x => (('00' + x.toString(16)).slice(-2))).join('');
        });
    }

}
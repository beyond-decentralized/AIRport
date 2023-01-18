import { IContext, Inject, Injected } from '@airport/direction-indicator';
import { ITerminalSessionManager, IUserSession, TerminalStore, UserStore } from '@airport/terminal-map'

@Injected()
export class TerminalSessionManager
    implements ITerminalSessionManager {

    @Inject()
    terminalStore: TerminalStore

    @Inject()
    userStore: UserStore

    async getUserSession(
        // FIXME: add the actual request object, may be platform specific
        context?: IContext
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
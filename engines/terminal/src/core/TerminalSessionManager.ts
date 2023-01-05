import { IContext, Inject, Injected } from '@airport/direction-indicator';
import { ITerminalSessionManager, IUserAccountInfo, IUserSession, TerminalStore, UserStore } from '@airport/terminal-map'
import { IUserAccountManager } from '@airport/travel-document-checkpoint/dist/app/bundle';
import { SessionStateApi } from '@airport/session-state/dist/app/bundle'
import { IKeyRingManager } from '@airbridge/keyring/dist/app/bundle';
import { IKeyUtils } from '@airport/ground-control';
import { TransactionManager } from '../orchestration/TransactionManager';

@Injected()
export class TerminalSessionManager
    implements ITerminalSessionManager {

    @Inject()
    keyRingManager: IKeyRingManager

    @Inject()
    keyUtils: IKeyUtils

    @Inject()
    sessionStateApi: SessionStateApi

    @Inject()
    terminalStore: TerminalStore

    @Inject()
    transactionManager: TransactionManager

    @Inject()
    userAccountManager: IUserAccountManager

    @Inject()
    userStore: UserStore

    async signUp(
        userAccountInfo: IUserAccountInfo,
        context: IContext
    ): Promise<void> {
        if (this.terminalStore.getIsServer()) {
            throw new Error('Implement');
        }

        const allSessions = this.userStore.getAllSessions()
        let session: IUserSession = {
            currentRootTransaction: null,
            currentTransaction: null,
            keyRing: null,
            userAccount: null
        }
        allSessions.push(session)

        await this.transactionManager.transactInternal(async (
            _transaction,
            context
        ) => {
            const signingKey = await this.keyUtils.getSigningKey(521)

            const { userAccount } = await this.userAccountManager
                .addUserAccount(userAccountInfo.username, userAccountInfo.email,
                    signingKey.public, context)
            session.userAccount = userAccount

            // TODO: replace with passed in key
            const userPrivateKey = await this.keyUtils.getEncryptionKey()

            const keyRing = await this.keyRingManager.getKeyRing(
                userPrivateKey, signingKey.private, context)

            session.keyRing = keyRing

            const sessionMapByEmail = this.userStore.getSessionMapByEmail()
            sessionMapByEmail.set(userAccount.email, session)

            this.userStore.state.next({
                allSessions,
                sessionMapByEmail
            })
        }, null, context as any)
    }

    async login(
        userAccount: IUserAccountInfo
    ): Promise<void> {
        throw new Error(`Implement`);
    }

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
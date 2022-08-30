import { ITerminalSessionManager, IUserAccountInfo, IUserSession, TerminalStore, UserStore } from '@airport/terminal-map';
import { UserAccountDao } from '@airport/travel-document-checkpoint/lib/dao/UserAccountDao';
export declare class TerminalSessionManager implements ITerminalSessionManager {
    terminalStore: TerminalStore;
    userAccountDao: UserAccountDao;
    userStore: UserStore;
    signUp(userAccountInfo: IUserAccountInfo): Promise<void>;
    login(userAccount: IUserAccountInfo): Promise<void>;
    getUserSession(requestObject?: any): Promise<IUserSession>;
    private sha512;
}
//# sourceMappingURL=TerminalSessionManager.d.ts.map
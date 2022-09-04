import { ITerminalSessionManager, IUserAccountInfo, IUserSession, TerminalStore, UserStore } from '@airport/terminal-map';
import { IUserAccountManager } from '@airport/travel-document-checkpoint/dist/app/bundle';
export declare class TerminalSessionManager implements ITerminalSessionManager {
    terminalStore: TerminalStore;
    userAccountManager: IUserAccountManager;
    userStore: UserStore;
    signUp(userAccountInfo: IUserAccountInfo): Promise<void>;
    login(userAccount: IUserAccountInfo): Promise<void>;
    getUserSession(requestObject?: any): Promise<IUserSession>;
}
//# sourceMappingURL=TerminalSessionManager.d.ts.map
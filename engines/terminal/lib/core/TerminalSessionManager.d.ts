import { ITerminalSessionManager, IUserSession, TerminalStore, UserStore } from '@airport/terminal-map';
import { UserAccount } from '@airport/travel-document-checkpoint';
export declare class TerminalSessionManager implements ITerminalSessionManager {
    terminalStore: TerminalStore;
    userStore: UserStore;
    signUp(userAccount: UserAccount): Promise<void>;
    login(userAccount: UserAccount): Promise<void>;
    getUserSession(requestObject?: any): Promise<IUserSession>;
}
//# sourceMappingURL=TerminalSessionManager.d.ts.map
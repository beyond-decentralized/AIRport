import { UserAccount } from "@airport/travel-document-checkpoint";
import { IUserSession } from "../store/user/UserState";
export interface ITerminalSessionManager {
    signUp(userAccount: UserAccount): Promise<void>;
    login(userAccount: UserAccount): Promise<void>;
    getUserSession(requestObject?: any): Promise<IUserSession>;
}
//# sourceMappingURL=ITerminalSessionManager.d.ts.map
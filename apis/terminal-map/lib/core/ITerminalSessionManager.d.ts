import { IUserSession } from "../store/user/UserState";
export interface IUserAccountInfo {
    email?: string;
    password?: string;
    username?: string;
}
export interface ITerminalSessionManager {
    signUp(userAccount: IUserAccountInfo): Promise<void>;
    login(userAccount: IUserAccountInfo): Promise<void>;
    getUserSession(requestObject?: any): Promise<IUserSession>;
}
//# sourceMappingURL=ITerminalSessionManager.d.ts.map
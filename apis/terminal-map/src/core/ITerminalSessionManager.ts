import { IUserSession } from "../store/user/UserState";

export interface IUserAccountInfo {
    email?: string
    password?: string
    username?: string
}

export interface ITerminalSessionManager {

    signUp(
        userAccount: IUserAccountInfo
    ): Promise<void>

    login(
        userAccount: IUserAccountInfo
    ): Promise<void>

    getUserSession(
        // FIXME: add the actual request object, may be platform specific
        requestObject?: any
    ): Promise<IUserSession>

}

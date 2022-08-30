import { UserAccount } from "@airport/travel-document-checkpoint";
import { IUserSession } from "../store/user/UserState";

export interface ITerminalSessionManager {

    signUp(
        userAccount: UserAccount
    ): Promise<void>

    login(
        userAccount: UserAccount
    ): Promise<void>

    getUserSession(
        // FIXME: add the actual request object, may be platform specific
        requestObject?: any
    ): Promise<IUserSession>

}

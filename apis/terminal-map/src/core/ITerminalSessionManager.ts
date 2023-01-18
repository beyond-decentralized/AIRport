import { IContext } from "@airport/direction-indicator";
import { IUserSession } from "../store/user/UserState";

export interface IUserAccountInfo {
    email?: string
    password?: string
    username?: string
}

export interface ITerminalSessionManager {

    getUserSession(
        // FIXME: in multi-user setting check the request object, may be platform specific
        context: IContext
    ): Promise<IUserSession>

}

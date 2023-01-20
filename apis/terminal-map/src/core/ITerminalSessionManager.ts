import { IUserAccount } from "@airport/ground-control";
import { IUserSession } from "../store/user/UserState";

export interface IUserAccountInfo {
    email?: string
    password?: string
    username?: string
}

export interface ITerminalSessionManager {

    getUserSession(): Promise<IUserSession>

    getUserAccountFromSession(): Promise<IUserAccount>

}

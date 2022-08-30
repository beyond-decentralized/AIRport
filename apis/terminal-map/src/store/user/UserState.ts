import { Injected } from "@airport/direction-indicator"
import { Actor } from "@airport/holding-pattern"
import { UserAccount } from "@airport/travel-document-checkpoint"
import { Subject } from "rxjs"
import { internalUserState } from "./theUserState"

export interface IUserSession {
    currentActor: Actor
    userAccount: UserAccount
}

export interface IUserState {
    allSessions: IUserSession[],
    sessionMapByEmail: Map<string, IUserSession>
}

export interface IUserStateContainer {
    userState: Subject<IUserState>
}

@Injected()
export class UserState
    implements IUserStateContainer {
        userState = internalUserState
}

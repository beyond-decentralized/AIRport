import { Injected } from "@airport/direction-indicator"
import { IRootTransaction } from "@airport/ground-control"
import { Actor } from "@airport/holding-pattern/dist/app/bundle"
import { UserAccount } from "@airport/travel-document-checkpoint/dist/app/bundle"
import { Subject } from "rxjs"
import { internalUserState } from "./theUserState"

export interface IUserSession {
    currentActor: Actor
    userAccount: UserAccount
    currentRootTransaction: IRootTransaction
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

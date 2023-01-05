import { IKeyRing } from "@airbridge/data-model"
import { Injected } from "@airport/direction-indicator"
import { IRootTransaction } from "@airport/ground-control"
import { UserAccount } from "@airport/travel-document-checkpoint/dist/app/bundle"
import { Subject } from "rxjs"
import { ITransaction } from "../../transaction/ITransaction"
import { internalUserState } from "./theUserState"

export interface IUserSession {
    currentRootTransaction: IRootTransaction
    currentTransaction: ITransaction
    keyRing: IKeyRing
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

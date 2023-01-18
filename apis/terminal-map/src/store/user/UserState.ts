import { IKeyRing } from "@airbridge/data-model"
import { Injected } from "@airport/direction-indicator"
import { IRootTransaction, IUserAccount } from "@airport/ground-control"
import { Subject } from "rxjs"
import { ITransaction } from "../../transaction/ITransaction"
import { internalUserState } from "./theUserState"

export interface IUserSession {
    currentRootTransaction: IRootTransaction
    currentTransaction: ITransaction
    keyRing: IKeyRing
    userAccount: IUserAccount
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

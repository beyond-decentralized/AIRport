import { IKeyRing } from "@airbridge/data-model"
import { UserAccount_PublicSigningKey } from "@airport/aviation-communication"
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
    sessionMapByAccountPublicSigningKey: Map<UserAccount_PublicSigningKey, IUserSession>
}

export interface IUserStateContainer {
    userState: Subject<IUserState>
}

@Injected()
export class UserState
    implements IUserStateContainer {
    userState = internalUserState
}

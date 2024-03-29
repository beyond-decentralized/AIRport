import { UserAccount_PublicSigningKey } from "@airport/aviation-communication";
import { Inject, Injected } from "@airport/direction-indicator";
import { Subject } from "rxjs";
import { IMemoizedSelector, ISelectorManager } from "../SelectorManager";
import { IUserSession, IUserState, IUserStateContainer } from "./UserState";

export interface IUserStore {

    state: Subject<IUserState>

    getAllSessions: IMemoizedSelector<IUserSession[], IUserState>

    getSessionMapByAccountPublicSigningKey:
    IMemoizedSelector<Map<UserAccount_PublicSigningKey, IUserSession>, IUserState>

}

@Injected()
export class UserStore
    implements IUserStore {

    @Inject()
    selectorManager: ISelectorManager

    @Inject()
    userState: IUserStateContainer

    get state(): Subject<IUserState> {
        return this.userState.userState
    }

    getAllSessions: IMemoizedSelector<IUserSession[], IUserState>

    getSessionMapByAccountPublicSigningKey: IMemoizedSelector<Map<string, IUserSession>, IUserState>

    getUserState: IMemoizedSelector<IUserState, IUserState>

    async init(): Promise<void> {
        this.getUserState = this.selectorManager.createRootSelector(this.state);
        this.getAllSessions = this.selectorManager.createSelector(this.getUserState,
            userState => userState.allSessions)
        this.getSessionMapByAccountPublicSigningKey = this.selectorManager.createSelector(this.getUserState,
            userState => userState.sessionMapByAccountPublicSigningKey)
    }

}
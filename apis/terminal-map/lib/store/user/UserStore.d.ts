import { IMemoizedSelector, ISelectorManager } from "@airport/apron";
import { Subject } from "rxjs";
import { IUserSession, IUserState, IUserStateContainer } from "./UserState";
export interface IUserStore {
    state: Subject<IUserState>;
    getAllSessions: IMemoizedSelector<IUserSession[], IUserState>;
    getSessionMapByEmail: IMemoizedSelector<Map<string, IUserSession>, IUserState>;
}
export declare class UserStore implements IUserStore {
    selectorManager: ISelectorManager;
    userState: IUserStateContainer;
    get state(): Subject<IUserState>;
    getAllSessions: IMemoizedSelector<IUserSession[], IUserState>;
    getSessionMapByEmail: IMemoizedSelector<Map<string, IUserSession>, IUserState>;
    getUserState: IMemoizedSelector<IUserState, IUserState>;
    init(): Promise<void>;
}
//# sourceMappingURL=UserStore.d.ts.map
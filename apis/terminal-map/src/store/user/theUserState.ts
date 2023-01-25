import { BehaviorSubject, Subject } from "rxjs";
import { IUserState } from "./UserState";

export const internalUserState: Subject<IUserState> = new BehaviorSubject({
    allSessions: [],
    sessionMapByAccountPublicSigningKey: new Map()
})

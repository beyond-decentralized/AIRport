import { BehaviorSubject } from "rxjs";
export const internalUserState = new BehaviorSubject({
    allSessions: [],
    sessionMapByEmail: new Map()
});
//# sourceMappingURL=theUserState.js.map
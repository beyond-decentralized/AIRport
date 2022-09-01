import { IRootTransaction } from "@airport/ground-control";
import { Actor } from "@airport/holding-pattern";
import { UserAccount } from "@airport/travel-document-checkpoint";
import { Subject } from "rxjs";
export interface IUserSession {
    currentActor: Actor;
    userAccount: UserAccount;
    currentRootTransaction: IRootTransaction;
}
export interface IUserState {
    allSessions: IUserSession[];
    sessionMapByEmail: Map<string, IUserSession>;
}
export interface IUserStateContainer {
    userState: Subject<IUserState>;
}
export declare class UserState implements IUserStateContainer {
    userState: Subject<IUserState>;
}
//# sourceMappingURL=UserState.d.ts.map
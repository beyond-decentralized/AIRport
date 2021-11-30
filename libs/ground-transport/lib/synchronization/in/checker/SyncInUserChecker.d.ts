import { TerminalMessage } from '@airport/arrivals-n-departures';
import { IUser, UserId, User_UuId } from '@airport/travel-document-checkpoint';
import { IDataToTM } from '../SyncInUtils';
export interface UserCheckResults {
    map: Map<User_UuId, IUser>;
    mapById: Map<UserId, IUser>;
    mapByMessageIndexAndRemoteUserId: Map<UserId, IUser>[];
    consistentMessages: IDataToTM[];
    inconsistentMessages: IDataToTM[];
}
export interface ISyncInUserChecker {
    ensureUsers(message: TerminalMessage): Promise<boolean>;
}
export declare class SyncInUserChecker implements ISyncInUserChecker {
    ensureUsers(message: TerminalMessage): Promise<boolean>;
    private addMissingUsers;
}
//# sourceMappingURL=SyncInUserChecker.d.ts.map
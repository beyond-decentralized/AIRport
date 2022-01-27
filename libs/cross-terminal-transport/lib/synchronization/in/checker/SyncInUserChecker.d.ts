import { IUser, UserId, User_PrivateId } from '@airport/travel-document-checkpoint';
import { IDataToTM } from '../SyncInUtils';
export interface UserCheckResults {
    map: Map<User_PrivateId, IUser>;
    mapById: Map<UserId, IUser>;
    mapByMessageIndexAndRemoteUserId: Map<UserId, IUser>[];
    consistentMessages: IDataToTM[];
    inconsistentMessages: IDataToTM[];
}
export interface ISyncInUserChecker {
    ensureUsersAndGetAsMaps(dataMessages: IDataToTM[]): Promise<UserCheckResults>;
}
export declare class SyncInUserChecker implements ISyncInUserChecker {
    ensureUsersAndGetAsMaps(dataMessages: IDataToTM[]): Promise<UserCheckResults>;
    private areUserIdsConsistentInMessageData;
    private gatherUserUniqueIds;
    private addMissingUsers;
}
//# sourceMappingURL=SyncInUserChecker.d.ts.map
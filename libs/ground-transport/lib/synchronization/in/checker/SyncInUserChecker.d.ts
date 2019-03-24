import { IUser, UserId, UserUniqueId } from '@airport/travel-document-checkpoint';
import { IDataToTM } from '../SyncInUtils';
export interface UserCheckResults {
    map: Map<UserUniqueId, IUser>;
    mapById: Map<UserId, IUser>;
    mapByMessageIndexAndRemoteUserId: Map<UserId, IUser>[];
    consistentMessages: IDataToTM[];
    inconsistentMessages: IDataToTM[];
}
export interface ISyncInUserChecker {
    ensureUsersAndGetAsMaps(dataMessages: IDataToTM[]): Promise<UserCheckResults>;
}
export declare class SyncInUserChecker implements ISyncInUserChecker {
    private userDao;
    private utils;
    constructor();
    ensureUsersAndGetAsMaps(dataMessages: IDataToTM[]): Promise<UserCheckResults>;
    private areUserIdsConsistentInMessageData;
    private gatherUserUniqueIds;
    private addMissingUsers;
}

import { IUtils } from "@airport/air-control";
import { IUser, IUserDao, UserId, UserUniqueId } from "@airport/holding-pattern";
import { IDataToTM } from "../SyncInUtils";
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
    constructor(userDao: IUserDao, utils: IUtils);
    ensureUsersAndGetAsMaps(dataMessages: IDataToTM[]): Promise<UserCheckResults>;
    private areUserIdsConsistentInMessageData(data);
    private gatherUserUniqueIds(data, remoteUserMapByUniqueId);
    private addMissingUsers(remoteUserMapByUniqueId, userMap, userMapById);
}

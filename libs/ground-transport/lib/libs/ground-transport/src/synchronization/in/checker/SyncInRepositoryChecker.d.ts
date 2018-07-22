import { IUtils } from "@airport/air-control";
import { RepositoryId } from "@airport/holding-pattern";
import { ISharingNodeRepositoryDao, SharingNodeId } from "@airport/moving-walkway";
import { IDataToTM } from "../SyncInUtils";
export interface RepositoryCheckResults {
    consistentMessages: IDataToTM[];
    inconsistentMessages: IDataToTM[];
    sharingNodeRepositoryMap: Map<SharingNodeId, Set<RepositoryId>>;
}
export interface ISyncInRepositoryChecker {
    ensureRepositories(incomingMessages: IDataToTM[]): Promise<RepositoryCheckResults>;
}
export declare class SyncInRepositoryChecker implements ISyncInRepositoryChecker {
    private sharingNodeRepositoryDao;
    private utils;
    constructor(sharingNodeRepositoryDao: ISharingNodeRepositoryDao, utils: IUtils);
    ensureRepositories(incomingMessages: IDataToTM[]): Promise<RepositoryCheckResults>;
    private areRepositoryIdsConsistentInMessage(message);
}

import { IUtils } from "@airport/air-control/lib/lingo/utils/Utils";
import { RepositoryId } from "@airport/holding-pattern/lib/ddl/repository/Repository";
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

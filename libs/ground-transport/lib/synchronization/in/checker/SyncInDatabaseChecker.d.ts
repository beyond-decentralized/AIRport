import { IDatabase, IDatabaseDao } from "@airport/holding-pattern";
import { IUtils } from "@airport/air-control";
import { IDataToTM } from "../SyncInUtils";
import { UserCheckResults } from "./SyncInUserChecker";
export interface DatabaseCheckResults {
    mapByMessageIndex: IDatabase[];
    consistentMessages: IDataToTM[];
    inconsistentMessages: IDataToTM[];
}
export interface ISyncInDatabaseChecker {
}
export declare class SyncInDatabaseChecker implements ISyncInDatabaseChecker {
    private databaseDao;
    private utils;
    constructor(databaseDao: IDatabaseDao, utils: IUtils);
    ensureDatabasesAndGetAsMaps(dataMessages: IDataToTM[], localDatabase: IDatabase, userCheckResults: UserCheckResults): Promise<DatabaseCheckResults>;
    private recordDatabaseInformation;
    private areDatabaseIdsConsistentInMessageData;
    private addMissingDatabases;
}

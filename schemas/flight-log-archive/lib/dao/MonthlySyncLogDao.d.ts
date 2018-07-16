import { IAirportDatabase } from "@airport/air-control";
import { IUtils } from "@airport/air-control";
import { MonthlySyncLogDatabaseId, MonthlySyncLogDate, MonthlySyncLogRepositoryId, MonthlySyncLogSynced } from "../ddl/MonthlySyncLog";
import { BaseMonthlySyncLogDao } from "../generated/baseDaos";
export interface IMonthlySyncLogDao {
    findAllForDatabase(databaseId: MonthlySyncLogDatabaseId, synced: MonthlySyncLogSynced, callback: (syncSyncLogRows: [MonthlySyncLogRepositoryId, MonthlySyncLogDate][]) => void): Promise<void>;
    updateSyncStatus(databaseId: MonthlySyncLogDatabaseId, repositoryIds: MonthlySyncLogRepositoryId[], synced: MonthlySyncLogSynced): Promise<void>;
}
export declare class MonthlySyncLogDao extends BaseMonthlySyncLogDao implements IMonthlySyncLogDao {
    private airportDb;
    constructor(airportDb: IAirportDatabase, utils: IUtils);
    findAllForDatabase(databaseId: MonthlySyncLogDatabaseId, synced: MonthlySyncLogSynced, callback: (syncSyncLogRows: [MonthlySyncLogRepositoryId, MonthlySyncLogDate][]) => void): Promise<void>;
    updateSyncStatus(databaseId: MonthlySyncLogDatabaseId, repositoryIds: MonthlySyncLogRepositoryId[], synced: MonthlySyncLogSynced): Promise<void>;
}

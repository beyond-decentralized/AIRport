import { DatabaseId, RepositoryId } from "./CommonTypes";
export declare type MonthlySyncLogRepositoryId = RepositoryId;
export declare type MonthlySyncLogDate = number;
export declare type MonthlySyncLogDatabaseId = DatabaseId;
export declare type MonthlySyncLogSynced = boolean;
export declare class MonthlySyncLog {
    databaseId: MonthlySyncLogDatabaseId;
    month: MonthlySyncLogDate;
    repositoryId: MonthlySyncLogRepositoryId;
    synced: MonthlySyncLogSynced;
}

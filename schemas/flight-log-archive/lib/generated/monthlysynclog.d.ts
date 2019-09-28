export interface IMonthlySyncLog {
    databaseId: number;
    month: Date;
    repositoryId: number;
    synced?: boolean;
}

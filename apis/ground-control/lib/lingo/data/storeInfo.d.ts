export declare enum StoreType {
    COCKROACHDB = "COCKROACHDB",
    MYSQL = "MYSQL",
    POSTGRESQL = "POSTGRESQL",
    REMOTE = "REMOTE",
    SQLITE = "SQLITE",
    SQLJS = "SQLJS",
    WEB_SQL = "WEB_SQL"
}
export interface StoreShareInfo {
    name: string;
}
export interface StoreSetupInfo {
    name: string;
    type: StoreType;
    idGeneration: IdGeneration;
}
export declare enum IdGeneration {
    ENTITY_CHANGE_ID = "ENTITY_CHANGE_ID"
}
//# sourceMappingURL=storeInfo.d.ts.map
export declare enum StoreType {
    COCKROACHDB = 0,
    MYSQL = 1,
    POSTGRESQL = 2,
    REMOTE = 3,
    SQLITE = 4,
    SQLJS = 5,
    WEB_SQL = 6
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
    ENTITY_CHANGE_ID = 0
}
//# sourceMappingURL=storeInfo.d.ts.map
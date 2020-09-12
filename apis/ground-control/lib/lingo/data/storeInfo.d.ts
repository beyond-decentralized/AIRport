export declare enum StoreType {
    REMOTE = 0,
    MYSQL = 1,
    SQLITE_CORDOVA = 2,
    SQLJS = 3
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
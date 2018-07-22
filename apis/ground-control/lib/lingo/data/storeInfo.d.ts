export declare enum StoreType {
    SQLITE_CORDOVA = 0,
    SQLJS = 1,
    REMOTE = 2,
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
    ENTITY_CHANGE_ID = 0,
}

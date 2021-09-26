import { IdGeneration, StoreType } from '@airport/ground-control';
export interface StoreShareInfo {
    name: string;
}
export interface StoreSetupInfo {
    name: string;
    type: StoreType;
    idGeneration: IdGeneration;
}
export declare namespace store.type {
    const WEB_SQL = "WEB_SQL";
    const SQL_JS = "SQL_JS";
    function getName(localStoreType: StoreType): string;
    function getValue(localStoreTypeName: string): StoreType;
}
//# sourceMappingURL=storeInfo.d.ts.map
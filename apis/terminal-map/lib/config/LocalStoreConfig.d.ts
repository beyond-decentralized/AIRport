import { IdGeneration, StoreSetupInfo, StoreType } from "./storeInfo";
/**
 * Created by Papa on 5/28/2016.
 */
export interface JsonLocalStoreConfig {
    type: StoreType | string;
    idGeneration: IdGeneration;
}
export interface ILocalStoreConfig {
    setupInfo: StoreSetupInfo;
}
export declare class CommonLocalStoreConfig implements ILocalStoreConfig {
    setupInfo: StoreSetupInfo;
    constructor(localStoreName: string, type: StoreType, idGeneration: IdGeneration);
}
export declare function createLocalStoreConfig(localStoreName: string, config: JsonLocalStoreConfig): ILocalStoreConfig;
export interface IPouchDbLocalStoreConfig extends ILocalStoreConfig {
}
export declare class PouchDbLocalStoreConfig extends CommonLocalStoreConfig implements IPouchDbLocalStoreConfig {
}
export interface ISqLiteCordovaLocalStoreConfig extends ILocalStoreConfig {
}
export declare class SqLiteCordovaLocalStoreConfig extends CommonLocalStoreConfig implements SqLiteCordovaLocalStoreConfig {
}
export interface ISqlJsCordovaLocalStoreConfig extends ILocalStoreConfig {
}
export declare class SqlJsCordovaLocalStoreConfig extends CommonLocalStoreConfig implements SqlJsCordovaLocalStoreConfig {
}

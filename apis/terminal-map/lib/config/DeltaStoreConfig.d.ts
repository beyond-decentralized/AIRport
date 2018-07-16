import { IChangeListConfig, JsonChangeListConfig } from "./ChangeListConfig";
import { IOfflineDeltaStoreConfig, JsonOfflineDeltaStoreConfig } from "./OfflineDeltaStoreConfig";
import { PlatformType } from "./PlatformType";
import { SharingPlatformSetupInfo } from "../SharingAdaptor";
import { GoogleSetupInfo } from "./GoogleSharingModel";
/**
 * Created by Papa on 5/31/2016.
 */
export interface JsonDeltaStoreConfig {
    changeList?: JsonChangeListConfig;
    offlineDeltaStore?: JsonOfflineDeltaStoreConfig;
    platform: PlatformType | string;
    recordIdField: string;
}
export interface JsonGoogleDeltaStoreConfig extends JsonDeltaStoreConfig {
    apiKey: string;
    clientId: string;
    rootFolder: string;
}
export interface IDeltaStoreConfig {
    changeListConfig: IChangeListConfig;
    config: JsonDeltaStoreConfig;
    offlineDeltaStore: IOfflineDeltaStoreConfig;
    setupInfo: SharingPlatformSetupInfo;
}
export declare class DeltaStoreConfig implements IDeltaStoreConfig {
    config: JsonDeltaStoreConfig;
    changeListConfig: IChangeListConfig;
    offlineDeltaStore: IOfflineDeltaStoreConfig;
    setupInfo: SharingPlatformSetupInfo;
    constructor(config: JsonDeltaStoreConfig);
}
export declare function getPlatformType(platform: PlatformType | string): PlatformType;
export interface IGoogleDeltaStoreConfig extends IDeltaStoreConfig {
    setupInfo: GoogleSetupInfo;
}
export declare class GoogleDeltaStoreConfig extends DeltaStoreConfig implements IGoogleDeltaStoreConfig {
    setupInfo: GoogleSetupInfo;
    constructor(config: JsonGoogleDeltaStoreConfig);
}
export declare class InMemoryDeltaStoreConfig extends DeltaStoreConfig {
}
export declare class StubDeltaStoreConfig extends DeltaStoreConfig {
}
export declare function createDeltaStoreConfig(jsonDeltaStoreConfig: JsonDeltaStoreConfig): IDeltaStoreConfig;
export declare function getPlatformConfig(deltaStoreConfig: DeltaStoreConfig): any;

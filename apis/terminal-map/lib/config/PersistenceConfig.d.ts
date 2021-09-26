import { DistributionStrategy, IdGeneration, PlatformType, StoreType } from "@airport/ground-control";
import { IDeltaStoreConfig, JsonDeltaStoreConfig } from "./DeltaStoreConfig";
import { ILocalStoreConfig, JsonLocalStoreConfig } from "./LocalStoreConfig";
/**
 * Created by Papa on 5/28/2016.
 */
export interface JsonPersistenceConfig<DSC extends JsonDeltaStoreConfig> {
    appName: string;
    deltaStore?: DSC;
    localStore?: JsonLocalStoreConfig;
}
export interface IPersistenceConfig {
    deltaStoreConfig: IDeltaStoreConfig;
    localStoreConfig: ILocalStoreConfig;
    appName: string;
}
export declare class PersistenceConfig<DSC extends JsonDeltaStoreConfig> implements IPersistenceConfig {
    private config;
    static getDefaultJsonConfig(appName?: string, distributionStrategy?: DistributionStrategy, deltaStorePlatform?: PlatformType, localStoreType?: StoreType, offlineDeltaStoreType?: StoreType, idGeneration?: IdGeneration): JsonPersistenceConfig<JsonDeltaStoreConfig>;
    deltaStoreConfig: IDeltaStoreConfig;
    localStoreConfig: ILocalStoreConfig;
    appName: string;
    constructor(config: JsonPersistenceConfig<DSC>);
}
//# sourceMappingURL=PersistenceConfig.d.ts.map
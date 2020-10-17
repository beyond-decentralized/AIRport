import { createDeltaStoreConfig } from "./DeltaStoreConfig";
import { createLocalStoreConfig } from "./LocalStoreConfig";
import { DistributionStrategy, IdGeneration, PlatformType, StoreType } from "@airport/ground-control";
export class PersistenceConfig {
    constructor(config) {
        this.config = config;
        this.appName = config.appName;
        if (config.deltaStore) {
            let jsonDeltaStoreConfig = config.deltaStore;
            this.deltaStoreConfig = createDeltaStoreConfig(jsonDeltaStoreConfig);
        }
        if (config.localStore) {
            this.localStoreConfig = createLocalStoreConfig(config.appName, config.localStore);
        }
    }
    static getDefaultJsonConfig(appName = 'DefaultApp', distributionStrategy = DistributionStrategy.S3_SECURE_POLL, deltaStorePlatform = PlatformType.GOOGLE_DOCS, localStoreType = StoreType.SQLITE_CORDOVA, offlineDeltaStoreType = StoreType.SQLITE_CORDOVA, idGeneration = IdGeneration.ENTITY_CHANGE_ID) {
        return {
            appName: appName,
            deltaStore: {
                changeList: {
                    distributionStrategy: distributionStrategy
                },
                offlineDeltaStore: {
                    type: offlineDeltaStoreType
                },
                recordIdField: "id",
                platform: deltaStorePlatform
            },
            localStore: {
                type: localStoreType,
                idGeneration: idGeneration
            }
        };
    }
}
//# sourceMappingURL=PersistenceConfig.js.map
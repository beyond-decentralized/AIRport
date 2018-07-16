"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DeltaStoreConfig_1 = require("./DeltaStoreConfig");
const LocalStoreConfig_1 = require("./LocalStoreConfig");
const ground_control_1 = require("@airport/ground-control");
class PersistenceConfig {
    constructor(config) {
        this.config = config;
        this.appName = config.appName;
        if (config.deltaStore) {
            let jsonDeltaStoreConfig = config.deltaStore;
            this.deltaStoreConfig = DeltaStoreConfig_1.createDeltaStoreConfig(jsonDeltaStoreConfig);
        }
        if (config.localStore) {
            this.localStoreConfig = LocalStoreConfig_1.createLocalStoreConfig(config.appName, config.localStore);
        }
    }
    static getDefaultJsonConfig(appName = 'DefaultApp', distributionStrategy = ground_control_1.DistributionStrategy.S3_SECURE_POLL, deltaStorePlatform = ground_control_1.PlatformType.GOOGLE_DOCS, localStoreType = ground_control_1.StoreType.SQLITE_CORDOVA, offlineDeltaStoreType = ground_control_1.StoreType.SQLITE_CORDOVA, idGeneration = ground_control_1.IdGeneration.ENTITY_CHANGE_ID) {
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
exports.PersistenceConfig = PersistenceConfig;
//# sourceMappingURL=PersistenceConfig.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const SharingAdaptor_1 = require("../SharingAdaptor");
const ChangeListConfig_1 = require("./ChangeListConfig");
const OfflineDeltaStoreConfig_1 = require("./OfflineDeltaStoreConfig");
const PlatformType_1 = require("./PlatformType");
class DeltaStoreConfig {
    constructor(config) {
        this.config = config;
        if (!config.platform && config.platform !== 0) {
            throw new Error(`Sharing Platform is not defined `);
        }
        let platformType = getPlatformType(config.platform);
        this.setupInfo = {
            platformType: platformType,
            recordIdField: config.recordIdField,
            dbIdField: air_control_1.deltaConst.DB_ID_FIELD
        };
        if (!config.changeList) {
            throw new Error(`ChangeList config is not defined`);
        }
        if (!config.offlineDeltaStore) {
            throw new Error(`OfflineDeltaStore must be specified if changeLists are specified.`);
        }
        this.changeListConfig = new ChangeListConfig_1.ChangeListConfig(config.changeList, this);
        this.offlineDeltaStore = new OfflineDeltaStoreConfig_1.OfflineDeltaStoreConfig(config.offlineDeltaStore, this);
    }
}
exports.DeltaStoreConfig = DeltaStoreConfig;
function getPlatformType(platform) {
    let platformType;
    if (typeof platform === 'string') {
        platformType = SharingAdaptor_1.deltaStore.platform.getValue(platform);
    }
    else {
        // Verify the platform
        SharingAdaptor_1.deltaStore.platform.getName(platform);
        platformType = platform;
    }
    return platformType;
}
exports.getPlatformType = getPlatformType;
class GoogleDeltaStoreConfig extends DeltaStoreConfig {
    constructor(config) {
        super(config);
        if (!config.rootFolder) {
            throw new Error(`Root folder is not defined`);
        }
        if (!config.apiKey) {
            throw new Error(`ApiKey is not defined`);
        }
        if (!config.clientId) {
            throw new Error(`ClientId is not defined`);
        }
        this.setupInfo.rootFolder = config.rootFolder;
        this.setupInfo.apiKey = config.apiKey;
        this.setupInfo.clientId = config.clientId;
    }
}
exports.GoogleDeltaStoreConfig = GoogleDeltaStoreConfig;
class InMemoryDeltaStoreConfig extends DeltaStoreConfig {
}
exports.InMemoryDeltaStoreConfig = InMemoryDeltaStoreConfig;
class StubDeltaStoreConfig extends DeltaStoreConfig {
}
exports.StubDeltaStoreConfig = StubDeltaStoreConfig;
function createDeltaStoreConfig(jsonDeltaStoreConfig) {
    if (!jsonDeltaStoreConfig.platform && jsonDeltaStoreConfig.platform !== 0) {
        throw new Error(`deltaStore.platform is nod specified`);
    }
    let platformType = getPlatformType(jsonDeltaStoreConfig.platform);
    switch (platformType) {
        case PlatformType_1.PlatformType.GOOGLE_DOCS:
            return new GoogleDeltaStoreConfig(jsonDeltaStoreConfig);
        case PlatformType_1.PlatformType.IN_MEMORY:
            return new InMemoryDeltaStoreConfig(jsonDeltaStoreConfig);
        case PlatformType_1.PlatformType.STUB:
            return new StubDeltaStoreConfig(jsonDeltaStoreConfig);
        default:
            throw new Error(`Unsupported platform type ${platformType}`);
    }
}
exports.createDeltaStoreConfig = createDeltaStoreConfig;
function getPlatformConfig(deltaStoreConfig) {
    switch (deltaStoreConfig.setupInfo.platformType) {
        case PlatformType_1.PlatformType.GOOGLE_DOCS:
            return {
                rootFolder: this.setupInfo.rootFolder,
                apiKey: this.setupInfo.apiKey,
                clientId: this.setupInfo.clientId
            };
        default:
            return {};
    }
}
exports.getPlatformConfig = getPlatformConfig;
//# sourceMappingURL=DeltaStoreConfig.js.map
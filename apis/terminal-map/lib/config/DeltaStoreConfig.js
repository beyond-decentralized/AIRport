import { deltaConst } from '@airport/air-control';
import { PlatformType } from '@airport/ground-control';
import { deltaStore } from '../SharingAdaptor';
import { ChangeListConfig } from './ChangeListConfig';
import { OfflineDeltaStoreConfig } from './OfflineDeltaStoreConfig';
export class DeltaStoreConfig {
    constructor(config) {
        this.config = config;
        if (!config.platform) {
            throw new Error(`Sharing Platform is not defined `);
        }
        let platformType = getPlatformType(config.platform);
        this.setupInfo = {
            platformType: platformType,
            recordIdField: config.recordIdField,
            dbIdField: deltaConst.DB_ID_FIELD
        };
        if (!config.changeList) {
            throw new Error(`ChangeList config is not defined`);
        }
        if (!config.offlineDeltaStore) {
            throw new Error(`OfflineDeltaStore must be specified if changeLists are specified.`);
        }
        this.changeListConfig = new ChangeListConfig(config.changeList, this);
        this.offlineDeltaStore = new OfflineDeltaStoreConfig(config.offlineDeltaStore, this);
    }
}
export function getPlatformType(platform) {
    let platformType;
    if (typeof platform === 'string') {
        platformType = deltaStore.platform.getValue(platform);
    }
    else {
        // Verify the platform
        deltaStore.platform.getName(platform);
        platformType = platform;
    }
    return platformType;
}
export class GoogleDeltaStoreConfig extends DeltaStoreConfig {
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
export class InMemoryDeltaStoreConfig extends DeltaStoreConfig {
}
export class StubDeltaStoreConfig extends DeltaStoreConfig {
}
export function createDeltaStoreConfig(jsonDeltaStoreConfig) {
    if (!jsonDeltaStoreConfig.platform) {
        throw new Error(`deltaStore.platform is nod specified`);
    }
    let platformType = getPlatformType(jsonDeltaStoreConfig.platform);
    switch (platformType) {
        case PlatformType.GOOGLE_DOCS:
            return new GoogleDeltaStoreConfig(jsonDeltaStoreConfig);
        case PlatformType.IN_MEMORY:
            return new InMemoryDeltaStoreConfig(jsonDeltaStoreConfig);
        case PlatformType.STUB:
            return new StubDeltaStoreConfig(jsonDeltaStoreConfig);
        default:
            throw new Error(`Unsupported platform type ${platformType}`);
    }
}
export function getPlatformConfig(deltaStoreConfig) {
    switch (deltaStoreConfig.setupInfo.platformType) {
        case PlatformType.GOOGLE_DOCS:
            return {
                rootFolder: this.setupInfo.rootFolder,
                apiKey: this.setupInfo.apiKey,
                clientId: this.setupInfo.clientId
            };
        default:
            return {};
    }
}
//# sourceMappingURL=DeltaStoreConfig.js.map
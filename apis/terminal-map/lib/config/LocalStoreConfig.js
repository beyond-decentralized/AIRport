"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storeInfo_1 = require("./storeInfo");
class CommonLocalStoreConfig {
    constructor(localStoreName, type, idGeneration) {
        this.setupInfo = {
            name: localStoreName,
            type: type,
            idGeneration: idGeneration
        };
    }
}
exports.CommonLocalStoreConfig = CommonLocalStoreConfig;
function createLocalStoreConfig(localStoreName, config) {
    if (!config.type && config.type !== 0) {
        throw `Local Store Type is not specified`;
    }
    if (!config.idGeneration && config.idGeneration !== 0) {
        throw `Id Generation startegy is not specified`;
    }
    let type;
    if (typeof config.type === "string") {
        type = storeInfo_1.store.type.getValue(config.type);
    }
    else {
        // Verify the type
        storeInfo_1.store.type.getName(config.type);
        type = config.type;
    }
    switch (type) {
        case storeInfo_1.StoreType.SQLITE_CORDOVA:
            return new SqLiteCordovaLocalStoreConfig(localStoreName, config.type, config.idGeneration);
        case storeInfo_1.StoreType.SQLJS:
            return new SqlJsCordovaLocalStoreConfig(localStoreName, config.type, config.idGeneration);
        default:
            throw `Unsupported LocalStoreType: ${type}`;
    }
}
exports.createLocalStoreConfig = createLocalStoreConfig;
class PouchDbLocalStoreConfig extends CommonLocalStoreConfig {
}
exports.PouchDbLocalStoreConfig = PouchDbLocalStoreConfig;
class SqLiteCordovaLocalStoreConfig extends CommonLocalStoreConfig {
}
exports.SqLiteCordovaLocalStoreConfig = SqLiteCordovaLocalStoreConfig;
class SqlJsCordovaLocalStoreConfig extends CommonLocalStoreConfig {
}
exports.SqlJsCordovaLocalStoreConfig = SqlJsCordovaLocalStoreConfig;
//# sourceMappingURL=LocalStoreConfig.js.map
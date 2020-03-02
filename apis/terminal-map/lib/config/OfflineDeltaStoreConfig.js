"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const PlatformType_1 = require("./PlatformType");
class OfflineDeltaStoreConfig {
    constructor(config, deltaStoreConfig) {
        this.config = config;
        let changeListConfig = deltaStoreConfig.changeListConfig;
        this.type = config.type;
        this.setupInfo = {
            platformType: PlatformType_1.PlatformType.OFFLINE,
            recordIdField: deltaStoreConfig.config.recordIdField,
            dbIdField: air_control_1.deltaConst.DB_ID_FIELD
        };
    }
}
exports.OfflineDeltaStoreConfig = OfflineDeltaStoreConfig;
//# sourceMappingURL=OfflineDeltaStoreConfig.js.map
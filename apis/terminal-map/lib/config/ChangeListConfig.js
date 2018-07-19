"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const SharingAdaptor_1 = require("../SharingAdaptor");
class ChangeListConfig {
    constructor(config, deltaStoreConfig) {
        this.config = config;
        this.deltaStoreConfig = deltaStoreConfig;
        this.deltaStoreConfig = deltaStoreConfig;
        let distributionStrategy = config.distributionStrategy;
        if (!distributionStrategy && distributionStrategy !== 0) {
            throw `Distribution Strategy is not defined`;
        }
        if (typeof distributionStrategy === "string") {
            this.distributionStrategy = SharingAdaptor_1.deltaStore.distributionStrategy.getValue(distributionStrategy);
        }
        else {
            // Verify the distributionStrategy
            SharingAdaptor_1.deltaStore.distributionStrategy.getName(config.distributionStrategy);
            this.distributionStrategy = config.distributionStrategy;
        }
        this.changeListInfo = {
            name: 'Transactions',
            dbId: air_control_1.deltaConst.DB_ID_FIELD
        };
    }
}
exports.ChangeListConfig = ChangeListConfig;
//# sourceMappingURL=ChangeListConfig.js.map
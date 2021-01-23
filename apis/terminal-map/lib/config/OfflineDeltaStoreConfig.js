import { deltaConst } from '@airport/air-control';
import { PlatformType } from './PlatformType';
export class OfflineDeltaStoreConfig {
    constructor(config, deltaStoreConfig) {
        this.config = config;
        let changeListConfig = deltaStoreConfig.changeListConfig;
        this.type = config.type;
        this.setupInfo = {
            platformType: PlatformType.OFFLINE,
            recordIdField: deltaStoreConfig.config.recordIdField,
            dbIdField: deltaConst.DB_ID_FIELD
        };
    }
}
//# sourceMappingURL=OfflineDeltaStoreConfig.js.map
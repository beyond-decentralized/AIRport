export class ChangeListConfig {
    constructor(config, deltaStoreConfig) {
        this.config = config;
        this.deltaStoreConfig = deltaStoreConfig;
        this.deltaStoreConfig = deltaStoreConfig;
        let distributionStrategy = config.distributionStrategy;
        if (!distributionStrategy && distributionStrategy !== 0) {
            throw new Error(`Distribution Strategy is not defined`);
        }
        if (typeof distributionStrategy === 'string') {
            this.distributionStrategy = deltaStore.distributionStrategy.getValue(distributionStrategy);
        }
        else {
            // Verify the distributionStrategy
            deltaStore.distributionStrategy.getName(config.distributionStrategy);
            this.distributionStrategy = config.distributionStrategy;
        }
        this.changeListInfo = {
            name: 'Transactions',
            dbId: deltaConst.DB_ID_FIELD
        };
    }
}
//# sourceMappingURL=ChangeListConfig.js.map
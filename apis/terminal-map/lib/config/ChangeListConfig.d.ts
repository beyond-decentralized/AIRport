import type { ChangeListShareInfo } from '../SharingAdaptor';
import type { DistributionStrategy } from '../sync/DistributionStrategy';
import type { IDeltaStoreConfig } from './DeltaStoreConfig';
/**
 * Created by Papa on 5/28/2016.
 */
export interface JsonChangeListConfig {
    distributionStrategy?: DistributionStrategy | string;
}
export interface IChangeListConfig {
    changeListInfo?: ChangeListShareInfo;
    deltaStoreConfig: IDeltaStoreConfig;
    distributionStrategy: DistributionStrategy;
    exists?: boolean;
}
export declare class ChangeListConfig implements IChangeListConfig {
    private config;
    deltaStoreConfig: IDeltaStoreConfig;
    changeListInfo: ChangeListShareInfo;
    distributionStrategy: DistributionStrategy;
    constructor(config: JsonChangeListConfig, deltaStoreConfig: IDeltaStoreConfig);
}
//# sourceMappingURL=ChangeListConfig.d.ts.map
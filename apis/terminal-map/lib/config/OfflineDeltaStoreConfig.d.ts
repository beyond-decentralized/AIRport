import type { StoreType } from '@airport/ground-control';
import type { SharingPlatformSetupInfo } from '../SharingAdaptor';
import type { IDeltaStoreConfig } from './DeltaStoreConfig';
/**
 * Created by Papa on 9/24/2016.
 */
export interface JsonOfflineDeltaStoreConfig {
    type: StoreType;
}
export interface IOfflineDeltaStoreConfig {
    config: JsonOfflineDeltaStoreConfig;
    type: StoreType;
}
export declare class OfflineDeltaStoreConfig implements IOfflineDeltaStoreConfig {
    config: JsonOfflineDeltaStoreConfig;
    setupInfo: SharingPlatformSetupInfo;
    type: StoreType;
    constructor(config: JsonOfflineDeltaStoreConfig, deltaStoreConfig: IDeltaStoreConfig);
}
//# sourceMappingURL=OfflineDeltaStoreConfig.d.ts.map
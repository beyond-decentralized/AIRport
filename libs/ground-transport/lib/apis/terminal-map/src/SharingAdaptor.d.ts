import { DistributionStrategy, PlatformType } from "@airport/ground-control";
import { SharedChangeList } from "./sync/SharedChangeList";
/**
 * Created by Papa on 1/10/2016.
 */
export interface ChangeListShareInfo {
    name: string;
    dbId: string;
}
export interface SharingPlatformSetupInfo {
    platformType: PlatformType;
    recordIdField: string;
    dbIdField: string;
}
export declare namespace deltaStore.platform {
    const GOOGLE = "GOOGLE";
    const IN_MEMORY = "IN_MEMORY";
    const STUB = "STUB";
    function getName(platformType: PlatformType): string;
    function getValue(platformTypeName: string): PlatformType;
}
export declare namespace deltaStore.distributionStrategy {
    const S3_DISTRIBUTED_PUSH = "S3_DISTRIBUTED_PUSH";
    const S3_SECURE_POLL = "S3_SECURE_POLL";
    function getName(distributionStrategy: DistributionStrategy): string;
    function getValue(distributionStrategyName: string): DistributionStrategy;
}
export interface SharingAdaptor {
    setupInfoBelongsTo(setupInfo: SharingPlatformSetupInfo, setupInfos: SharingPlatformSetupInfo[]): boolean;
    initialize(setupInfo: SharingPlatformSetupInfo): Promise<any>;
    findExistingChangeLists(setupInfo: SharingPlatformSetupInfo): Promise<ChangeListShareInfo[]>;
    createChangeList(shareInfo: ChangeListShareInfo, setupInfo: SharingPlatformSetupInfo): Promise<SharedChangeList>;
    loadChangeList(shareInfo: ChangeListShareInfo, setupInfo: SharingPlatformSetupInfo): Promise<SharedChangeList>;
}

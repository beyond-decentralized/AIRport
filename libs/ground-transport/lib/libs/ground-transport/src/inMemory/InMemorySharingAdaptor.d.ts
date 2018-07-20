import { SharingAdaptor, SharingPlatformSetupInfo, ChangeListShareInfo, SharedChangeList } from "@airport/terminal-map";
import { InMemoryChangeStore } from "./InMemoryChangeStore";
/**
 * Created by Papa on 11/26/2016.
 */
export declare class InMemorySharingAdaptor implements SharingAdaptor {
    changeStore: InMemoryChangeStore;
    setupInfoBelongsTo(setupInfo: SharingPlatformSetupInfo, setupInfos: SharingPlatformSetupInfo[]): boolean;
    initialize(setupInfo: SharingPlatformSetupInfo): Promise<SharingPlatformSetupInfo>;
    findExistingChangeLists(setupInfo: SharingPlatformSetupInfo): Promise<ChangeListShareInfo[]>;
    createChangeList(shareInfo: ChangeListShareInfo, setupInfo: SharingPlatformSetupInfo): Promise<SharedChangeList>;
    loadChangeList(shareInfo: ChangeListShareInfo, setupInfo: SharingPlatformSetupInfo): Promise<SharedChangeList>;
}

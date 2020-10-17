import { ChangeListShareInfo, SharedChangeList, SharingAdaptor, SharingPlatformSetupInfo } from "@airport/terminal-map";
/**
 * Created by Papa on 12/14/2016.
 */
export declare class StubSharingAdaptor implements SharingAdaptor {
    changeLists: SharedChangeList[];
    setupInfoBelongsTo(setupInfo: SharingPlatformSetupInfo, setupInfos: SharingPlatformSetupInfo[]): boolean;
    initialize(setupInfo: SharingPlatformSetupInfo): Promise<SharingPlatformSetupInfo>;
    findExistingChangeLists(setupInfo: SharingPlatformSetupInfo): Promise<ChangeListShareInfo[]>;
    createChangeList(shareInfo: ChangeListShareInfo, setupInfo: SharingPlatformSetupInfo): Promise<SharedChangeList>;
    loadChangeList(shareInfo: ChangeListShareInfo, setupInfo: SharingPlatformSetupInfo): Promise<SharedChangeList>;
}
//# sourceMappingURL=StubSharingAdaptor.d.ts.map
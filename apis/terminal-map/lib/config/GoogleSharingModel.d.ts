import type { SharingPlatformSetupInfo } from '../SharingAdaptor';
import type { ChangeListShareInfo } from '../SharingAdaptor';
/**
 * Created by Papa on 1/10/2016.
 */
export interface GoogleSetupInfo extends SharingPlatformSetupInfo {
    apiKey: string;
    clientId: string;
    rootFolder: string;
    sharedAppFolderId?: string;
}
export interface GoogleChangeListShareInfo extends ChangeListShareInfo {
    folderId: string;
    realtimeFileId?: string;
    recentFileId?: string;
    archiveFileId?: string;
}
//# sourceMappingURL=GoogleSharingModel.d.ts.map
/**
 * Created by Papa on 1/7/2016.
 */
import { ChangeListShareInfo, GoogleChangeListShareInfo, GoogleSetupInfo, SharedChangeList, SharingAdaptor } from '@airport/terminal-map';
import { GoogleDrive } from './drive/GoogleDrive';
import { GoogleDriveAdaptor } from './drive/GoogleDriveAdaptor';
import { GoogleRealtime } from './realtime/GoogleRealtime';
import { GoogleRealtimeAdaptor } from './realtime/GoogleRealtimeAdaptor';
export declare class GoogleSharingAdaptor implements SharingAdaptor {
    private drive;
    private driveAdaptor;
    private realtime;
    private realtimeAdaptor;
    constructor(drive: GoogleDrive, driveAdaptor: GoogleDriveAdaptor, realtime: GoogleRealtime, realtimeAdaptor: GoogleRealtimeAdaptor);
    setupInfoBelongsTo(setupInfo: GoogleSetupInfo, setupInfos: GoogleSetupInfo[]): boolean;
    initialize(setupInfo: GoogleSetupInfo): Promise<GoogleSetupInfo>;
    createChangeList(shareInfo: ChangeListShareInfo, setupInfo: GoogleSetupInfo): Promise<SharedChangeList>;
    findExistingChangeLists(setupInfo: GoogleSetupInfo): Promise<GoogleChangeListShareInfo[]>;
    loadChangeList(shareInfo: GoogleChangeListShareInfo, setupInfo: GoogleSetupInfo): Promise<SharedChangeList>;
}
//# sourceMappingURL=GoogleSharingAdaptor.d.ts.map
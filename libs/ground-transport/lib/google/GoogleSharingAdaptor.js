/**
 * Created by Papa on 1/7/2016.
 */
import { PlatformType } from '@airport/terminal-map';
import { GoogleSharedChangeList } from './GoogleSharedChangeList';
// @Injectable()
export class GoogleSharingAdaptor {
    constructor(drive, driveAdaptor, realtime, realtimeAdaptor) {
        this.drive = drive;
        this.driveAdaptor = driveAdaptor;
        this.realtime = realtime;
        this.realtimeAdaptor = realtimeAdaptor;
    }
    setupInfoBelongsTo(setupInfo, setupInfos) {
        if (setupInfo.platformType !== PlatformType.GOOGLE_DOCS) {
            return false;
        }
        return setupInfos.some((otherSetupInfo) => {
            if (otherSetupInfo.platformType === PlatformType.GOOGLE_DOCS) {
                return setupInfo.apiKey === otherSetupInfo.apiKey
                    && setupInfo.clientId === otherSetupInfo.clientId;
            }
        });
    }
    initialize(setupInfo) {
        return this.driveAdaptor.initialize(setupInfo.apiKey, setupInfo.clientId).then(() => {
            return this.driveAdaptor.setup(setupInfo);
        }).then((driveFile) => {
            setupInfo.sharedAppFolderId = driveFile.result.id;
            return setupInfo;
        });
    }
    createChangeList(shareInfo, setupInfo) {
        let folderId;
        let realtimeFileId;
        return this.drive.findOrCreateUniqueFolder(name, setupInfo.sharedAppFolderId).then((driveResponse) => {
            folderId = driveResponse.result.id;
            return this.realtime.findOrCreateFileUniqueFile(name + ' - Realtime', folderId);
        }).then((driveResponse) => {
            realtimeFileId = driveResponse.result.id;
            return this.realtimeAdaptor.startNewShare(realtimeFileId);
        }).then((handle) => {
            let googleShareInfo = {
                name: shareInfo.name,
                dbId: shareInfo.dbId,
                folderId: folderId,
                realtimeFileId: realtimeFileId
            };
            return new GoogleSharedChangeList(setupInfo, googleShareInfo, handle);
        });
    }
    findExistingChangeLists(setupInfo) {
        return this.driveAdaptor.listChangeLists(setupInfo).then((listings) => {
            return listings;
        });
    }
    loadChangeList(shareInfo, setupInfo) {
        return this.driveAdaptor.populateChangeListFileInfo(shareInfo).then((shareInfo) => {
            return this.realtimeAdaptor.openShare(shareInfo.realtimeFileId).then((handle) => {
                return new GoogleSharedChangeList(setupInfo, shareInfo, handle);
            });
        });
    }
}
//# sourceMappingURL=GoogleSharingAdaptor.js.map
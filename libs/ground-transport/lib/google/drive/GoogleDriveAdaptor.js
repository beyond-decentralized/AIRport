import { ApiConstants } from '../GoogleApi';
import { DriveConstants, MimeTypes } from './GoogleDriveModel';
/**
 * Created by Papa on 1/3/2016.
 */
export class GoogleDriveAdaptor {
    constructor(googleApi, googleDrive) {
        this.googleApi = googleApi;
        this.googleDrive = googleDrive;
    }
    initialize(apiKey, clientId) {
        return this.googleApi.authorizeApis(apiKey, clientId, ApiConstants.ALL_SCOPES).then(() => {
            let loadRequests = [
                this.googleApi.loadApi('drive', DriveConstants.VERSION),
                this.googleApi.loadApi('drive-realtime,drive-share', DriveConstants.VERSION)
            ];
            return Promise.all(loadRequests);
        });
    }
    setup(setupInfo) {
        return this.googleDrive.findOrCreateUniqueFolder(setupInfo.rootFolder);
    }
    listChangeLists(info) {
        return this.googleDrive.listFiles(info.sharedAppFolderId).then((response) => {
            let files = response.result.files;
            if (!files || files.length === 0) {
                return [];
            }
            let shares = [];
            files.forEach((file) => {
                shares.push({
                    name: file.name,
                    dbId: info.dbIdField,
                    folderId: file.id
                });
            });
            return shares;
        });
    }
    populateChangeListFileInfo(changeListInfo) {
        return this.googleDrive.listFiles(changeListInfo.folderId).then((response) => {
            let files = response.result.files;
            if (!files || files.length === 0) {
                return changeListInfo;
            }
            files.forEach((file) => {
                if (file.mimeType.indexOf(MimeTypes.REALTIME) === 0) {
                    if (changeListInfo.realtimeFileId) {
                        throw new Error(`Multiple Realtime files found for Change List: ${changeListInfo.name}`);
                    }
                    changeListInfo.realtimeFileId = file.id;
                }
            });
            return changeListInfo;
        });
    }
}
//# sourceMappingURL=GoogleDriveAdaptor.js.map
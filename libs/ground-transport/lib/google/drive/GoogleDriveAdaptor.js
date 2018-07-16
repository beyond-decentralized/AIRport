"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GoogleApi_1 = require("../GoogleApi");
const GoogleDriveModel_1 = require("./GoogleDriveModel");
const GoogleDriveModel_2 = require("./GoogleDriveModel");
/**
 * Created by Papa on 1/3/2016.
 */
class GoogleDriveAdaptor {
    constructor(googleApi, googleDrive) {
        this.googleApi = googleApi;
        this.googleDrive = googleDrive;
    }
    initialize(apiKey, clientId) {
        return this.googleApi.authorizeApis(apiKey, clientId, GoogleApi_1.ApiConstants.ALL_SCOPES).then(() => {
            let loadRequests = [
                this.googleApi.loadApi('drive', GoogleDriveModel_1.DriveConstants.VERSION),
                this.googleApi.loadApi('drive-realtime,drive-share', GoogleDriveModel_1.DriveConstants.VERSION)
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
                if (file.mimeType.indexOf(GoogleDriveModel_2.MimeTypes.REALTIME) === 0) {
                    if (changeListInfo.realtimeFileId) {
                        throw `Multiple Realtime files found for Change List: ${changeListInfo.name}`;
                    }
                    changeListInfo.realtimeFileId = file.id;
                }
            });
            return changeListInfo;
        });
    }
}
exports.GoogleDriveAdaptor = GoogleDriveAdaptor;
//# sourceMappingURL=GoogleDriveAdaptor.js.map
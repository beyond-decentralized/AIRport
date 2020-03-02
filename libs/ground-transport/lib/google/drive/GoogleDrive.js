"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GoogleDriveModel_1 = require("./GoogleDriveModel");
/**
 * Created by Papa on 1/2/2016.
 */
class GoogleDrive {
    constructor(googleApi) {
        this.googleApi = googleApi;
        let SCOPES = [
            'https://www.googleapis.com/auth/drive.appfolder',
            'email',
            'profile',
        ];
    }
    createFolder(name, folderId) {
        let parents;
        if (folderId) {
            parents = [folderId];
        }
        let fileMetadata = {
            name: name,
            mimeType: GoogleDriveModel_1.MimeTypes.FOLDER,
            parents: parents
        };
        let createDescriptor = {
            resource: fileMetadata,
            fields: 'id'
        };
        return gapi.client.drive.files.create(createDescriptor);
    }
    createFile(name, mimeType, folderId) {
        let fileMetadata = {
            mimeType: mimeType,
            name: name,
            parents: [folderId]
        };
        return Promise.resolve().then(() => {
            return gapi.client.drive.files.create({
                resource: fileMetadata,
                fields: 'id'
            });
        });
    }
    findOrCreateBook(name, folderId) {
        return this.findOrCreateUniqueFile(name, GoogleDriveModel_1.MimeTypes.SPREAD_SHEET_BOOK, folderId);
    }
    findOrCreateUniqueFolder(fileName, folderId) {
        return this.findFile(fileName, folderId).then((response) => {
            let files = response.result.files;
            switch (files.length) {
                case 0:
                    return this.createFolder(fileName, folderId);
                case 1:
                    return {
                        result: {
                            id: files[0].id
                        }
                    };
                default:
                    throw new Error(`Found more than one '${fileName}' in directory '${folderId}', 
						please delete the duplicate.`);
            }
        });
    }
    findOrCreateUniqueFile(fileName, mimeType, folderId) {
        return this.findFile(fileName, folderId).then((response) => {
            let files = response.result.files;
            switch (files.length) {
                case 0:
                    return this.createFile(fileName, mimeType, folderId);
                case 1:
                    return {
                        body: undefined,
                        headers: undefined,
                        result: {
                            id: files[0].id
                        },
                        status: undefined,
                        statusText: undefined
                    };
                default:
                    throw new Error(`Found more than one '${fileName}' in directory '${folderId}',
						please delete the duplicate.`);
            }
        });
    }
    apiFileList(dirRef) {
        return new Promise((resolve, reject) => {
            resolve();
        }).then(() => {
            return gapi.client.drive.files.list(dirRef);
        });
    }
    findFile(fileName, folderId = GoogleDriveModel_1.DriveConstants.DRIVE_FOLDER) {
        let query = `name = '${fileName}' and '${folderId}' in parents and trashed=false`;
        return this.apiFileList({
            q: query
        }).then((response) => {
            console.log('Found for q:\n\t' + query);
            console.log(response);
            return response;
        }).catch((error) => {
            console.log('Did not find for q:\n\t' + query);
            if (error.status === 404) {
                return {
                    result: {
                        files: []
                    }
                };
            }
            throw error;
        });
    }
    listFiles(folderId, pageToken = null, space = GoogleDriveModel_1.DriveConstants.DRIVE_SPACE) {
        return this.apiFileList({
            fields: 'nextPageToken, files(id, mimeType, name)',
            pageToken: pageToken,
            q: `'${folderId}' in parents and trashed = false`,
            spaces: space
        });
    }
    searchFiles(space = GoogleDriveModel_1.DriveConstants.DRIVE_SPACE) {
        return this.apiFileList({
            spaces: space,
            fields: GoogleDriveModel_1.DriveConstants.APP_DATA_LIST_FIELDS,
            pageSize: 100
        });
    }
}
exports.GoogleDrive = GoogleDrive;
//# sourceMappingURL=GoogleDrive.js.map
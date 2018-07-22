import { GoogleApi } from '../GoogleApi';
import { DriveResponse } from './GoogleDriveModel';
/**
 * Created by Papa on 1/2/2016.
 */
export declare class GoogleDrive {
    private googleApi;
    constructor(googleApi: GoogleApi);
    createFolder(name: string, folderId?: string): Promise<any>;
    createFile(name: string, mimeType: string, folderId: string): Promise<DriveResponse>;
    findOrCreateBook(name: string, folderId: string): Promise<DriveResponse>;
    findOrCreateUniqueFolder(fileName: string, folderId?: string): Promise<DriveResponse>;
    findOrCreateUniqueFile(fileName: string, mimeType: string, folderId?: string): Promise<DriveResponse>;
    private apiFileList(dirRef?);
    findFile(fileName: string, folderId?: string): Promise<any>;
    listFiles(folderId: string, pageToken?: string, space?: string): Promise<any>;
    searchFiles(space?: string): Promise<any>;
}

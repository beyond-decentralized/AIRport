import { GoogleDrive } from './GoogleDrive';
import { GoogleApi } from '../GoogleApi';
import { DriveResponse } from './GoogleDriveModel';
import { GoogleSetupInfo, GoogleChangeListShareInfo } from '@airport/terminal-map';
/**
 * Created by Papa on 1/3/2016.
 */
export declare class GoogleDriveAdaptor {
    private googleApi;
    private googleDrive;
    constructor(googleApi: GoogleApi, googleDrive: GoogleDrive);
    initialize(apiKey: string, clientId: string): Promise<any>;
    setup(setupInfo: GoogleSetupInfo): Promise<DriveResponse>;
    listChangeLists(info: GoogleSetupInfo): Promise<GoogleChangeListShareInfo[]>;
    populateChangeListFileInfo(changeListInfo: GoogleChangeListShareInfo): Promise<GoogleChangeListShareInfo>;
}

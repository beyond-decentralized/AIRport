import { GoogleChangeListShareInfo, GoogleSetupInfo } from '@airport/terminal-map';
import { GoogleApi } from '../GoogleApi';
import { GoogleDrive } from './GoogleDrive';
import { DriveResponse } from './GoogleDriveModel';
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
//# sourceMappingURL=GoogleDriveAdaptor.d.ts.map
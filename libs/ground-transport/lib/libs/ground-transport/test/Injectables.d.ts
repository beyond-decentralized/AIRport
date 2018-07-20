import { GoogleSharingAdaptor } from "../src/google/GoogleSharingAdaptor";
import { GoogleRealtimeAdaptor } from "../src/google/realtime/GoogleRealtimeAdaptor";
import { GoogleRealtime } from "../src/google/realtime/GoogleRealtime";
import { GoogleDriveAdaptor } from "../src/google/drive/GoogleDriveAdaptor";
import { GoogleDrive } from "../src/google/drive/GoogleDrive";
import { GoogleApi } from "../src/google/GoogleApi";
/**
 * Created by Papa on 5/26/2016.
 */
/**
 * Replace with Angular 2 @Injectable or equivalent
 *
 * @returns {function(Function)}
 * @constructor
 */
export declare function Injectable(): (constructor: Function) => void;
export declare class NgGoogleApi extends GoogleApi {
}
export declare class NgGoogleDrive extends GoogleDrive {
    private googleApi;
    constructor(googleApi: NgGoogleApi);
}
export declare class NgGoogleDriveAdaptor extends GoogleDriveAdaptor {
    private googleApi;
    private googleDrive;
    constructor(googleApi: NgGoogleApi, googleDrive: NgGoogleDrive);
}
export declare class NgGoogleRealtime extends GoogleRealtime {
    private googleDrive;
    constructor(googleDrive: NgGoogleDrive);
}
export declare class NgGoogleRealtimeAdaptor extends GoogleRealtimeAdaptor {
    private googleRealtime;
    constructor(googleRealtime: NgGoogleRealtime);
}
export declare class NgGoogleSharingAdaptor extends GoogleSharingAdaptor {
    private drive;
    private driveAdaptor;
    private realtime;
    private realtimeAdaptor;
    constructor(drive: NgGoogleDrive, driveAdaptor: NgGoogleDriveAdaptor, realtime: NgGoogleRealtime, realtimeAdaptor: NgGoogleRealtimeAdaptor);
}

import {GoogleSharingAdaptor} from "../src/google/GoogleSharingAdaptor";
import {GoogleRealtimeAdaptor} from "../src/google/realtime/GoogleRealtimeAdaptor";
import {GoogleRealtime} from "../src/google/realtime/GoogleRealtime";
import {GoogleDriveAdaptor} from "../src/google/drive/GoogleDriveAdaptor";
import {GoogleDrive} from "../src/google/drive/GoogleDrive";
import {GoogleApi} from "../src/google/GoogleApi";
/**
 * Created by Papa on 5/26/2016.
 */

/**
 * Replace with Angular 2 @Injectable or equivalent
 * 
 * @returns {function(Function)}
 * @constructor
 */
export function Injectable() {
	return function (
		constructor:Function
	) {
	}
}

@Injectable
export class NgGoogleApi extends GoogleApi {

}

@Injectable
export class NgGoogleDrive extends GoogleDrive {
	constructor(
		private googleApi:NgGoogleApi
	) {
		super(googleApi);
	}
}

@Injectable
export class NgGoogleDriveAdaptor extends GoogleDriveAdaptor {
	constructor(
		private googleApi:NgGoogleApi,
		private googleDrive:NgGoogleDrive
	) {
		super(googleApi, googleDrive);
	}
}

@Injectable
export class NgGoogleRealtime extends GoogleRealtime {
	constructor(
		private googleDrive:NgGoogleDrive
	) {
		super(googleDrive);
	}
}

@Injectable
export class NgGoogleRealtimeAdaptor extends GoogleRealtimeAdaptor {
	constructor(
		private googleRealtime:NgGoogleRealtime
	) {
		super(googleRealtime);
	}
}

@Injectable
export class NgGoogleSharingAdaptor extends GoogleSharingAdaptor {
	constructor(
		private drive:NgGoogleDrive,
		private driveAdaptor:NgGoogleDriveAdaptor,
		private realtime:NgGoogleRealtime,
		private realtimeAdaptor:NgGoogleRealtimeAdaptor
	) {
		super(drive, driveAdaptor, realtime, realtimeAdaptor);
	}
}
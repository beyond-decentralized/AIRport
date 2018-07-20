/**
 * Created by Papa on 1/10/2016.
 */

export interface DriveErrorDetail {
	domain:string; // usageLimits
	message:string; // User Rate Limit Exceeded
	reason:string; // userRateLimitExceeded
}

export interface DriveError {
	code:number; // 403
	errors:DriveErrorDetail[]; //
	message:string; // User Rate Limit Exceeded
}

export interface DriveResponseHeaders {
	'cache-control':string; // no-cache, no-store, max-age=0, must-revalidate
	'content-encoding':string; // gzip
	'content-length':string; // 79
	date:string; // Tue, 05 Jan 2016 03:56:37 GMT
	expires:string; // Fri, 01 Jan 1990 00:00:00 GMT
	pragma:string; // no-cache
	server:string; // GSE
	vary:string; // Origin, X-Origin
}

export interface DriveFile {
	id:string;
	kind?:string; // drive#file
	mimeType?:string; // application/vnd.google-apps.spreadsheet
	name?:string;
}

export interface DriveResult {
	id?:string;
	error?:DriveError;
	files?:DriveFile[];
}

export interface DriveResponse {
	body:string;
	headers:DriveResponseHeaders;
	result:DriveResult; // {id: "asdf"}
	status:number; // 200 - success, 403 - error
	statusText:string; // OK
}

export interface DriveResponseCallback {
	(
		error:string,
		response:DriveResponse
	):void;
}

export class MimeTypes {
	static FOLDER = 'application/vnd.google-apps.folder';
	static REALTIME = 'application/vnd.google-apps.drive-sdk';
	static SPREAD_SHEET_BOOK = 'application/vnd.google-apps.spreadsheet';
}

export class DriveConstants {
	static APP_DATA_FOLDER = 'appDataFolder';
	static DRIVE_FOLDER = 'root';
	static DRIVE_SPACE = 'drive';
	static APP_DATA_LIST_FIELDS = 'nextPageToken, files(id, name)';
	static VERSION = 'v3';
}
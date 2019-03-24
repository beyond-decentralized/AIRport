/**
 * Created by Papa on 1/10/2016.
 */
export interface DriveErrorDetail {
    domain: string;
    message: string;
    reason: string;
}
export interface DriveError {
    code: number;
    errors: DriveErrorDetail[];
    message: string;
}
export interface DriveResponseHeaders {
    'cache-control': string;
    'content-encoding': string;
    'content-length': string;
    date: string;
    expires: string;
    pragma: string;
    server: string;
    vary: string;
}
export interface DriveFile {
    id: string;
    kind?: string;
    mimeType?: string;
    name?: string;
}
export interface DriveResult {
    id?: string;
    error?: DriveError;
    files?: DriveFile[];
}
export interface DriveResponse {
    body: string;
    headers: DriveResponseHeaders;
    result: DriveResult;
    status: number;
    statusText: string;
}
export interface DriveResponseCallback {
    (error: string, response: DriveResponse): void;
}
export declare class MimeTypes {
    static FOLDER: string;
    static REALTIME: string;
    static SPREAD_SHEET_BOOK: string;
}
export declare class DriveConstants {
    static APP_DATA_FOLDER: string;
    static DRIVE_FOLDER: string;
    static DRIVE_SPACE: string;
    static APP_DATA_LIST_FIELDS: string;
    static VERSION: string;
}

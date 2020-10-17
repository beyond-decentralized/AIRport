/**
 * Created by Papa on 1/2/2016.
 */
export declare class ApiConstants {
    static URL_PREFIX: string;
    static DRIVE_PREFIX: string;
    static PREFIX: string;
    static APP_FOLDER: string;
    static INSTALL: string;
    static FILE: string;
    static SHEETS: string;
    static PROFILE: string;
    static ALL_SCOPES: string[];
}
export declare class GoogleApi {
    rootUrl: string;
    redirectUri: string;
    constructor();
    mobileAuthenticate(clientId: string, apis: string[], options: any, deferred: any): Promise<any>;
    getMobileAuthUrl(clientId: any, apis: string[]): string;
    authorizeApis(apiKey: string, clientId: string, apis: string[]): Promise<any>;
    loadApi(apiName: string, version: string): Promise<any>;
    request(path: string, method?: string, params?: any, headers?: any, body?: any): Promise<any>;
}
//# sourceMappingURL=GoogleApi.d.ts.map
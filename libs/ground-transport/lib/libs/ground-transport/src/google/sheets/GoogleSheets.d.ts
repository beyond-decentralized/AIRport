import { PromiseHttp } from "../../PromiseHttp";
import { GoogleApi } from '../GoogleApi';
export declare class GoogleSheets {
    private googleApi;
    private promiseHttp;
    urlPrefix: string;
    constructor(googleApi: GoogleApi, promiseHttp: PromiseHttp);
    getSheet(fileId: string): Promise<any>;
    getWorksheets(fileId: string): Promise<any>;
    getRequestOptionsArgs(): any;
    private getListFeedUrl;
    private getWorksheetsUrl;
    private getUrlSuffix;
    addRow(fileId: string, rowXml: string): Promise<any>;
}

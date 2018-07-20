"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Papa on 1/5/2016.
 */
class FeedType {
}
FeedType.WORKSHEETS = 'worksheets';
FeedType.LIST = 'list';
class Scope {
}
Scope.PRIVATE = 'private';
Scope.PUBLIC = 'public';
class ReturnType {
}
ReturnType.FULL = 'full';
class GoogleSheets {
    constructor(googleApi, promiseHttp) {
        this.googleApi = googleApi;
        this.promiseHttp = promiseHttp;
        this.urlPrefix = 'https://spreadsheets.google.com/feeds';
    }
    getSheet(fileId) {
        return this.promiseHttp.get(this.getListFeedUrl(fileId));
    }
    getWorksheets(fileId) {
        return this.googleApi.request(this.getWorksheetsUrl(fileId));
    }
    getRequestOptionsArgs() {
        let headers = {}; //new Headers();
        // headers.append('Authorization', 'GoogleLogin auth=' + 1);
        // headers.append('GData-Version', '3.0');
        let requestOptionsArgs = {
            headers: headers
        };
        return requestOptionsArgs;
    }
    getListFeedUrl(fileId) {
        let url = `${this.urlPrefix}/${FeedType.LIST}/key/${fileId}/${this.getUrlSuffix()}`;
        return url;
    }
    getWorksheetsUrl(fileId) {
        let url = `${this.urlPrefix}/${FeedType.WORKSHEETS}/${fileId}/${this.getUrlSuffix()}`;
        return url;
    }
    getUrlSuffix() {
        let accessToken = gapi.auth.getToken().access_token;
        let suffix = `/private/full/?access_token=${accessToken}`;
        return suffix;
    }
    addRow(fileId, rowXml) {
        return this.promiseHttp.post(this.getListFeedUrl(fileId), rowXml);
    }
}
exports.GoogleSheets = GoogleSheets;
//# sourceMappingURL=GoogleSheets.js.map
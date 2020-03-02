"use strict";
/**
 * Created by Papa on 1/2/2016.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class ApiConstants {
}
exports.ApiConstants = ApiConstants;
ApiConstants.URL_PREFIX = 'https://www.googleapis.com/auth/';
ApiConstants.DRIVE_PREFIX = 'drive.';
ApiConstants.PREFIX = ApiConstants.URL_PREFIX + ApiConstants.DRIVE_PREFIX;
ApiConstants.APP_FOLDER = ApiConstants.PREFIX + 'appfolder';
ApiConstants.INSTALL = ApiConstants.PREFIX + 'install';
ApiConstants.FILE = ApiConstants.PREFIX + 'file';
ApiConstants.SHEETS = 'https://spreadsheets.google.com/feeds';
ApiConstants.PROFILE = 'profile';
ApiConstants.ALL_SCOPES = [ApiConstants.APP_FOLDER, ApiConstants.INSTALL, ApiConstants.FILE, ApiConstants.SHEETS, ApiConstants.PROFILE];
class GoogleApi {
    constructor() {
        this.rootUrl = 'https://accounts.google.com/o/oauth2/auth';
        this.redirectUri = 'http://localhost/callback';
    }
    mobileAuthenticate(clientId, apis, options, deferred) {
        if (options !== undefined) {
            if (options.hasOwnProperty('redirect_uri')) {
                this.redirectUri = options.redirect_uri;
            }
        }
        let url = this.getMobileAuthUrl(clientId, apis);
        let browserRef = window.open(url, '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
        let authenticatePromise = new Promise((resolve, reject) => {
            browserRef.addEventListener('loadstart', (event) => {
                console.log('loadstart, event.url: ' + event.url);
                if ((event.url).indexOf(this.redirectUri) === 0) {
                    browserRef.removeEventListener('exit', function (event) {
                    });
                    browserRef.close();
                    let callbackResponse = (event.url).split('#')[1];
                    let responseParameters = (callbackResponse).split('&');
                    let parameterMap = {};
                    for (let i = 0; i < responseParameters.length; i++) {
                        let keyValue = responseParameters[i].split('=');
                        parameterMap[keyValue[0]] = keyValue[1];
                    }
                    if (parameterMap.access_token !== undefined && parameterMap.access_token !== null) {
                        resolve(parameterMap);
                        // deferred.resolve({ state : parameterMap.state,error : parameterMap.error,
                        // access_token: parameterMap.access_token, token_type:
                        // parameterMap.token_type, expires_in: parameterMap.expires_in });
                    }
                    else {
                        reject('Problem authenticating');
                    }
                }
            });
            browserRef.addEventListener('exit', function (event) {
                reject('The sign in flow was canceled');
            });
        });
        return authenticatePromise;
    }
    getMobileAuthUrl(clientId, apis) {
        let url = `${this.rootUrl}?client_id=${clientId}&redirect_uri=${this.redirectUri}&scope=${apis.join(' ')}&approval_prompt=force&response_type=token`;
        return url;
    }
    authorizeApis(apiKey, clientId, apis) {
        let initializeApiPromise = new Promise((resolve, reject) => {
            let scopeCallbacks = [];
            try {
                if (apiKey) {
                    gapi.client.setApiKey(apiKey);
                }
                gapi.auth.authorize({
                    client_id: clientId,
                    scope: apis.join(' '),
                    immediate: false
                }, (authResult) => {
                    if (authResult && !authResult.error) {
                        resolve(gapi);
                    }
                    else {
                        reject(authResult.error);
                    }
                });
            }
            catch (error) {
                reject(error);
            }
        });
        return initializeApiPromise;
    }
    loadApi(apiName, version) {
        return Promise.resolve().then(() => {
            if (version) {
                return gapi.client.load(apiName, version);
            }
            else {
                // 				return <Promise<any>><any>gapi.load(apiName, undefined);
                throw new Error(`Google API Version must be specified.`);
            }
        });
    }
    request(path, method, params, headers, body) {
        return new Promise((resolve, reject) => {
            resolve();
        }).then(() => {
            return gapi.client.request({
                path: path,
                method: method,
                params: params,
                headers: headers,
                body: body
            });
        });
    }
}
exports.GoogleApi = GoogleApi;
//# sourceMappingURL=GoogleApi.js.map
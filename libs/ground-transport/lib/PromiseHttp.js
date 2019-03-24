"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Papa on 1/5/2016.
 */
class PromiseHttp {
    constructor(
    // private http:Http
    ) {
    }
    // {
    // 	let getRequest = this.http.post(url, data, requestOptionsArgs);
    // 	return this.asPromise(getRequest);
    // }
    asPromise(observable) {
        return new Promise((resolve, reject) => {
            observable.subscribe((response) => {
                resolve(response);
            }, (error) => {
                reject(error);
            });
        });
    }
}
exports.PromiseHttp = PromiseHttp;
//# sourceMappingURL=PromiseHttp.js.map
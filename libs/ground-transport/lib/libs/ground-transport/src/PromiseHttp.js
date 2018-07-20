"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/operator/map");
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
            observable.map((response) => {
                return response;
            }).subscribe((response) => {
                resolve(response);
            }, (error) => {
                reject(error);
            });
        });
    }
}
exports.PromiseHttp = PromiseHttp;
//# sourceMappingURL=PromiseHttp.js.map
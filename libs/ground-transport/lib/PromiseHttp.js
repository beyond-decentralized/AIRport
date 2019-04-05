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
            let completed = false;
            const subscription = observable.subscribe((response) => {
                completed = true;
                if (subscription) {
                    subscription.unsubscribe();
                }
                resolve(response);
            }, (error) => {
                reject(error);
            });
            if (completed) {
                subscription.unsubscribe();
            }
        });
    }
}
exports.PromiseHttp = PromiseHttp;
//# sourceMappingURL=PromiseHttp.js.map
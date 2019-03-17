"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("../Observable");
function pipe(sourceObservable, callback) {
    // if (!(sourceObservable instanceof Observable)) {
    // 	throw 'only @airport/observer/Observable is supported'
    // }
    const targetObservable = Observable_1.Observable.from(sourceObservable);
    const persistentContext = {
        numCombinedLatest: -1,
        targetObservable
    };
    targetObservable.callback = (value, context) => {
        context.persistent = persistentContext;
    };
    return targetObservable;
}
exports.pipe = pipe;
//# sourceMappingURL=pipe.js.map
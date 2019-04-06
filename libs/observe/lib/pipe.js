"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("./Observable");
function pipe(sourceObservable, callback) {
    {
        // if (!(sourceObservable instanceof Observable)) {
        // 	throw 'only @airport/observer/Observable is supported'
        // }
        const targetObservable = Observable_1.Observable.from(sourceObservable);
        const persistentContext = {
            targetObservable
        };
        targetObservable.callback = callback;
        /*
                targetObservable.callback = (
                    context
                ) => {
                    context.persistent = persistentContext

                    if (sourceObservable.upstream.length > 1) {
                        const currentValues: Array<any> = sourceObservable.currentValue as any
                        return callback(...[...currentValues, context])
                    } else {
                        return callback(sourceObservable.currentValue, context)
                    }
                }
        */
        return targetObservable;
    }
}
exports.pipe = pipe;
//# sourceMappingURL=pipe.js.map
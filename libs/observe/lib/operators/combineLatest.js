"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("../Observable");
function combineLatest(observables, context, callback) {
    context.combineLatestCounter++;
    const persistentContext = context.peristent;
    if (persistentContext.numCombinedLatest < context.combineLatestCounter) {
        persistentContext.numCombinedLatest.combineLatestCounter++;
        observables.forEach(observable => {
            const childObservable = Observable_1.Observable.from(observable);
            childObservable.exec = (value, callbackName, context) => {
                context.observable.exec(context.observable.currentValue, callbackName, {
                    combineLatestCounter: observables.length,
                    currentValue: this.observable.currentValue,
                    lastValue: this.observable.lastValue,
                    observable: context.observable
                });
            };
        });
    }
    return callback(...[context.observable.currentValue,
        ...observables.map(observable => observable.currentValue),
        context
    ]);
}
exports.combineLatest = combineLatest;
//# sourceMappingURL=combineLatest.js.map
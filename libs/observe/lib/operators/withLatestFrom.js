"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: re-implement, if needed
function withLatestFrom(observables, context, callback) {
    return callback(...[context.observable.currentValue,
        ...observables.map(observable => observable.currentValue),
        context
    ]);
}
exports.withLatestFrom = withLatestFrom;
//# sourceMappingURL=withLatestFrom.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function withLatestFrom(observables, context, callback) {
    return callback(...[context.observable.currentValue,
        ...observables.map(observable => observable.currentValue),
        context
    ]);
}
exports.withLatestFrom = withLatestFrom;
//# sourceMappingURL=withLatestFrom.js.map
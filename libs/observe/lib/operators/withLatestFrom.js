// TODO: re-implement, if needed
export function withLatestFrom(observables, context, callback) {
    return callback(...[context.observable.currentValue,
        ...observables.map(observable => observable.currentValue),
        context
    ]);
}
//# sourceMappingURL=withLatestFrom.js.map
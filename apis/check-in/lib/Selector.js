"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const observe_1 = require("@airport/observe");
function createSelector(...args) {
    let numInputSelectors;
    switch (args.length) {
        case 0:
        case 1:
            throw new Error(`Invalid createSelector call.`);
        case 2:
        case 3:
        case 4:
            numInputSelectors = args.length - 1;
        default:
            throw new Error(`
			Invalid createSelector call, too many input selectors.
			Expecting 0 to 3.
			`);
    }
    const inputSelectors = args.slice(0, args.length);
    const callback = args[args.length - 1];
    let observable = inputSelectors[0].observable;
    let combine;
    if (inputSelectors.length > 1) {
        const additionalObservables = [];
        for (let i = 1; i < inputSelectors.length; i++) {
            additionalObservables.push(inputSelectors[i].observable);
        }
        combine = (ctx) => observe_1.combineLatest(additionalObservables, callback);
    }
    if (combine) {
        observable = observe_1.pipe(observable, (v, ctx) => observe_1.share(observe_1.distinctUntilChanged(combine(v), ctx), ctx));
    }
    else {
        observable = observe_1.pipe(observable, (v, ctx) => observe_1.share(observe_1.distinctUntilChanged(observe_1.map(callback), ctx), ctx));
    }
    const selector = function (
    // otherStateObservable?: Observable<SV>
    ) {
        // if (otherStateObservable) {
        // 	throw new Error(`Not implemented`)
        // }
        return getCurrentValue(this.observable);
    };
    selector.observable = observable;
    return selector;
}
exports.createSelector = createSelector;
function createRootSelector(stateObservable) {
    const rootSelector = function (
    // otherStateObservable?: Observable<SV>
    ) {
        // if (otherStateObservable) {
        // 	throw new Error(`Not implemented`)
        // }
        return getCurrentValue(this.observable);
    };
    rootSelector.observable = stateObservable;
    return rootSelector;
}
exports.createRootSelector = createRootSelector;
function getCurrentValue(observable) {
    let currentValue;
    this.observable.subscribe(value => currentValue = value).unsubscribe();
    return currentValue;
}
//# sourceMappingURL=Selector.js.map
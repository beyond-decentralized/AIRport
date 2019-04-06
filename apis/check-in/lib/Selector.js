"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const observe_1 = require("@airport/observe");
function createSelector(...args) {
    if (args.length < 2 || args.length > 6) {
        throw new Error(`Invalid createSelector call, Expecting 1 to 3 selectors and a callback.`);
    }
    const inputSelectors = args.slice(0, args.length - 1);
    const callback = args[args.length - 1];
    let observable;
    if (inputSelectors.length > 1) {
        observable = observe_1.Observable.from(...inputSelectors.map(selector => selector.observable));
    }
    else {
        observable = inputSelectors[0].observable;
    }
    observable = observe_1.pipe(observable, (v, ctx) => 
    // share(
    observe_1.distinctUntilChanged(callback(v), ctx));
    return getSelector(observable);
}
exports.createSelector = createSelector;
function createRootSelector(stateObservable) {
    return getSelector(stateObservable);
}
exports.createRootSelector = createRootSelector;
function getSelector(observable) {
    let selector = (function (
    // otherStateObservable?: Observable<SV>
    ) {
        let currentValue;
        observable.subscribe(value => currentValue = value).unsubscribe();
        return currentValue;
    });
    selector.observable = observable;
    return selector;
}
//# sourceMappingURL=Selector.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const observe_1 = require("@airport/observe");
function createSelector(...args) {
    if (args.length < 2 || args.length > 6) {
        throw new Error(`Invalid createSelector call, Expecting 1 to 5 selectors and a callback.`);
    }
    const inputSelectors = args.slice(0, args.length - 1);
    const callback = args[args.length - 1];
    let sourceObservable;
    if (inputSelectors.length > 1) {
        sourceObservable = observe_1.Observable.from(...inputSelectors.map(selector => selector.observable));
    }
    else {
        sourceObservable = inputSelectors[0].observable;
    }
    let observable = sourceObservable.pipe(
    // share() TODO: implement once RxJs support is added
    observe_1.distinctUntilChanged());
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
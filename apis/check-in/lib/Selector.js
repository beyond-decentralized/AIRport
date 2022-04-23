import { DEPENDENCY_INJECTION } from '@airport/direction-indicator';
import { from } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { SELECTOR_MANAGER } from './tokens';
export class SelectorManager {
    createSelector(...args) {
        if (args.length < 2 || args.length > 6) {
            throw new Error(`Invalid createSelector call, Expecting 1 to 5 selectors and a callback.`);
        }
        const inputSelectors = args.slice(0, args.length - 1);
        const callback = args[args.length - 1];
        let sourceObservable;
        if (inputSelectors.length > 1) {
            // TODO: check if this will work
            sourceObservable = from(inputSelectors.map(selector => selector.observable));
        }
        else {
            sourceObservable = inputSelectors[0].observable;
        }
        let observable = sourceObservable.pipe(
        // share() TODO: implement once RxJs support is added
        distinctUntilChanged(), map(value => callback(value)));
        return this.getSelector(observable);
    }
    createRootSelector(stateObservable) {
        return this.getSelector(stateObservable);
    }
    getSelector(observable) {
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
}
DEPENDENCY_INJECTION.set(SELECTOR_MANAGER, SelectorManager);
//# sourceMappingURL=Selector.js.map
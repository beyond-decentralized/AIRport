import { DI } from '@airport/di';
import { SELECTOR_MANAGER } from './tokens';
export class SelectorManager {
    async init() {
        const { distinctUntilChanged, map } = await import('rxjs/operators');
        const { from } = await import('rxjs');
        this.distinctUntilChanged = distinctUntilChanged;
        this.from = from;
        this.map = map;
    }
    createSelector(...args) {
        if (args.length < 2 || args.length > 6) {
            throw new Error(`Invalid createSelector call, Expecting 1 to 5 selectors and a callback.`);
        }
        const inputSelectors = args.slice(0, args.length - 1);
        const callback = args[args.length - 1];
        let sourceObservable;
        if (inputSelectors.length > 1) {
            // TODO: check if this will work
            sourceObservable = this.from(inputSelectors.map(selector => selector.observable));
        }
        else {
            sourceObservable = inputSelectors[0].observable;
        }
        let observable = sourceObservable.pipe(
        // share() TODO: implement once RxJs support is added
        this.distinctUntilChanged(), this.map(value => callback(value)));
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
DI.set(SELECTOR_MANAGER, SelectorManager);
//# sourceMappingURL=Selector.js.map
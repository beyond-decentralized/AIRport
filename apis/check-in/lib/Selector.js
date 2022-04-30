var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injected } from '@airport/direction-indicator';
import { from } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
let SelectorManager = class SelectorManager {
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
};
SelectorManager = __decorate([
    Injected()
], SelectorManager);
export { SelectorManager };
//# sourceMappingURL=Selector.js.map
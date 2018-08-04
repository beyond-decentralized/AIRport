import { Observable } from 'rxjs';
/**
 *
 * Selectors should work with both Observables and as just functions
 *
 * Will there ever be a need to reuse selectors across multiple stores? Probably will be.
 * Selectors should handle a passed in value or a passed in observable.  However a memoized
 * selector always remembers the last values of it's input selector or the store.  So, if it is
 * used with multiple stores it needs to know every observable that represents every store.
 *
 *
 */
export interface IMemoizedSelector<V, SV> extends Function {
    (): V;
    observable: Observable<V>;
}
export declare function createSelector<V1, V, SV>(selector1: IMemoizedSelector<V1, SV>, callback: (value1: V1) => V): IMemoizedSelector<V, SV>;
export declare function createSelector<V1, V2, V, SV>(selector1: IMemoizedSelector<V1, SV>, selector2: IMemoizedSelector<V2, SV>, callback: (value1: V1, value2: V2) => V): IMemoizedSelector<V, SV>;
export declare function createSelector<V1, V2, V3, V, SV>(selector1: IMemoizedSelector<V1, SV>, selector2: IMemoizedSelector<V2, SV>, selector3: IMemoizedSelector<V3, SV>, callback: (value1: V1, value2: V2, value3: V3) => V): IMemoizedSelector<V, SV>;
export declare function createRootSelector<SV>(stateObservable: Observable<SV>): IMemoizedSelector<SV, SV>;

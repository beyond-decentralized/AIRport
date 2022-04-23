import { DEPENDENCY_INJECTION } from '@airport/direction-indicator';
import {
	Observable,
	from
} from 'rxjs';
import {
	distinctUntilChanged,
	map
} from 'rxjs/operators'
import { SELECTOR_MANAGER } from './tokens';

/**
 *
 * Selectors should work with both Observables and as just functions
 *
 * Will there ever be a need to reuse selectors across multiple stores? Probably will be.
 * Selectors should handle a passed in value or a passed in observable.  However a
 * memoized selector always remembers the last values of it's input selector or the
 * store.  So, if it is used with multiple stores it needs to know every observable that
 * represents every store.
 *
 *
 */

export interface IMemoizedSelector<V, SV>
	extends Function {
	(
		/**
		 * If called with observable, selector will return the currently computed value for
		 * the state behind that observable.  Otherwise it will return the current state of
		 * the default observable state.
		 *
		 * NOTE: currently not implemented
		 */
		// stateObservable?: Observable<SV>
	): V;

	observable: Observable<V>;
}

export interface ISelectorManager {
	createSelector<V1, V, SV>(
		selector1: IMemoizedSelector<V1, SV>,
		callback: (
			value1: V1
		) => V
	): IMemoizedSelector<V, SV>

	createSelector<V1, V2, V, SV>(
		selector1: IMemoizedSelector<V1, SV>,
		selector2: IMemoizedSelector<V2, SV>,
		callback: (
			value1: V1,
			value2: V2
		) => V
	): IMemoizedSelector<V, SV>

	createSelector<V1, V2, V3, V, SV>(
		selector1: IMemoizedSelector<V1, SV>,
		selector2: IMemoizedSelector<V2, SV>,
		selector3: IMemoizedSelector<V3, SV>,
		callback: (
			value1: V1,
			value2: V2,
			value3: V3,
		) => V
	): IMemoizedSelector<V, SV>

	createSelector<V1, V2, V3, V4, V, SV>(
		selector1: IMemoizedSelector<V1, SV>,
		selector2: IMemoizedSelector<V2, SV>,
		selector3: IMemoizedSelector<V3, SV>,
		selector4: IMemoizedSelector<V4, SV>,
		callback: (
			value1: V1,
			value2: V2,
			value3: V3,
			value4: V4,
		) => V
	): IMemoizedSelector<V, SV>

	createSelector<V1, V2, V3, V4, V5, V, SV>(
		selector1: IMemoizedSelector<V1, SV>,
		selector2: IMemoizedSelector<V2, SV>,
		selector3: IMemoizedSelector<V3, SV>,
		selector4: IMemoizedSelector<V4, SV>,
		selector5: IMemoizedSelector<V5, SV>,
		callback: (
			value1: V1,
			value2: V2,
			value3: V3,
			value4: V4,
			value5: V5,
		) => V
	): IMemoizedSelector<V, SV>

	createSelector<V, SV>(
		...args: any[]
	)

	createRootSelector<SV>(
		stateObservable: Observable<SV>
	): IMemoizedSelector<SV, SV>

}

export class SelectorManager
	implements ISelectorManager {

	createSelector<V1, V, SV>(
		selector1: IMemoizedSelector<V1, SV>,
		callback: (
			value1: V1
		) => V
	): IMemoizedSelector<V, SV>
	createSelector<V1, V2, V, SV>(
		selector1: IMemoizedSelector<V1, SV>,
		selector2: IMemoizedSelector<V2, SV>,
		callback: (
			value1: V1,
			value2: V2
		) => V
	): IMemoizedSelector<V, SV>
	createSelector<V1, V2, V3, V, SV>(
		selector1: IMemoizedSelector<V1, SV>,
		selector2: IMemoizedSelector<V2, SV>,
		selector3: IMemoizedSelector<V3, SV>,
		callback: (
			value1: V1,
			value2: V2,
			value3: V3,
		) => V
	): IMemoizedSelector<V, SV>
	createSelector<V1, V2, V3, V4, V, SV>(
		selector1: IMemoizedSelector<V1, SV>,
		selector2: IMemoizedSelector<V2, SV>,
		selector3: IMemoizedSelector<V3, SV>,
		selector4: IMemoizedSelector<V4, SV>,
		callback: (
			value1: V1,
			value2: V2,
			value3: V3,
			value4: V4,
		) => V
	): IMemoizedSelector<V, SV>
	createSelector<V1, V2, V3, V4, V5, V, SV>(
		selector1: IMemoizedSelector<V1, SV>,
		selector2: IMemoizedSelector<V2, SV>,
		selector3: IMemoizedSelector<V3, SV>,
		selector4: IMemoizedSelector<V4, SV>,
		selector5: IMemoizedSelector<V5, SV>,
		callback: (
			value1: V1,
			value2: V2,
			value3: V3,
			value4: V4,
			value5: V5,
		) => V
	): IMemoizedSelector<V, SV>
	createSelector<V, SV>(
		...args: any[]
	) {
		if (args.length < 2 || args.length > 6) {
			throw new Error(`Invalid createSelector call, Expecting 1 to 5 selectors and a callback.`);
		}

		const inputSelectors: IMemoizedSelector<any, SV>[] = args.slice(0, args.length - 1);
		const callback = args[args.length - 1];

		let sourceObservable;
		if (inputSelectors.length > 1) {
			// TODO: check if this will work
			sourceObservable = from(inputSelectors.map(
				selector => selector.observable));
		} else {
			sourceObservable = inputSelectors[0].observable;
		}
		let observable = sourceObservable.pipe(
			// share() TODO: implement once RxJs support is added
			distinctUntilChanged(),
			map(
				value => callback(value))
		);

		return this.getSelector(observable);
	}

	createRootSelector<SV>(
		stateObservable: Observable<SV>
	): IMemoizedSelector<SV, SV> {
		return this.getSelector(stateObservable);
	}

	private getSelector<SV>(
		observable: Observable<SV>
	) {
		let selector = <IMemoizedSelector<SV, SV>>(function (
			// otherStateObservable?: Observable<SV>
		) {
			let currentValue;

			observable.subscribe(
				value =>
					currentValue = value
			).unsubscribe();

			return currentValue;
		});

		selector.observable = observable;

		return selector;
	}

}

DEPENDENCY_INJECTION.set(SELECTOR_MANAGER, SelectorManager);




import {
	combineLatest,
	Observable
} from 'rxjs'
import {
	distinctUntilChanged,
	map,
	share
} from 'rxjs/operators'

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
	(
		/**
		 * If called with observable, selector will return the currently computed value for the
		 * state behind that observable.  Otherwise it will return the current state of the default
		 * observable state.
		 *
		 * NOTE: currently not implemented
		 */
		// stateObservable?: Observable<SV>
	): V;

	observable: Observable<V>;
}

export function createSelector<V1, V, SV>(
	selector1: IMemoizedSelector<V1, SV>,
	callback: (
		value1: V1
	) => V
): IMemoizedSelector<V, SV>
export function createSelector<V1, V2, V, SV>(
	selector1: IMemoizedSelector<V1, SV>,
	selector2: IMemoizedSelector<V2, SV>,
	callback: (
		value1: V1,
		value2: V2
	) => V
): IMemoizedSelector<V, SV>
export function createSelector<V1, V2, V3, V, SV>(
	selector1: IMemoizedSelector<V1, SV>,
	selector2: IMemoizedSelector<V2, SV>,
	selector3: IMemoizedSelector<V3, SV>,
	callback: (
		value1: V1,
		value2: V2,
		value3: V3,
	) => V
): IMemoizedSelector<V, SV>
export function createSelector<V, SV>(
	...args: any[]
) {
	let numInputSelectors
	switch (args.length) {
		case 0:
		case 1:
			throw new Error(`Invalid createSelector call.`)
		case 2:
		case 3:
		case 4:
			numInputSelectors = args.length - 1
		default:
			throw new Error(`
			Invalid createSelector call, too many input selectors.
			Expecting 0 to 3.
			`)
	}

	const inputSelectors: IMemoizedSelector<any, SV>[] = args.slice(0, args.length)
	const callback = args[args.length - 1]

	let observable = inputSelectors[0].observable

	let combine
	if (inputSelectors.length > 1) {
		const additionalObservables = []
		for (let i = 1; i < inputSelectors.length; i++) {
			additionalObservables.push(inputSelectors[i].observable)
		}
		combine = combineLatest(...additionalObservables, callback)
	}

	if (combine) {
		observable = observable.pipe(
			combine,
			distinctUntilChanged(),
			share()
		)
	} else {
		observable = observable.pipe(
			map(callback),
			distinctUntilChanged(),
			share()
		)
	}

	const selector = <IMemoizedSelector<V, SV>>function (
		// otherStateObservable?: Observable<SV>
	) {
		// if (otherStateObservable) {
		// 	throw new Error(`Not implemented`)
		// }

		return getCurrentValue(this.observable)
	}
	selector.observable = observable

	return selector
}

export function createRootSelector<SV>(
	stateObservable: Observable<SV>
): IMemoizedSelector<SV, SV> {

	const rootSelector = <IMemoizedSelector<SV, SV>>function (
		// otherStateObservable?: Observable<SV>
	) {
		// if (otherStateObservable) {
		// 	throw new Error(`Not implemented`)
		// }

		return getCurrentValue(this.observable)
	}
	rootSelector.observable = stateObservable

	return rootSelector
}

function getCurrentValue<V>(
	observable: Observable<V>
) {
	let currentValue
	this.observable.subscribe(
		value =>
			currentValue = value
	).unsubscribe()

	return currentValue
}
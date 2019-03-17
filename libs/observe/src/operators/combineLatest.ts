import {
	IObservable,
	Observable
} from '../Observable'

export function combineLatest<V1, V2, R>(
	os: [IObservable<V1>, IObservable<V2>],
	context: any,
	project: (
		v1: V1,
		v2: V2
	) => R
): IObservable<R>;
export function combineLatest<V1, V2, V3, R>(
	os: [IObservable<V1>, IObservable<V2>, IObservable<V3>],
	context: any,
	project: (
		v1: V1,
		v2: V2,
		v3: V3
	) => R
): IObservable<R>;
export function combineLatest<V, R>(
	observables: IObservable<unknown>[],
	context: any,
	callback: { (...args: unknown[]): R }
): R {
	context.combineLatestCounter++

	const persistentContext = context.peristent

	if (persistentContext.numCombinedLatest < context.combineLatestCounter) {
		persistentContext.numCombinedLatest.combineLatestCounter++
		observables.forEach(
			observable => {
				const childObservable = Observable.from(observable)
				childObservable.exec  = (
					value: V,
					callbackName: 'onError' | 'onNext',
					context
				) => {
					context.observable.exec(
						context.observable.currentValue,
						callbackName,
						{
							combineLatestCounter: observables.length,
							currentValue: this.observable.currentValue,
							lastValue: this.observable.lastValue,
							observable: context.observable
						})
				}
			}
		)
	}
	return callback(...[context.observable.currentValue,
		...observables.map(
			observable => observable.currentValue),
		context
	])
}
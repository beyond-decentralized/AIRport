import {IObservable} from '../Observable'

export function withLatestFrom<V, V2, R>(
	os: [IObservable<V2>],
	context: any,
	project: (
		v1: V,
		v2: V2
	) => R
): IObservable<R>;
export function withLatestFrom<V1, V2, V3, R>(
	os: [IObservable<V1>, IObservable<V2>, IObservable<V3>],
	context: any,
	project: (
		v1: V1,
		v2: V2,
		v3: V3
	) => R
): IObservable<R>;
export function withLatestFrom<V, R>(
	observables: IObservable<unknown>[],
	context: any,
	callback: { (...args: unknown[]): R }
): R {
	return callback(...[context.observable.currentValue,
		...observables.map(
			observable => observable.currentValue),
		context
	])
}
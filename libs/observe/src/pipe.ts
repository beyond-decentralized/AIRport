import {
	IObservable,
	Observable
} from './Observable'

export function pipe<V, R = V>(
	sourceObservable: IObservable<R>,
	callback: {
		(
			value: V,
			context: any
		): R
	}
): IObservable<R>
export function pipe<S1, S2, R>(
	sourceObservable: IObservable<R>,
	callback: {
		(
			value1: S1,
			value2: S2,
			context: any
		): R
	}
): IObservable<R>
export function pipe<S1, S2, S3, R>(
	sourceObservable: IObservable<R>,
	callback: {
		(
			value1: S1,
			value2: S2,
			value3: S3,
			context: any
		): R
	}
): IObservable<R>
export function pipe<S1, S2, S3, S4, R>(
	sourceObservable: IObservable<R>,
	callback: {
		(
			value1: S1,
			value2: S2,
			value3: S3,
			value4: S4,
			context: any
		): R
	}
): IObservable<R>
export function pipe<S1, S2, S3, S4, S5, R>(
	sourceObservable: IObservable<R>,
	callback: {
		(
			value1: S1,
			value2: S2,
			value3: S3,
			value4: S4,
			value5: S5,
			context: any
		): R
	}
): IObservable<R>
export function pipe<V>(
	sourceObservable: IObservable<V>,
	callback
) {
	{
		// if (!(sourceObservable instanceof Observable)) {
		// 	throw 'only @airport/observer/Observable is supported'
		// }
		const targetObservable: Observable<any>
			                        = Observable.from(sourceObservable) as any
		const persistentContext   = {
			targetObservable
		}
		targetObservable.callback = callback

		/*
				targetObservable.callback = (
					context
				) => {
					context.persistent = persistentContext

					if (sourceObservable.upstream.length > 1) {
						const currentValues: Array<any> = sourceObservable.currentValue as any
						return callback(...[...currentValues, context])
					} else {
						return callback(sourceObservable.currentValue, context)
					}
				}
		*/

		return targetObservable
	}
}

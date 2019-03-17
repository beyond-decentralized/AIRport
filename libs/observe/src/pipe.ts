import {
	IObservable,
	Observable
} from './Observable'

export function pipe<V, R = V>(
	sourceObservable: IObservable<V>,
	callback: {
		(
			value: V,
			context: any
		): R
	}
): IObservable<R> {
	// if (!(sourceObservable instanceof Observable)) {
	// 	throw 'only @airport/observer/Observable is supported'
	// }
	const targetObservable: Observable<any> = Observable.from(sourceObservable) as any
	const persistentContext                 = {
		numCombinedLatest: -1,
		targetObservable
	}

	targetObservable.callback = (
		value,
		context
	) => {
		context.persistent = persistentContext
	}

	return targetObservable
}
import {IObservable} from '../Observable'

export function pipe<V, R = V>(
	observable: IObservable<V>,
	callback: {
		(
			value: V,
			context: any
		): R
	}
): IObservable<R> {
	return null
}
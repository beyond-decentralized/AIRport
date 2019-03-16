import {IObserver}     from './Observer'
import {ISubscription} from './Subscription'

/**
 * An Observable represents a sequence of values which may be observed.
 */
export interface IObservable<V> {

	// Subscribes to the sequence with an observer
	subscribe(observer: IObserver<V>): ISubscription

	// Subscribes to the sequence with callbacks
	subscribe(
		onNext: { (value: V): void },
		onError?: Function,
		onComplete?: Function
	): ISubscription

}
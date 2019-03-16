import {IObservable}   from './Observable'
import {IObserver}     from './Observer'
import {ISubscription} from './Subscription'

export interface ISubject<V>
	extends IObservable<V>,
	        IObserver<V> {
}

export class Subject<V>
	implements ISubject<V> {

	constructor(
		private unsubscribeCallback: () => void
	) {
	}

	complete(): void {
	}

	error(errorValue): void {
	}

	next(value: V): void {
	}

	start(subscription: ISubscription): void {
	}

	subscribe(observer: IObserver<V>): ISubscription
	subscribe(
		onNext: { (value: V): void },
		onError?: Function,
		onComplete?: Function
	): ISubscription
	subscribe(
		observer: IObserver<V> | { (value: V): void },
		onError?: Function,
		onComplete?: Function
	): ISubscription {
		if(!(observer instanceof Function)) {
			throw 'Subjects can only be subscribed to with functions'
		}

		return undefined;
	}

}
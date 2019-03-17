import {
	IObservable,
	Observable
}                  from './Observable'
import {IObserver} from './Observer'

export interface ISubject<V>
	extends IObservable<V>,
	        IObserver<V> {
}

export class Subject<V>
	extends Observable<V>
	implements ISubject<V> {


	// complete(): void {
	// }

	error(errorValue: any): void {
		this.exec(errorValue, 'onError')
	}

	next(value: V): void {
		this.exec(value, 'onNext')
	}

	// start(subscription: ISubscription): void {
	// }

}

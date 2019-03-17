import {
	ISubscription,
	Subscription
} from './Subscription'

/**
 * An Observable represents a sequence of values which may be observed.
 */
export interface IObservable<V> {

	// Subscribes to the sequence with an observer
	// subscribe(observer: IObserver<V>): ISubscription

	// Subscribes to the sequence with callbacks
	subscribe(
		onNext: { (value: V): void },
		onError?: Function,
		onComplete?: Function
	): ISubscription

	exec(
		value: V,
		callbackName: 'onError' | 'onNext',
		context: any
	): void

	parent: Observable<any>
	children: IObservable<any>[]

	currentValue: V
	lastValue: V
}

export class Observable<V>
	implements IObservable<V> {

	static from(
		sourceObservable: IObservable<any>
	): IObservable<any> {
		// if (!(sourceObservable instanceof Observable)) {
		// 	throw 'only @airport/observer/Observable is supported'
		// }
		const targetObservable: IObservable<any> = new Observable<any>()
		sourceObservable.children.push(targetObservable)

		return targetObservable
	}

	callback: {
		(
			value: V,
			context: any
		): any
	}

	parent: Observable<any>
	children: IObservable<any>[] = []

	currentValue: V
	lastValue: V

	subscriptions: Subscription[] = []

	exec(
		value: V,
		callbackName: 'onError' | 'onNext',
		context: any = {
			combineLatestCounter: -1,
			currentValue: this.currentValue,
			lastValue: this.lastValue,
			observable: this
		},
	): void {
		if (!this.subscriptions.length) {
			return
		}
		if (value === undefined) {
			return
		}

		const lastValue = this.currentValue


		if (this.callback) {
			value = this.callback(value, context)
		} else {
			value = value
		}

		if (value === undefined) {
			return
		}

		this.lastValue    = lastValue
		this.currentValue = value

		this.subscriptions.forEach(
			subscription => {
				(subscription[callbackName] as { (error: any): void })(value)
			})

		this.children.forEach(
			observable => {
				context.combineLatestCounter = -1
				context.currentValue         = this.currentValue
				context.lastValue            = this.lastValue
				context.observable           = observable
				if (observable.exec)
					observable.exec(value, context, callbackName)
			})
	}

	// subscribe(
	// 	observer: IObserver<V>
	// ): ISubscription
	subscribe(
		onNext: { (value: V): void },
		onError?: { (value: any): void },
		onComplete?: Function
	): ISubscription
	// subscribe(
	// 	observer: IObserver<V> | { (value: V): void },
	// 	onError?: Function,
	// 	onComplete?: Function
	// ): ISubscription
	{
		// if (!(observer instanceof Function)) {
		// 	throw 'Subjects can only be subscribed to with functions'
		// }

		const subscription = new Subscription(this, onNext, onError, onComplete)

		this.subscriptions.push(subscription)

		if (this.currentValue !== undefined) {
			this.exec(this.currentValue, 'onNext')
		}

		return subscription
	}

}

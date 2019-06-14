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

	upstream: IObservable<any>[]
	downstream: IObservable<any>[]

	currentValue: V
	// lastValue: V
}

export class Observable<V>
	implements IObservable<V> {

	static from(
		...sourceObservables: (IObservable<any> | Promise<IObservable<any>>)[]
	): IObservable<any> {
		// if (!(sourceObservable instanceof Observable)) {
		// 	throw 'only @airport/observer/Observable is supported'
		// }
		const targetObservable: IObservable<any> = new Observable<any>()
		sourceObservables.forEach(
			aSourceObservable => {
				if (aSourceObservable instanceof Promise) {
					aSourceObservable.then(
						sourceObservable => {
							sourceObservable.downstream.push(targetObservable)
							targetObservable.upstream.push(sourceObservable)
						})
				} else {
					aSourceObservable.downstream.push(targetObservable)
					targetObservable.upstream.push(aSourceObservable)
				}
			})

		return targetObservable
	}

	constructor(
		private onUnsubscribe?: () => void
	) {
	}

	callback

	upstream: Observable<any>[]   = []
	up$LastVal
	downstream: Observable<any>[] = []

	currentValue: V
	lastValue: V

	numDownstreamSubscriptions = 0

	subscriptions: Subscription[] = []

	exec(
		value: V,
		callbackName: 'onError' | 'onNext',
		upstreamObservable?: Observable<any>,
		context: any = this.getDefaultContext(),
	): void {
		if (!this.subscriptions.length
			&& !this.numDownstreamSubscriptions
			|| value === undefined) {
			return
		}

		// this.lastValue = this.currentValue

		if (this.callback) {
			const value       = this.currentValue
			this.currentValue = undefined
			this.currentValue = this.valueFromUpstream()
			if (this.currentValue === undefined) {
				this.currentValue = value
			}
		} else {
			this.currentValue = value
		}

		this.subscriptions.forEach(
			subscription => {
				subscription[callbackName](this.currentValue)
				// if (this.currentValue instanceof Array) {
				// 	(subscription[callbackName] as any)(...this.currentValue)
				// } else {
				// 	subscription[callbackName](this.currentValue)
				// }
			})

		this.downstream.forEach(
			observable => {
				context.currentValue = this.currentValue
				// context.lastValue    = this.lastValue
				context.observable   = observable
				// if (observable.exec) {
				observable.exec(this.currentValue, callbackName, this, context)
				// }
			})
	}

	// subscribe(
	// 	observer: IObserver<V>
	// ): ISubscription
	subscribe(
		onNext: { (value: any): void },
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

		const subscription = new Subscription(
			this,
			onNext,
			onError,
			onComplete,
			this.onUnsubscribe
		)

		this.subscriptions.push(subscription)
		this.subscribeUpstream()

		onNext(this.valueFromUpstream())


		return subscription
	}

	unsubscribeUpstream() {
		for (const up of this.upstream) {
			up.numDownstreamSubscriptions--
			up.unsubscribeUpstream()
		}
	}

	private valueFromUpstream(): V {
		if (this.currentValue !== undefined) {
			return this.currentValue
		}
		const values = this.upstream.map(
			upstreamObservable =>
				upstreamObservable.valueFromUpstream()
		)
		switch (values.length) {
			case 0:
				break
			case 1: {
				if (this.callback) {
					this.currentValue = this.callback(...[...values, this.getDefaultContext()])
				} else {
					this.currentValue = values as any
				}
				break
			}
			default: {
				if (this.callback) {
					this.currentValue = this.callback(values, this.getDefaultContext())
				} else {
					this.currentValue = values as any
				}
				break
			}
		}

		return this.currentValue
	}

	private getDefaultContext() {
		return {
			$: this
		}
	}

	private subscribeUpstream(): void {
		for (const up of this.upstream) {
			up.numDownstreamSubscriptions++
			up.subscribeUpstream()
		}
	}

}

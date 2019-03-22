import {Observable} from './Observable'

export interface ISubscription {

	// Cancels the subscription
	unsubscribe(): void

	// A boolean value indicating whether the subscription is closed
	closed: boolean

}

export class Subscription
	implements ISubscription {

	private _closed = false

	constructor(
		private observable: Observable<any>,
		public onNext: { (value: any): void },
		public onError?: { (error: any): void },
		public onComplete?: Function,
		public onUnsubscribe?: { (value: any): void }
	) {
	}

	// Cancels the subscription
	unsubscribe(
		onUnsubscribe?: () => void
	): void {
		if (this._closed) {
			return
		}
		this._closed                  = true
		this.observable.subscriptions = this.observable.subscriptions.filter(
			subscription => subscription !== this
		)

		onUnsubscribe()
	}

	// A boolean value indicating whether the subscription is closed
	get closed(): boolean {
		return this._closed
	}

}

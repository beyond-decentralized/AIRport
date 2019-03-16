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
		private onUnsubscribe?: () => void
	) {
	}

	// Cancels the subscription
	unsubscribe(): void {
		this.onUnsubscribe();
	}

	// A boolean value indicating whether the subscription is closed
	get closed(): boolean {
		return this._closed
	}

}

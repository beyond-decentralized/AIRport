import {
	SubscriptionLike,
	PartialObserver,
	Subject,
	Subscription,
	TeardownLogic
} from "rxjs";

export class QuerySubject<E> extends Subject<E> {

	constructor(
		private unsubscribeCallback: () => void
	) {
		super();
	}

	subscribe(
		observerOrNext?: PartialObserver<E> | ((value: E) => void),
		error?: (error: any) => void,
		complete?: () => void
	): Subscription {
		let subscription = super.subscribe(<any>observerOrNext, error, complete);
		let resultsSubscription = new ResultsSubscription(subscription, this.unsubscribeCallback);

		return <any>resultsSubscription;
	}

}

export class ResultsSubscription implements SubscriptionLike {

	constructor(
		public subscription: Subscription,
		private onUnsubscribe: () => void
	) {
	}

	unsubscribe(): void {
		this.subscription.unsubscribe();
		this.onUnsubscribe();
	}

	get closed(): boolean {
		return this.subscription.closed;
	}

	set closed(newClosed: boolean) {
		this.subscription.closed = newClosed;
	}

	add(teardown: TeardownLogic): Subscription {
		return this.subscription.add(teardown);
	}

	remove(sub: Subscription): void {
		this.subscription.remove(sub);
	}

}
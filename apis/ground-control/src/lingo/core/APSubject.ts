import { Subject, Subscription } from 'rxjs';
import { PartialObserver } from 'rxjs';

export class APSubject<T> extends Subject<T> {

	private numSubscriptions = 0;

	constructor(
		private onFinalUnsubscribeCallback: () => void
	) {
		super();
	}

	subscribe(observerOrNext?: PartialObserver<T> | ((value: T) => void),
	          error?: (error: any) => void,
	          complete?: () => void): Subscription {

		this.numSubscriptions++;

		return super.subscribe(<any>observerOrNext, error, complete);
	}

	isFinalUnsubscribe(): boolean {
		this.numSubscriptions--;

		if(!this.numSubscriptions) {
			this.onFinalUnsubscribeCallback();
		}

		return !this.numSubscriptions;
	}

}

export class APSubscription extends Subscription {

	private subject: APSubject<any>;

	setApSubject(
		subject: APSubject<any>
	) {
		this.subject = subject;
	}

	unsubscribe() {
		super.unsubscribe();

		if(this.subject.isFinalUnsubscribe()) {
			this.subject = null;
		}
	}

}
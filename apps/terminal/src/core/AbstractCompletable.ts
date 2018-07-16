import {Subscription} from "rxjs/Subscription";

export interface IAbstractCompletable {

	initialize(): Promise<void>;

	tearDown(): Promise<void>;

}


export abstract class AbstractCompletable
	implements IAbstractCompletable {

	private subsriptions: Subscription[] = [];

	abstract initialize(): Promise<void>;

	async tearDown( //
	): Promise<void> {
		this.subsriptions.forEach(
			subscription =>
				subscription.unsubscribe());
	}

	protected record(
		subscription: Subscription
	): void {
		this.subsriptions.push(subscription);
	}

}
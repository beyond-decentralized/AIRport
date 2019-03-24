import {ISubscription} from '@airport/observe'

export interface IAbstractCompletable {

	initialize(): Promise<void>;

	tearDown(): Promise<void>;

}


export abstract class AbstractCompletable
	implements IAbstractCompletable {

	private subsriptions: ISubscription[] = []

	abstract initialize(): Promise<void>;

	async tearDown( //
	): Promise<void> {
		this.subsriptions.forEach(
			subscription => subscription.unsubscribe())
	}

	protected record(subscription: ISubscription): void {
		this.subsriptions.push(subscription)
	}

}
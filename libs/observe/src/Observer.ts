/**
 * An Observer is used to receive data from an Observable, and is supplied as an argument
 * to subscribe.
 *
 * All methods are optional.
 */
import {ISubscription} from './Subscription'

export interface IObserver<V> {

	// Receives the subscription object when `subscribe` is called
	start(
		subscription: ISubscription
	): void;

	// Receives the next value in the sequence
	next(
		value: V
	): void;

	// Receives the sequence error
	error(
		errorValue
	): void;

	// Receives a completion notification
	complete(): void;

}

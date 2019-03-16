/**
 * An Observer is used to receive data from an Observable, and is supplied as an argument
 * to subscribe.
 *
 * All methods are optional.
 */
import { ISubscription } from './Subscription';
export interface IObserver<V> {
    start(subscription: ISubscription): void;
    next(value: V): void;
    error(errorValue: any): void;
    complete(): void;
}

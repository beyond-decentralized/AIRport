import { IObserver } from './Observer';
import { ISubscription } from './Subscription';
/**
 * An Observable represents a sequence of values which may be observed.
 */
export interface IObservable<V> {
    subscribe(observer: IObserver<V>): ISubscription;
    subscribe(onNext: {
        (value: V): void;
    }, onError?: Function, onComplete?: Function): ISubscription;
}

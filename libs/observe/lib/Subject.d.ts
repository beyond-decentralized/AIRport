import { IObservable } from './Observable';
import { IObserver } from './Observer';
import { ISubscription } from './Subscription';
export interface ISubject<V> extends IObservable<V>, IObserver<V> {
}
export declare class Subject<V> implements ISubject<V> {
    private unsubscribeCallback;
    constructor(unsubscribeCallback: () => void);
    complete(): void;
    error(errorValue: any): void;
    next(value: V): void;
    start(subscription: ISubscription): void;
    subscribe(observer: IObserver<V>): ISubscription;
    subscribe(onNext: {
        (value: V): void;
    }, onError?: Function, onComplete?: Function): ISubscription;
}

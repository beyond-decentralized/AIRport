import { ISubscription, Subscription } from './Subscription';
/**
 * An Observable represents a sequence of values which may be observed.
 */
export interface IObservable<V> {
    subscribe(onNext: {
        (value: V): void;
    }, onError?: Function, onComplete?: Function): ISubscription;
    exec(value: V, callbackName: 'onError' | 'onNext', context: any): void;
    parent: Observable<any>;
    children: IObservable<any>[];
    currentValue: V;
    lastValue: V;
}
export declare class Observable<V> implements IObservable<V> {
    static from(sourceObservable: IObservable<any>): IObservable<any>;
    callback: {
        (value: V, context: any): any;
    };
    parent: Observable<any>;
    children: IObservable<any>[];
    currentValue: V;
    lastValue: V;
    subscriptions: Subscription[];
    exec(value: V, callbackName: 'onError' | 'onNext', context?: any): void;
    subscribe(onNext: {
        (value: V): void;
    }, onError?: {
        (value: any): void;
    }, onComplete?: Function): ISubscription;
}

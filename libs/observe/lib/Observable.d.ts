import { ISubscription, Subscription } from './Subscription';
/**
 * An Observable represents a sequence of values which may be observed.
 */
export interface IObservable<V> {
    subscribe(onNext: {
        (value: V): void;
    }, onError?: Function, onComplete?: Function): ISubscription;
    exec(value: V, callbackName: 'onError' | 'onNext', context: any): void;
    upstream: IObservable<any>[];
    downstream: IObservable<any>[];
    currentValue: V;
}
export declare class Observable<V> implements IObservable<V> {
    private onUnsubscribe?;
    static from(...sourceObservables: (IObservable<any> | Promise<IObservable<any>>)[]): IObservable<any>;
    constructor(onUnsubscribe?: () => void);
    callback: any;
    upstream: Observable<any>[];
    up$LastVal: any;
    downstream: Observable<any>[];
    currentValue: V;
    lastValue: V;
    numDownstreamSubscriptions: number;
    subscriptions: Subscription[];
    exec(value: V, callbackName: 'onError' | 'onNext', upstreamObservable?: Observable<any>, context?: any): void;
    subscribe(onNext: {
        (value: any): void;
    }, onError?: {
        (value: any): void;
    }, onComplete?: Function): ISubscription;
    unsubscribeUpstream(): void;
    private valueFromUpstream;
    private getDefaultContext;
    private subscribeUpstream;
}

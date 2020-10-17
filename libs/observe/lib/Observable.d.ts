import { IOperator } from './operators/operator';
import { ISubscription, Subscription } from './Subscription';
/**
 * An Observable represents a sequence of values which may be observed.
 */
export interface IObservable<T> {
    pipe<T2, T3, T4, T5, R>(operator1: IOperator<T, T2>, operator2: IOperator<T2, T3>, operator3: IOperator<T3, T4>, operator4: IOperator<T4, T5>, operator5: IOperator<T5, R>): IObservable<R>;
    pipe<T2, T3, T4, R>(operator1: IOperator<T, T2>, operator2: IOperator<T2, T3>, operator3: IOperator<T3, T4>, operator4: IOperator<T4, R>): IObservable<R>;
    pipe<T2, T3, R>(operator1: IOperator<T, T2>, operator2: IOperator<T2, T3>, operator3: IOperator<T3, R>): IObservable<R>;
    pipe<T2, R>(operator1: IOperator<T, T2>, operator2: IOperator<T2, R>): IObservable<R>;
    pipe<R>(operator: IOperator<T, R>): IObservable<R>;
    pipe<R>(...operators: IOperator<any, any>[]): IObservable<R>;
    subscribe(onNext: {
        (value: T): void;
    }, onError?: Function, onComplete?: Function): ISubscription;
    exec(value: T, callbackName: 'onError' | 'onNext', context: any): void;
    upstream: IObservable<any>[];
    downstream: IObservable<any>[];
    currentValue: T;
    up$LastVal: any;
}
export declare class Observable<T> implements IObservable<T> {
    private onUnsubscribe?;
    static from(...sourceObservables: (IObservable<any> | Promise<IObservable<any>>)[]): IObservable<any>;
    constructor(onUnsubscribe?: () => void);
    operators: IOperator<any, any>[];
    upstream: Observable<any>[];
    up$LastVal: any;
    downstream: Observable<any>[];
    currentValue: T;
    lastValue: T;
    numDownstreamSubscriptions: number;
    subscriptions: Subscription[];
    pipe<T2, T3, T4, T5, R>(operator1: IOperator<T, T2>, operator2: IOperator<T2, T3>, operator3: IOperator<T3, T4>, operator4: IOperator<T4, T5>, operator5: IOperator<T5, R>): IObservable<R>;
    pipe<T2, T3, T4, R>(operator1: IOperator<T, T2>, operator2: IOperator<T2, T3>, operator3: IOperator<T3, T4>, operator4: IOperator<T4, R>): IObservable<R>;
    pipe<T2, T3, R>(operator1: IOperator<T, T2>, operator2: IOperator<T2, T3>, operator3: IOperator<T3, R>): IObservable<R>;
    pipe<T2, R>(operator1: IOperator<T, T2>, operator2: IOperator<T2, R>): IObservable<R>;
    pipe<R>(operator: IOperator<T, R>): IObservable<R>;
    exec(value: T, callbackName: 'onError' | 'onNext', upstreamObservable?: Observable<any>): void;
    forceExec(value: T, callbackName: 'onError' | 'onNext', upstreamObservable?: Observable<any>, cleared?: boolean): void;
    subscribe(onNext: {
        (value: any): void;
    }, onError?: {
        (value: any): void;
    }, onComplete?: Function): ISubscription;
    unsubscribeUpstream(): void;
    protected clear(): void;
    private valueFromUpstream;
    private subscribeUpstream;
}
//# sourceMappingURL=Observable.d.ts.map
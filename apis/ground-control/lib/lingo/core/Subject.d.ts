import { PartialObserver, Subject, Subscription } from 'rxjs';
export interface ISubject<T> {
    next(value: T): void;
}
export declare class Subject<T> {
    private onFinalUnsubscribeCallback;
    private subscriptions;
    constructor(onFinalUnsubscribeCallback: () => void);
    next(value: T): void;
    subscribe(observerOrNext?: PartialObserver<T> | ((value: T) => void), error?: (error: any) => void, complete?: () => void): Subscription;
    isFinalUnsubscribe(): boolean;
}
export declare class APSubscription extends Subscription {
    private subject;
    setApSubject(subject: Subject<any>): void;
    unsubscribe(): void;
}

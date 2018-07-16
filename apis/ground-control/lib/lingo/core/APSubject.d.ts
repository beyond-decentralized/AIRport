import { Subject, Subscription } from 'rxjs';
import { PartialObserver } from 'rxjs';
export declare class APSubject<T> extends Subject<T> {
    private onFinalUnsubscribeCallback;
    private numSubscriptions;
    constructor(onFinalUnsubscribeCallback: () => void);
    subscribe(observerOrNext?: PartialObserver<T> | ((value: T) => void), error?: (error: any) => void, complete?: () => void): Subscription;
    isFinalUnsubscribe(): boolean;
}
export declare class APSubscription extends Subscription {
    private subject;
    setApSubject(subject: APSubject<any>): void;
    unsubscribe(): void;
}

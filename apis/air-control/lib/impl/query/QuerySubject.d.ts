import { Subject } from "rxjs";
import { PartialObserver } from "rxjs";
import { ISubscription, Subscription, TeardownLogic } from "rxjs";
export declare class QuerySubject<E> extends Subject<E> {
    private unsubscribeCallback;
    constructor(unsubscribeCallback: () => void);
    subscribe(observerOrNext?: PartialObserver<E> | ((value: E) => void), error?: (error: any) => void, complete?: () => void): Subscription;
}
export declare class ResultsSubscription implements ISubscription {
    subscription: Subscription;
    private onUnsubscribe;
    constructor(subscription: Subscription, onUnsubscribe: () => void);
    unsubscribe(): void;
    closed: boolean;
    add(teardown: TeardownLogic): Subscription;
    remove(sub: Subscription): void;
}

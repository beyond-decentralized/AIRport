/**
 * A SubscriptionObserver is a normalized Observer which wraps the observer object
 * supplied to subscribe.
 */
export interface SubscriptionObserver<V> {
    next(value: V): void;
    error(errorValue: any): void;
    complete(): void;
    closed: boolean;
}
//# sourceMappingURL=SubscriptionObserver.d.ts.map
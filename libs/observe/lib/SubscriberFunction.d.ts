import { Subscription } from './Subscription';
import { SubscriptionObserver } from './SubscriptionObserver';
export interface SubscriberFunction<V> {
    (observer: SubscriptionObserver<V>): {
        (): void;
    } | Subscription;
}
//# sourceMappingURL=SubscriberFunction.d.ts.map
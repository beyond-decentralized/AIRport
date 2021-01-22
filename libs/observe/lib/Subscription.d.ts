import { Subscription as IRxSubscription } from 'rxjs';
export interface ISubscription extends IRxSubscription {
    closed: boolean;
    unsubscribe(): void;
}
export declare const Subscription: typeof IRxSubscription;
//# sourceMappingURL=Subscription.d.ts.map
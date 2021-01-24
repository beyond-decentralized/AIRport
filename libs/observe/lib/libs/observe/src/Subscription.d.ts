import { Subscription as IRxSubscription } from 'rxjs';
export interface ISubscription extends IRxSubscription {
    closed: boolean;
    unsubscribe(): void;
}
//# sourceMappingURL=Subscription.d.ts.map
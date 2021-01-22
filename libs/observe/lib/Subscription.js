// import {Observable} from './Observable'
import SubscriptionFile from 'rxjs/dist/esm/internal/Subscription';
const RxSubscription = SubscriptionFile.Subscription;
export const Subscription = RxSubscription;
// export class Subscription
// 	extends RxSubscription
// 	implements ISubscription {
//
// }
/*
export class Subscription
    implements ISubscription {

    private _closed = false

    constructor(
        private observable: Observable<any>,
        public onNext: { (value: any): void },
        public onError?: { (error: any): void },
        public onComplete?: Function,
        public onUnsubscribe?: { (value: any): void }
    ) {
    }

    // Cancels the subscription
    unsubscribe(
        onUnsubscribe?: () => void
    ): void {
        if (this._closed) {
            return
        }
        this._closed                  = true
        this.observable.subscriptions = this.observable.subscriptions.filter(
            subscription => subscription !== this
        )
        this.observable.unsubscribeUpstream()

        onUnsubscribe && onUnsubscribe()
    }

    // A boolean value indicating whether the subscription is closed
    get closed(): boolean {
        return this._closed
    }

}
 */
//# sourceMappingURL=Subscription.js.map
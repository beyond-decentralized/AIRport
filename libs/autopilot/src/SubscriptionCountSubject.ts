import { Observer, Subject, Subscription } from "rxjs";

export class SubscriptionCountSubject<T>
    extends Subject<T> {

    subscriptionCount = 0

    constructor(
        private onFirstSubscriptionCallback: () => void,
        private onNoSubscriptionCallback: () => void
    ) {
        super()
    }

    subscribe(observerOrNext?: Partial<Observer<T>> | ((value: T) => void)): Subscription;
    subscribe(next?: ((value: T) => void) | null, error?: ((error: any) => void) | null, complete?: (() => void) | null): Subscription;
    subscribe(
        observerOrNext?: Partial<Observer<T>> | ((value: T) => void) | null,
        error?: ((error: any) => void) | null,
        complete?: (() => void) | null
    ): Subscription {
        if (this.subscriptionCount === 0) {
            this.onFirstSubscriptionCallback()
        }
        this.subscriptionCount++

        return super.subscribe(observerOrNext as any, error, complete)
    }

    unsubscribe(): void {
        super.unsubscribe()
        this.subscriptionCount--
        if (this.subscriptionCount > 0) {
            return
        }
        this.onNoSubscriptionCallback()
    }

}

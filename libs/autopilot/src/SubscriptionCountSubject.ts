import { ICoreRequestFields, IMessage, ISubscriptionCountSubject, SubscriptionId } from "@airport/aviation-communication";
import { Observer, Subject, Subscriber, Subscription } from "rxjs";
import { SafeSubscriber } from "rxjs/internal/Subscriber";
import { isSubscription } from "rxjs/internal/Subscription";

export class SubscriptionCountSubject<T, RF extends IMessage>
    extends Subject<T>
    implements ISubscriptionCountSubject<T, RF> {

    subscriptionCount = 0

    constructor(
        public subscriptionId: SubscriptionId,
        public requestFields: RF,
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

        if (this.isSubscriber(observerOrNext)) {
            (observerOrNext as any).__parentUnsubscribe__ = observerOrNext.unsubscribe

            observerOrNext.unsubscribe = () => {
                (observerOrNext as any).__parentUnsubscribe__()
                this.handleUnsubscribe();
            }
        } else {
            observerOrNext = new SubscriptionCountSubscriber(this, observerOrNext, error, complete)
        }

        return super.subscribe(observerOrNext)
    }

    handleUnsubscribe(): void {
        this.subscriptionCount--

        if (this.subscriptionCount > 0) {
            return
        }

        this.onNoSubscriptionCallback();
    }

    private isObserver<T>(value: any): value is Observer<T> {
        return value && this.isFunction(value.next)
            && this.isFunction(value.error) && this.isFunction(value.complete);
    }

    private isSubscriber<T>(value: any): value is Subscriber<T> {
        return (value && value instanceof Subscriber)
            || (this.isObserver(value) && isSubscription(value));
    }

    private isFunction(value: any): value is (...args: any[]) => any {
        return typeof value === 'function';
    }

}

class SubscriptionCountSubscriber<T, RF extends ICoreRequestFields> extends SafeSubscriber<T> {

    constructor(
        private subscriptionCountSubject: SubscriptionCountSubject<T, RF>,
        observerOrNext?: Partial<Observer<T>> | ((value: T) => void) | null,
        error?: ((e?: any) => void) | null,
        complete?: (() => void) | null
    ) {
        super(observerOrNext, error, complete)
    }

    unsubscribe(): void {
        super.unsubscribe()
        this.subscriptionCountSubject.handleUnsubscribe();
    }

}

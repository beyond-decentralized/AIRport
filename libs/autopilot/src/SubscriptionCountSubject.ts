import { ILocalAPIRequest, IObservableLocalAPIRequest } from "@airport/aviation-communication";
import { Observer, Subject, Subscription } from "rxjs";
import { v4 as guidv4 } from 'uuid'

export class SubscriptionCountSubject<T>
    extends Subject<T> {

    args: any[]

    subscriptionCount = 0

    subscriptionId = guidv4()

    request: IObservableLocalAPIRequest

    setArgsAndRequest(
        args: any[],
        request: ILocalAPIRequest
    ) {
        this.args = args
        this.request = {
            ...request,
            subscriptionId: this.subscriptionId
        }
    }

    subscribe(observerOrNext?: Partial<Observer<T>> | ((value: T) => void)): Subscription;
    subscribe(next?: ((value: T) => void) | null, error?: ((error: any) => void) | null, complete?: (() => void) | null): Subscription;
    subscribe(
        observerOrNext?: Partial<Observer<T>> | ((value: T) => void) | null,
        error?: ((error: any) => void) | null,
        complete?: (() => void) | null
    ): Subscription {
        if (this.subscriptionCount == 0) {
            globalThis.MESSAGE_BUS.next({
                ...this.request,
                subscriptionOperation: 'SUBSCRIBE'
            })
        }
        this.subscriptionCount++

        return super.subscribe(observerOrNext as any, error, complete)
    }

    unsubscribe() {
        super.unsubscribe()
        this.subscriptionCount--
        if (this.subscriptionCount > 0) {
            return
        }
        globalThis.MESSAGE_BUS.next({
            ...this.request,
            subscriptionOperation: 'UNSUBSCRIBE'
        })
    }
}
import { ILocalAPIRequest, IObservableLocalAPIRequest, SubscriptionOperation } from "@airport/aviation-communication";
import { IFullDITokenDescriptor } from "@airport/direction-indicator";
import { Observer, Subject, Subscription } from "rxjs";
import { v4 as guidv4 } from 'uuid'

export class SubscriptionCountSubject<T>
    extends Subject<T> {

    subscriptionCount = 0

    subscriptionId = guidv4()

    request: IObservableLocalAPIRequest

    constructor(
        public args: any[],
        request: ILocalAPIRequest,
        public fullDIDescriptor: IFullDITokenDescriptor,
        public observableRequestMap: Map<string, SubscriptionCountSubject<any>>
    ) {
        super()
        this.args = args;
        (request as IObservableLocalAPIRequest).subscriptionId = this.subscriptionId

        this.request = {
            ...request,
            subscriptionId: this.subscriptionId
        }

        delete this.request.transactionId
    }

    subscribe(observerOrNext?: Partial<Observer<T>> | ((value: T) => void)): Subscription;
    subscribe(next?: ((value: T) => void) | null, error?: ((error: any) => void) | null, complete?: (() => void) | null): Subscription;
    subscribe(
        observerOrNext?: Partial<Observer<T>> | ((value: T) => void) | null,
        error?: ((error: any) => void) | null,
        complete?: (() => void) | null
    ): Subscription {
        if (this.subscriptionCount === 0) {
            this.observableRequestMap.set(this.subscriptionId, this)
            globalThis.MESSAGE_BUS.next({
                fullDIDescriptor: this.fullDIDescriptor,
                request: {
                    ...this.request,
                    id: guidv4(),
                    subscriptionOperation: SubscriptionOperation.OPERATION_SUBSCRIBE
                }
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
        this.observableRequestMap.delete(this.subscriptionId)
        globalThis.MESSAGE_BUS.next({
            fullDIDescriptor: this.fullDIDescriptor,
            request: {
                ...this.request,
                id: guidv4(),
                subscriptionOperation: SubscriptionOperation.OPERATION_UNSUBSCRIBE
            }
        })
    }

}

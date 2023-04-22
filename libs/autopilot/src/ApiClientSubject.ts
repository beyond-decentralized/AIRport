import { IApiCallRequestMessage, IApiClientSubject, ISubjectCache } from "@airport/aviation-communication";
import { IFullDITokenDescriptor } from "@airport/direction-indicator";
import { v4 as guidv4 } from 'uuid'
import { SubscriptionCountSubject } from "./SubscriptionCountSubject";

export class ApiClientSubject<T>
    extends SubscriptionCountSubject<T>
    implements IApiClientSubject<T> {

    subscriptionCount = 0

    subscriptionId = guidv4()

    constructor(
        public args: any[],
        public request: IApiCallRequestMessage,
        public fullDIDescriptor: IFullDITokenDescriptor,
        cache: ISubjectCache
    ) {
        super(
            () => cache.subscribe(this),
            () => cache.unsubscribe(this)
        );
        request.subscriptionId = this.subscriptionId

        this.request = {
            ...request,
            subscriptionId: this.subscriptionId
        }
    }

}

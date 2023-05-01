import { IApiClientSubject, ICoreSubscriptionRequestFields, IClientSubjectCache } from "@airport/aviation-communication";
import { IFullDITokenDescriptor } from "@airport/direction-indicator";
import { v4 as guidv4 } from 'uuid'
import { SubscriptionCountSubject } from "./SubscriptionCountSubject";

export class ApiClientSubject<T, RF extends ICoreSubscriptionRequestFields>
    extends SubscriptionCountSubject<T, RF>
    implements IApiClientSubject<T, RF> {

    subscriptionCount = 0

    constructor(
        public args: any[],
        requestFields: RF,
        public fullDIDescriptor: IFullDITokenDescriptor,
        cache: IClientSubjectCache
    ) {
        super(
            guidv4(),
            requestFields,
            () => cache.subscribe(this),
            () => cache.unsubscribe(this)
        );
        requestFields.subscriptionId = this.subscriptionId

        this.requestFields = {
            ...requestFields,
            subscriptionId: this.subscriptionId
        }
    }

}

import { Subject } from "rxjs";
import { ICoreRequestFields, SubscriptionId } from "../IMessage";

export interface ICoreSubscriptionRequestFields
    extends ICoreRequestFields {

    subscriptionId?: SubscriptionId

}

export interface ISubscriptionCountSubject<T, RF extends ICoreSubscriptionRequestFields>
    extends Subject<T> {

    requestFields: RF

    subscriptionId: SubscriptionId

    handleUnsubscribe(): void

}

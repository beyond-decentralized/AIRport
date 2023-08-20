import { Subject } from "rxjs";
import { ICoreMessageFields, SubscriptionId } from "../IMessage";

export interface ICoreSubscriptionRequestFields
    extends ICoreMessageFields {

    subscriptionId?: SubscriptionId

}

export interface ISubscriptionCountSubject<T, RF extends ICoreSubscriptionRequestFields>
    extends Subject<T> {

    requestFields: RF

    subscriptionId: SubscriptionId

    handleUnsubscribe(): void

}

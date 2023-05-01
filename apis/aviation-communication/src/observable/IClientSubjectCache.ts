import { IApiClientSubject } from "./IApiClientSubject"
import { SubscriptionId } from "../IMessage"
import { ICoreSubscriptionRequestFields, ISubscriptionCountSubject } from "./ISubscriptionCountSubject"

export interface IClientSubjectCache {

    addSubject(
        subscriptionId: SubscriptionId,
        subject: IApiClientSubject<any, any> | ISubscriptionCountSubject<any, any>
    ): void

    getSubject(
        subscriptionId: SubscriptionId,
    ): IApiClientSubject<any, any> | ISubscriptionCountSubject<any, any>

    subscribe<T, RF extends ICoreSubscriptionRequestFields>(
        apiClientSubject: IApiClientSubject<T, RF>
    ): void

    unsubscribe<T, RF extends ICoreSubscriptionRequestFields>(
        apiClientSubject: IApiClientSubject<T, RF>
    ): void

}

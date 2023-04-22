import { IApiClientSubject } from "./IApiClientSubject"
import { SubscriptionId } from "../IMessage"
import { ISubscriptionCountSubject } from "./ISubscriptionCountSubject"

export interface ISubjectCache {

    addSubscripton(
        subscriptionId: SubscriptionId,
        subject: IApiClientSubject<any> | ISubscriptionCountSubject<any>
    ): void

    getSubject(
        subscriptionId: SubscriptionId,
    ): IApiClientSubject<any> | ISubscriptionCountSubject<any>

    onunload(): void

    subscribe<T>(
        apiClientSubject: IApiClientSubject<T>
    ): void

    unsubscribe<T>(
        apiClientSubject: IApiClientSubject<T>
    ): void

}

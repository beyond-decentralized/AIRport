import { IApiClientSubject, ICoreSubscriptionRequestFields, IClientSubjectCache, ISubscriptionCountSubject, SubscriptionId, Message_Type_Group, SUBSCRIPTION_Message_Type, ISubscriptionMessage } from "@airport/aviation-communication"
import { v4 as guidv4 } from "uuid";
import { ApiClientSubject } from "./ApiClientSubject";

export class ClientSubjectCache
    implements IClientSubjectCache {

    private observableRequestMap: Map<SubscriptionId,
        IApiClientSubject<any, any>
        | ISubscriptionCountSubject<any, any>> = new Map()

    addSubject(
        subscriptionId: SubscriptionId,
        subject: IApiClientSubject<any, any> | ISubscriptionCountSubject<any, any>
    ): void {
        this.observableRequestMap.set(subscriptionId, subject)
    }

    getSubject(
        subscriptionId: SubscriptionId,
    ): IApiClientSubject<any, any> | ISubscriptionCountSubject<any, any> {
        return this.observableRequestMap.get(subscriptionId)
    }

    subscribe<T, RF extends ICoreSubscriptionRequestFields>(
        subject: IApiClientSubject<T, RF> | ISubscriptionCountSubject<T, RF>
    ): void {
        if (subject instanceof ApiClientSubject) {
            this.observableRequestMap.set(subject.subscriptionId, subject)
            globalThis.MESSAGE_BUS.next({
                args: subject.args,
                fullDIDescriptor: subject.fullDIDescriptor,
                request: {
                    ...subject.requestFields as ISubscriptionMessage,
                    id: guidv4(),
                    type: SUBSCRIPTION_Message_Type.API_SUBSCRIBE,
                    typeGroup: Message_Type_Group.SUBSCRIPTION
                } as ISubscriptionMessage
            })
        } else {
            throw new Error(`Can only subscribe "ApiClientSubject"s`)
        }
    }

    unsubscribe<T, RF extends ICoreSubscriptionRequestFields>(
        subject: IApiClientSubject<T, RF> | ISubscriptionCountSubject<any, RF>
    ): void {
        if (subject instanceof ApiClientSubject) {
            this.observableRequestMap.delete(subject.subscriptionId)
            globalThis.MESSAGE_BUS.next({
                fullDIDescriptor: subject.fullDIDescriptor,
                request: {
                    ...subject.requestFields as ISubscriptionMessage,
                    id: guidv4(),
                    type: SUBSCRIPTION_Message_Type.API_UNSUBSCRIBE,
                    typeGroup: Message_Type_Group.SUBSCRIPTION
                } as ISubscriptionMessage
            })
        } else {
            subject.unsubscribe()
        }
    }

}

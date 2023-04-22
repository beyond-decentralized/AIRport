import { IApiClientSubject, ISubjectCache, ISubscriptionCountSubject, Message_Type, SubscriptionId } from "@airport/aviation-communication"
import { v4 as guidv4 } from "uuid";
import { ApiClientSubject } from "./ApiClientSubject";

export class SubjectCache
    implements ISubjectCache {

    private observableRequestMap: Map<SubscriptionId, IApiClientSubject<any> | ISubscriptionCountSubject<any>> = new Map()

    constructor() {
        if (globalThis.window) {
            globalThis.window.addEventListener("pagehide",
                _ => this.onunload())
        }
    }

    addSubscripton(
        subscriptionId: SubscriptionId,
        subject: IApiClientSubject<any> | ISubscriptionCountSubject<any>
    ): void {
        this.observableRequestMap.set(subscriptionId, subject)
    }

    getSubject(
        subscriptionId: SubscriptionId,
    ): IApiClientSubject<any> | ISubscriptionCountSubject<any> {
        return this.observableRequestMap.get(subscriptionId)
    }

    onunload(): void {
        for (const apiClientSubject of this.observableRequestMap.values()) {
            this.unsubscribe(apiClientSubject)
        }
    }

    subscribe<T>(
        subject: IApiClientSubject<T> | ISubscriptionCountSubject<any>
    ): void {
        if (subject instanceof ApiClientSubject) {
            this.observableRequestMap.set(subject.subscriptionId, subject)
            globalThis.MESSAGE_BUS.next({
                args: subject.args,
                fullDIDescriptor: subject.fullDIDescriptor,
                request: {
                    ...subject.request,
                    id: guidv4(),
                    type: Message_Type.API_SUBSCRIBE
                }
            })
        } else {
            throw new Error(`Can only subscribe "ApiClientSubject"s`)
        }
    }

    unsubscribe<T>(
        subject: IApiClientSubject<T> | ISubscriptionCountSubject<any>
    ): void {
        if (subject instanceof ApiClientSubject) {
            this.observableRequestMap.delete(subject.subscriptionId)
            globalThis.MESSAGE_BUS.next({
                fullDIDescriptor: subject.fullDIDescriptor,
                request: {
                    ...subject.request,
                    id: guidv4(),
                    type: Message_Type.API_UNSUBSCRIBE
                }
            })
        } else {
            subject.unsubscribe()
        }
    }

}

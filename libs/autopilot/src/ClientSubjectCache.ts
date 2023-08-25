import { IApiClientSubject, ICoreSubscriptionRequestFields, IClientSubjectCache, ISubscriptionCountSubject, Message_Application, Message_Domain, SubscriptionId, Message_Type_Group, SUBSCRIPTION_Message_Type, ISubscriptionMessage } from "@airport/aviation-communication"
import { v4 as guidv4 } from "uuid";
import { ApiClientSubject } from "./ApiClientSubject";
import { IFullDITokenDescriptor } from "@airport/direction-indicator";

export class ClientSubjectCache
    implements IClientSubjectCache {

    private observableRequestMap: Map<SubscriptionId,
        IApiClientSubject<any, any>
        | ISubscriptionCountSubject<any, any>> = new Map()

    constructor() {
        setTimeout(() => {
            if (globalThis.repositoryAutoload !== false) {
                setInterval(() => {
                    const requestsByDomainAndApp: Map<Message_Domain, Map<Message_Application,
                        {
                            args: any[],
                            fullDIDescriptor: IFullDITokenDescriptor,
                            requestFields: ICoreSubscriptionRequestFields
                        }[]>> = new Map()
                    for (const [_subscriptionId, subject] of this.observableRequestMap) {
                        const args = (subject as IApiClientSubject<any, any>).args
                        const fullDIDescriptor = (subject as IApiClientSubject<any, any>).fullDIDescriptor
                        const requestFields: ICoreSubscriptionRequestFields = subject.requestFields
                        let requestsForDomain = requestsByDomainAndApp
                            .get(requestFields.destination.domain)
                        if (!requestsForDomain) {
                            requestsForDomain = new Map()
                            requestsByDomainAndApp.set(requestFields.destination.domain, requestsForDomain)
                        }

                        let requestsForApp = requestsForDomain.get(requestFields.destination.app)
                        if (!requestsForApp) {
                            requestsForApp = []
                            requestsForDomain.set(requestFields.destination.app, requestsForApp)
                        }
                        requestsForApp.push({
                            args,
                            fullDIDescriptor,
                            requestFields
                        })
                    }

                    for (const [_serverDomain, requestsForDomain] of requestsByDomainAndApp) {
                        for (const [_serverApplication, requestsForApp] of requestsForDomain) {
                            const requestForApp = requestsForApp[0]
                            const subscriptionIds = []
                            for (const request of requestsForApp) {
                                subscriptionIds.push(request.requestFields.subscriptionId)
                            }
                            globalThis.MESSAGE_BUS.next({
                                fullDIDescriptor: requestForApp.fullDIDescriptor,
                                request: {
                                    ...requestForApp.requestFields,
                                    subscriptionIds,
                                    id: guidv4(),
                                    type: SUBSCRIPTION_Message_Type.SUBSCRIPTION_PING,
                                    typeGroup: Message_Type_Group.SUBSCRIPTION
                                } as ISubscriptionMessage
                            })
                        }
                    }
                }, 5000)
            }
        }, 2000)
    }

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

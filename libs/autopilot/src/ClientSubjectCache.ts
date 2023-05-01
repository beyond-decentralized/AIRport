import { IApiClientSubject, ICoreSubscriptionRequestFields, IClientSubjectCache, ISubscriptionCountSubject, Message_Application, Message_Direction, Message_Domain, Message_Type, SubscriptionId } from "@airport/aviation-communication"
import { v4 as guidv4 } from "uuid";
import { ApiClientSubject } from "./ApiClientSubject";

export class ClientSubjectCache
    implements IClientSubjectCache {

    private observableRequestMap: Map<SubscriptionId,
        IApiClientSubject<any, any>
        | ISubscriptionCountSubject<any, any>> = new Map()

    constructor() {
        setTimeout(() => {
            if (globalThis.repositoryAutoload !== false) {
                setInterval(() => {
                    const requestFieldsByDomainAndApp: Map<Message_Domain, Map<Message_Application,
                        ICoreSubscriptionRequestFields[]>> = new Map()
                    for (const [_subscriptionId, subject] of this.observableRequestMap) {
                        const requestFields: ICoreSubscriptionRequestFields = subject.requestFields
                        let requestFieldsForDomain = requestFieldsByDomainAndApp
                            .get(requestFields.serverDomain)
                        if (!requestFieldsForDomain) {
                            requestFieldsForDomain = new Map()
                            requestFieldsByDomainAndApp.set(requestFields.serverDomain, requestFieldsForDomain)
                        }

                        let requestFieldsForApp = requestFieldsForDomain.get(requestFields.serverApplication)
                        if (!requestFieldsForApp) {
                            requestFieldsForApp = []
                            requestFieldsForDomain.set(requestFields.serverApplication, requestFieldsForApp)
                        }
                        requestFieldsForApp.push(requestFields)
                    }

                    for (const [_serverDomain, requestFieldsForDomain] of requestFieldsByDomainAndApp) {
                        for (const [_serverApplication, requestFieldsForApp] of requestFieldsForDomain) {
                            const requestFields = requestFieldsForApp[0]
                            const subscriptionIds = []
                            for (const requestFields of requestFieldsForApp) {
                                subscriptionIds.push(requestFields.subscriptionId)
                            }
                            globalThis.MESSAGE_BUS.next({
                                request: {
                                    ...requestFields,
                                    direction: Message_Direction.FROM_CLIENT,
                                    subscriptionIds,
                                    id: guidv4(),
                                    type: Message_Type.SUBSCRIPTION_PING
                                }
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
                    ...subject.requestFields,
                    id: guidv4(),
                    type: Message_Type.API_SUBSCRIBE
                }
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
                    ...subject.requestFields,
                    id: guidv4(),
                    type: Message_Type.API_UNSUBSCRIBE
                }
            })
        } else {
            subject.unsubscribe()
        }
    }

}

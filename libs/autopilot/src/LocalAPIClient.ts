import { Message_Leg, IAirMessageUtils, IApiCallRequestMessage, IApiCallResponseMessage, IMessage, IClientSubjectCache, Message_OriginOrDestination_Type, Message_Type_Group, IInternalMessage, INTERNAL_Message_Type, ISubscriptionMessage, SUBSCRIPTION_Message_Type, IObservableApiCallRequestMessage, Message_Direction } from "@airport/aviation-communication";
import { IApiClient, IFullDITokenDescriptor, Inject, Injected } from "@airport/direction-indicator";
import {
    IOperationSerializer,
    IQueryResultsDeserializer
} from "@airport/pressurization";
import { Observable, Subscription } from "rxjs";
import { v4 as guidv4 } from "uuid";
import { ApiClientSubject } from "./ApiClientSubject";
import { ClientSubjectCache } from "./ClientSubjectCache";

let _inWebMode = true
// let _webServer = 'https://turbase.app'
let _webServer = 'https://localhost:5173'

export interface IRequestRecord {
    request: IApiCallRequestMessage
    reject
    resolve
}

@Injected()
export class LocalAPIClient
    implements IApiClient {

    @Inject()
    airMessageUtils: IAirMessageUtils

    @Inject()
    operationSerializer: IOperationSerializer

    @Inject()
    queryResultsDeserializer: IQueryResultsDeserializer

    webListenerStarted = false;

    lastConnectionReadyCheckMap: Map<string, Map<string, boolean>> = new Map()

    messageBusSubscription: Subscription

    clientSubjectCache: IClientSubjectCache = new ClientSubjectCache()

    pendingWebMessageMap: Map<string, IRequestRecord> = new Map();

    init() {
        if (_inWebMode) {
            this.initializeForWeb()
        }
        this.messageBusSubscription = globalThis.MESSAGE_BUS.subscribe((
            message: {
                fullDIDescriptor: IFullDITokenDescriptor,
                request: IApiCallRequestMessage
            }) => {
            switch (message.request.origin.type) {
                case Message_OriginOrDestination_Type.APPLICATION:
                case Message_OriginOrDestination_Type.USER_INTERFACE:
                    break
                default:
                    return
            }
            switch (message.request.destination.type) {
                case Message_OriginOrDestination_Type.APPLICATION:
                    break
                default:
                    return
            }

            this.waitForConnectionToBeReady(message.fullDIDescriptor).then(() => {
                this.sendMessage(message.request)
            })
        })
    }

    private sendMessage(
        message: IMessage
    ): boolean {
        this.airMessageUtils.prepMessageToSend(message)

        if (_inWebMode) {
            window.postMessage(message, _webServer)
        } else {
            throw new Error('Not Implemented')
        }

        return true
    }

    private initializeForWeb() {
        window.addEventListener("message", event => {
            const message: IMessage = event.data

            if (!this.airMessageUtils.validateUiBoundMessage(message)
                || !this.airMessageUtils.validateIncomingMessage(message)) {
                return
            }

            switch (message.origin.type) {
                case Message_OriginOrDestination_Type.APPLICATION:
                case Message_OriginOrDestination_Type.FRAMEWORK:
                    break
                default:
                    return
            }
            switch (message.destination.type) {
                case Message_OriginOrDestination_Type.USER_INTERFACE:
                    break
                default:
                    return
            }

            switch (message.typeGroup) {
                case Message_Type_Group.INTERNAL: {
                    switch ((message as IInternalMessage).type) {
                        case INTERNAL_Message_Type.CONNECTION_IS_READY: {
                            let checksForDomain = this.lastConnectionReadyCheckMap.get(message.origin.domain)
                            if (!checksForDomain) {
                                checksForDomain = new Map()
                                this.lastConnectionReadyCheckMap.set(message.origin.domain, checksForDomain)
                            }
                            checksForDomain.set(message.origin.app, true)
                            break
                        }
                        default: {
                            this.resolveRequestMessage(message)
                            break
                        }
                    }
                    break
                }
                case Message_Type_Group.SUBSCRIPTION: {
                    switch ((message as ISubscriptionMessage).type) {
                        case SUBSCRIPTION_Message_Type.API_SUBSCRIPTION_DATA: {
                            const subscriptionId = (message as ISubscriptionMessage).subscriptionId
                            if (!subscriptionId) {
                                console.error(`Could not find subscriptionId in an API_SUBSCRIPTION_DATA message`)
                                break
                            }
                            const requestSubject = this.clientSubjectCache.getSubject(subscriptionId) as ApiClientSubject<any, any>
                            if (!requestSubject) {
                                console.error(`Could not find Request Subject for subscriptionId: ${subscriptionId}`)
                                break
                            }
                            try {
                                const response = this.processResponse(requestSubject.args, message as IApiCallResponseMessage)
                                requestSubject.next(response)
                            } catch (e) {
                                console.error(e)
                                requestSubject.error(e)
                            }
                            break
                        }
                        default: {
                            this.resolveRequestMessage(message)
                            break
                        }
                    }
                    break
                }
                default: {
                    this.resolveRequestMessage(message)
                    break
                }
            }
        }, false)
    }

    private resolveRequestMessage(
        message: IMessage
    ): void {
        const requestWebMessage = this.pendingWebMessageMap.get(message.id)
        if (!requestWebMessage) {
            console.log(`Did not find pending request Promise for Message Id: ${message.id}`)
            return;
        }
        if (message.errorMessage) {
            requestWebMessage.reject(message.errorMessage)
        } else {
            requestWebMessage.resolve(message)
        }
    }

    invokeApiMethod<ReturnType = any>(
        fullDiDescriptor: IFullDITokenDescriptor,
        methodName: string,
        args: any[],
        isObservable: boolean
    ): Promise<ReturnType> | Observable<ReturnType> {
        let serializedParams
        if (_inWebMode) {
            serializedParams = args
        } else {
            serializedParams = this.operationSerializer.serializeAsArray(args)
        }

        const request: IApiCallRequestMessage | IObservableApiCallRequestMessage = {
            actor: null,
            args: serializedParams,
            destination: {
                app: fullDiDescriptor.application.name,
                domain: fullDiDescriptor.application.domain.name,
                protocol: 'https',
                type: Message_OriginOrDestination_Type.APPLICATION,
            },
            direction: Message_Direction.REQUEST,
            id: guidv4(),
            messageLeg: Message_Leg.TO_HUB,
            methodName,
            objectName: fullDiDescriptor.descriptor.interface,
            origin: {
                app: 'UserInterface',
                domain: window.location.hostname,
                protocol: window.location.protocol,
                type: Message_OriginOrDestination_Type.USER_INTERFACE,
            },
            subscriptionId: undefined,
            transactionId: undefined,
            typeGroup: undefined
            // type: Message_Type.API_CALL
        }

        if (isObservable) {
            request.typeGroup = Message_Type_Group.SUBSCRIPTION;
            (request as IObservableApiCallRequestMessage).type = SUBSCRIPTION_Message_Type.API_SUBSCRIBE

            const subject = new ApiClientSubject<ReturnType, IObservableApiCallRequestMessage>(args, request as IObservableApiCallRequestMessage,
                fullDiDescriptor, this.clientSubjectCache)

            if (_inWebMode) {
                // The postMessage will be peformed during a subscription to the subject
            } else {
                throw new Error(`Not implemented`)
            }

            return subject
        } else {
            return this.doInvokeApiMethod(fullDiDescriptor,
                request as IApiCallRequestMessage, args)
        }
    }

    async doInvokeApiMethod<T>(
        fullDIDescriptor: IFullDITokenDescriptor,
        request: IApiCallRequestMessage,
        args: any[]
    ): Promise<any> {
        await this.waitForConnectionToBeReady(fullDIDescriptor)

        let response: IApiCallResponseMessage

        if (_inWebMode) {
            response = await this.sendWebRequest(request)
        } else {
            response = await this.sendLocalRequest(request)
        }

        return this.processResponse(args, response)

    }

    private async waitForConnectionToBeReady(
        fullDIDescriptor: IFullDITokenDescriptor
    ) {
        while (!await this.isConnectionReady(fullDIDescriptor)) {
            await this.wait(301)
        }
    }

    private processResponse(
        args: any[],
        response: IApiCallResponseMessage
    ): any {
        if (response.errorMessage) {
            throw new Error(response.errorMessage)
        }

        let payload
        if (_inWebMode) {
            payload = response.returnedValue
        } else {
            if (response.returnedValue) {
                payload = this.queryResultsDeserializer
                    .deserialize(response.returnedValue)
            }
        }

        if (payload) {
            this.queryResultsDeserializer.setPropertyDescriptors(payload)
        }

        for (let i = 0; i < args.length; i++) {
            this.queryResultsDeserializer
                .deepCopyProperties(response.args[i], args[i], new Map())
        }

        return payload
    }

    private wait(
        milliseconds: number
    ): Promise<void> {
        return new Promise((resolve, _reject) => {
            setTimeout(() => {
                resolve()
            }, milliseconds)
        })
    }

    private async isConnectionReady<T>(
        fullDiDescriptor: IFullDITokenDescriptor
    ): Promise<boolean> {
        const serverDomain = fullDiDescriptor.application.domain.name
        const serverApplication = fullDiDescriptor.application.name
        if (this.lastConnectionReadyCheckMap.get(serverDomain)
            && this.lastConnectionReadyCheckMap.get(serverDomain).get(serverApplication)) {
            // FIXME: checking every time breaks in inconsistent ways,
            // The whole 'IsConnectionReady' check needs to be done internally
            // in the framework, without sending messages around (that is
            // done on every request). 
            // this.lastConnectionReadyCheckMap.get(domain).delete(application)
            return true
        }
        let request: IInternalMessage = {
            destination: {
                app: serverApplication,
                domain: serverDomain,
                protocol: 'https',
                type: Message_OriginOrDestination_Type.APPLICATION,
            },
            direction: Message_Direction.REQUEST,
            id: guidv4(),
            messageLeg: Message_Leg.TO_HUB,
            origin: {
                app: 'UserInterface',
                domain: window.location.hostname,
                protocol: window.location.protocol,
                type: Message_OriginOrDestination_Type.USER_INTERFACE,
            },
            type: INTERNAL_Message_Type.IS_CONNECTION_READY,
            typeGroup: Message_Type_Group.INTERNAL
        }

        this.sendMessage(request)

        return false
    }

    private async sendLocalRequest(
        request: IMessage
    ): Promise<IApiCallResponseMessage> {
        const httpResponse = await fetch('http://localhost:31817', {
            method: 'PUT',
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            // redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'origin', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(request) // body data type must match "Content-Type" header
        })

        return await httpResponse.json()
    }

    private async sendWebRequest(
        request: IApiCallRequestMessage
    ): Promise<IApiCallResponseMessage> {
        const returnValue = new Promise<IApiCallResponseMessage>((resolve, reject) => {
            this.pendingWebMessageMap.set(request.id, {
                request,
                resolve,
                reject
            })
        })

        this.sendMessage(request)

        return returnValue
    }

}

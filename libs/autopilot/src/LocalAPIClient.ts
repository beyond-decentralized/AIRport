import { Message_Leg, IAirMessageUtils, IApiCallRequestMessage, IApiCallResponseMessage, IMessage, IClientSubjectCache, Message_OriginOrDestination_Type, Message_Type_Group, IInternalMessage, INTERNAL_Message_Type, ISubscriptionMessage, SUBSCRIPTION_Message_Type, IObservableApiCallRequestMessage, Message_Direction, IConnectionReadyMessage } from "@airport/aviation-communication";
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
let _webServer = 'https://localhost:4200'

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

    ngZone

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

            this.waitForConnectionToBeReady(
                message.fullDIDescriptor,
                message.request.dropIfConnectionNotReady
            ).then(isConnectionReady => {
                if (!isConnectionReady && message.request.dropIfConnectionNotReady) {
                    return
                }
                this.sendMessage(message.request)
            })
        })
    }

    sendMessage(
        message: IMessage
    ): boolean {
        const data = this.airMessageUtils.prepMessageToSend(message)

        if (_inWebMode) {
            try {
                window.parent.postMessage(data, _webServer)
            } catch (e) {
                throw e
            }
        } else {
            throw new Error('Not Implemented')
        }

        return true
    }

    private initializeForWeb() {
        window.addEventListener("message", event => {
            const message: IMessage = this.airMessageUtils.unpackageRecievedMessage(event.data)

            if (!message.isAIRportMessage
                || !this.airMessageUtils.validateUiBoundMessage(message)
                || !this.airMessageUtils.validateIncomingMessage(message)) {
                return
            }

            if (!this.isValidMessageDirection(message)) {
                console.error(`Invalid message direction ${message.direction}`)
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
                    switch ((message as IConnectionReadyMessage).type) {
                        case INTERNAL_Message_Type.CONNECTION_IS_READY: {
                            const returnedValue = (message as IConnectionReadyMessage).returnedValue
                            let checksForDomain = this.lastConnectionReadyCheckMap
                                .get(returnedValue.domain)
                            if (!checksForDomain) {
                                checksForDomain = new Map()
                                this.lastConnectionReadyCheckMap.set(
                                    returnedValue.domain,
                                    checksForDomain)
                            }
                            checksForDomain.set(returnedValue.app, true)
                            break
                        }
                        case INTERNAL_Message_Type.UI_GO_BACK: {
                            history.back()
                            break
                        }
                        case INTERNAL_Message_Type.UI_GO_FORWARD: {
                            history.forward()
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
                                if (this.ngZone) {
                                    this.ngZone.run(() => requestSubject.next(response))
                                } else {
                                    requestSubject.next(response)
                                }
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

    private isValidMessageDirection(
        message: IMessage
    ): boolean {
        switch (message.direction) {
            case Message_Direction.REQUEST: {
                switch (message.typeGroup) {
                    case Message_Type_Group.INTERNAL: {
                        switch ((message as IInternalMessage).type) {
                            case INTERNAL_Message_Type.UI_GO_BACK:
                            case INTERNAL_Message_Type.UI_GO_FORWARD: {
                                return true
                            }
                        }
                    }
                }
                return false
            }
            case Message_Direction.RESPONSE: {
                return true
            }
        }
    }

    private resolveRequestMessage(
        message: IMessage
    ): void {
        const requestWebMessage = this.pendingWebMessageMap.get(message.id)
        if (!requestWebMessage) {
            console.log(`Did not find pending request Promise for Message Id: ${message.id}`)
            return;
        }
        this.pendingWebMessageMap.delete(message.id)
        if (message.errorMessage) {
            if (this.ngZone) {
                this.ngZone.run(() => requestWebMessage.reject(message.errorMessage))
            } else {
                requestWebMessage.reject(message.errorMessage)
            }
        } else {
            if (this.ngZone) {
                this.ngZone.run(() => requestWebMessage.resolve(message))
            } else {
                requestWebMessage.resolve(message)
            }
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
                protocol: 'https:',
                type: Message_OriginOrDestination_Type.APPLICATION,
            },
            direction: Message_Direction.REQUEST,
            id: guidv4(),
            isAIRportMessage: true,
            messageLeg: Message_Leg.TO_HUB,
            methodName,
            objectName: fullDiDescriptor.descriptor.interface,
            origin: {
                app: 'UserInterface',
                domain: location.host,
                protocol: location.protocol,
                type: Message_OriginOrDestination_Type.USER_INTERFACE,
            },
            subscriptionId: undefined,
            transactionId: undefined,
            typeGroup: Message_Type_Group.API
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
        await this.waitForConnectionToBeReady(fullDIDescriptor, request.dropIfConnectionNotReady)

        let response: IApiCallResponseMessage

        if (_inWebMode) {
            response = await this.sendWebRequest(request)
        } else {
            response = await this.sendLocalRequest(request)
        }

        return this.processResponse(args, response)

    }

    private async waitForConnectionToBeReady(
        fullDIDescriptor: IFullDITokenDescriptor,
        dropIfConnectionNotReady: boolean
    ): Promise<boolean> {
        if (dropIfConnectionNotReady && !await this.isConnectionReady(fullDIDescriptor, false)) {
            return false
        }

        while (!await this.isConnectionReady(fullDIDescriptor)) {
            await this.wait(301)
        }

        return true
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
        fullDiDescriptor: IFullDITokenDescriptor,
        sendConnectionRequest = true
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

        if (!sendConnectionRequest) {
            return false
        }

        let request = this.airMessageUtils.getInternalMessage(INTERNAL_Message_Type.IS_CONNECTION_READY)
        request.destination = {
            app: serverApplication,
            domain: serverDomain,
            protocol: 'https:',
            type: Message_OriginOrDestination_Type.APPLICATION,
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

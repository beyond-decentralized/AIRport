import { Message_Direction, Message_Leg, Message_Type, IAirMessageUtils, IApiCallRequestMessage, IApiCallResponseMessage, IMessage } from "@airport/aviation-communication";
import { IFullDITokenDescriptor, Inject, Injected } from "@airport/direction-indicator";
import {
    IOperationSerializer,
    IQueryResultsDeserializer
} from "@airport/pressurization";
import { Observable, Subscription } from "rxjs";
import { v4 as guidv4 } from "uuid";
import { ApiClientSubject } from "./ApiClientSubject";

export interface ILocalAPIClient {

    invokeApiMethod<T = any>(
        fullDIDescriptor: IFullDITokenDescriptor,
        methodName: string,
        args: any[],
        isObservable: boolean
    ): Promise<T> | Observable<T>

    onMessage(callback: (
        message: any
    ) => void)

}

let _inWebMode = true
// let _webServer = 'https://turbase.app'
let _webServer = 'https://localhost:3000'

export interface IRequestRecord {
    request: IApiCallRequestMessage
    reject
    resolve
}

@Injected()
export class LocalAPIClient
    implements ILocalAPIClient {

    @Inject()
    airMessageUtils: IAirMessageUtils

    @Inject()
    operationSerializer: IOperationSerializer

    @Inject()
    queryResultsDeserializer: IQueryResultsDeserializer

    clientIframe: HTMLIFrameElement

    webListenerStarted = false;

    lastConnectionReadyCheckMap: Map<string, Map<string, boolean>> = new Map()

    messageBusSubscription: Subscription

    observableRequestMap: Map<string, ApiClientSubject<any>> = new Map()

    pendingWebMessageMap: Map<string, IRequestRecord> = new Map();

    messageCallback: (
        message: any
    ) => void

    init() {
        if (_inWebMode) {
            this.initializeForWeb()
        }
        this.messageBusSubscription = globalThis.MESSAGE_BUS.subscribe((
            message: {
                fullDIDescriptor: IFullDITokenDescriptor,
                request: IApiCallRequestMessage
            }) => {
            if (message.request.direction !== Message_Direction.FROM_CLIENT) {
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
            this.clientIframe.contentWindow.postMessage(message, _webServer)
        } else {
            throw new Error('Not Implemented')
        }

        return true
    }

    private initializeForWeb() {
        const htmlElements = document.getElementsByName('AIRportClient') as any;

        if (htmlElements.length) {
            this.clientIframe = htmlElements[0]
        } else {
            this.clientIframe = document.createElement('iframe')
            this.clientIframe.src = _webServer + '/client/index.html'
            this.clientIframe.name = 'AIRportClient'
            this.clientIframe.style.display = 'none'
            document.body.appendChild(this.clientIframe)
        }

        window.addEventListener("message", event => {
            const message: IApiCallResponseMessage = event.data

            if (!this.airMessageUtils.validateIncomingMessage(message)) {
                return
            }

            if (message.direction !== Message_Direction.TO_CLIENT) {
                return
            }

            if (this.messageCallback) {
                this.messageCallback(message)
            }

            switch (message.type) {
                case Message_Type.CONNECTION_IS_READY:
                    let checksForDomain = this.lastConnectionReadyCheckMap.get(message.serverDomain)
                    if (!checksForDomain) {
                        checksForDomain = new Map()
                        this.lastConnectionReadyCheckMap.set(message.serverDomain, checksForDomain)
                    }
                    checksForDomain.set(message.serverApplication, true)
                    break
                case Message_Type.API_SUBSCRIBTION_DATA:
                    const subscriptionId = message.subscriptionId
                    if (!subscriptionId) {
                        console.error(`Could not find subscriptionId: API_SUBSCRIBTION_DATA message`)
                        break
                    }
                    const requestSubject = this.observableRequestMap.get(subscriptionId)
                    if (!requestSubject) {
                        console.error(`Could not find Request Subject for subscriptionId: ${subscriptionId}`)
                        break
                    }
                    try {
                        const response = this.processResponse(requestSubject.args, message)
                        requestSubject.next(response)
                    } catch (e) {
                        console.error(e)
                        requestSubject.error(e)
                    }
                    break

                default:
                    let requestWebMessage = this.pendingWebMessageMap.get(message.id)
                    if (requestWebMessage) {
                        requestWebMessage.resolve(message)
                    }
                    break
            }
        }, false)
    }

    onMessage(callback: (
        message: any
    ) => void) {
        this.messageCallback = callback
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

        const request: IApiCallRequestMessage = {
            actor: null,
            args: serializedParams,
            direction: Message_Direction.FROM_CLIENT,
            id: guidv4(),
            messageLeg: Message_Leg.TO_HUB,
            methodName,
            clientApplication: 'UserInterface',
            clientDomain: window.location.hostname,
            clientDomainProtocol: window.location.protocol,
            serverApplication: fullDiDescriptor.application.name,
            serverDomain: fullDiDescriptor.application.domain.name,
            serverDomainProtocol: 'https',
            objectName: fullDiDescriptor.descriptor.interface,
            type: Message_Type.API_CALL
        }

        if (isObservable) {
            request.type = Message_Type.API_SUBSCRIBE

            const subject = new ApiClientSubject<ReturnType>(args, request,
                fullDiDescriptor, this.observableRequestMap)

            if (_inWebMode) {
                // The postMessage will be peformed during a subscription to the subject
            } else {
                throw new Error(`Not implemented`)
            }

            return subject
        } else {
            return this.doInvokeApiMethod(fullDiDescriptor,
                request, args)
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
        fullDIDescriptor: IFullDITokenDescriptor
    ): Promise<boolean> {
        const serverDomain = fullDIDescriptor.application.domain.name
        const serverApplication = fullDIDescriptor.application.name
        if (this.lastConnectionReadyCheckMap.get(serverDomain)
            && this.lastConnectionReadyCheckMap.get(serverDomain).get(serverApplication)) {
            // FIXME: checking every time breaks in inconsistent ways,
            // The whole 'IsConnectionReady' check needs to be done internally
            // in the framework, without sending messages around (that is
            // done on every request). 
            // this.lastConnectionReadyCheckMap.get(domain).delete(application)
            return true
        }
        let request: IMessage = {
            clientApplication: 'UserInterface',
            clientDomain: window.location.hostname,
            clientDomainProtocol: window.location.protocol,
            direction: Message_Direction.FROM_CLIENT,
            id: guidv4(),
            messageLeg: Message_Leg.TO_HUB,
            serverApplication,
            serverDomain,
            serverDomainProtocol: 'https',
            type: Message_Type.IS_CONNECTION_READY
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
        if (!this.webListenerStarted) {
            this.startWebListener()
        }
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

    private startWebListener() {
        window.addEventListener("message", event => {
            this.handleWebResponse(event.data);
        })
    }

    private handleWebResponse(
        response: IApiCallResponseMessage
    ) {
        if (response.clientDomain !== window.location.host) {
            return
        }
        if (response.direction !== Message_Direction.TO_CLIENT) {
            return
        }
        const pendingRequest = this.pendingWebMessageMap.get(response.id)
        if (!pendingRequest) {
            return
        }

        if (response.errorMessage) {
            pendingRequest.reject(response.errorMessage)
        } else {
            pendingRequest.resolve(response)
        }
    }

}

import {
    ILocalAPIRequest,
    ILocalAPIResponse,
    IObservableLocalAPIRequest,
    IObservableLocalAPIResponse,
    SubscriptionOperation
} from "@airport/aviation-communication";
import { IFullDITokenDescriptor, Inject, Injected } from "@airport/direction-indicator";
import {
    IOperationSerializer,
    IQueryResultsDeserializer
} from "@airport/pressurization";
import { Observable, Subscription } from "rxjs";
import { v4 as guidv4 } from "uuid";
import { SubscriptionCountSubject } from "./SubscriptionCountSubject";

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
    request: ILocalAPIRequest
    reject
    resolve
}

@Injected()
export class LocalAPIClient
    implements ILocalAPIClient {

    @Inject()
    operationSerializer: IOperationSerializer
    @Inject()
    queryResultsDeserializer: IQueryResultsDeserializer

    clientIframe: HTMLIFrameElement

    webListenerStarted = false;

    lastConnectionReadyCheckMap: Map<string, Map<string, boolean>> = new Map()

    messageBusSubscription: Subscription

    observableRequestMap: Map<string, SubscriptionCountSubject<any>> = new Map()

    pendingWebMessageMap: Map<string, IRequestRecord> = new Map();

    messageCallback: (
        message: any
    ) => void

    init() {
        if (_inWebMode) {
            this.initializeForWeb()
        }
        this.messageBusSubscription = globalThis.MESSAGE_BUS.subscribe(async (
            message: {
                fullDIDescriptor: IFullDITokenDescriptor,
                request: IObservableLocalAPIRequest
            }) => {
            if (message.request.category !== 'FromClient') {
                return
            }

            await this.waitForConnectionToBeReady(message.fullDIDescriptor)

            if (_inWebMode) {
                this.clientIframe.contentWindow.postMessage(message.request, _webServer)
            } else {
                throw new Error('Not Implemented')
            }
        })
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
            const message: ILocalAPIResponse = event.data
            if (!(message instanceof Object) || message.__received__) {
                return
            }
            message.__received__ = true

            if (this.messageCallback) {
                const receivedDate = new Date()
                message.__receivedTime__ = receivedDate.getTime()
                this.messageCallback(message)
            }

            switch (message.category) {
                case 'ConnectionIsReady':
                    let checksForDomain = this.lastConnectionReadyCheckMap.get(message.domain)
                    if (!checksForDomain) {
                        checksForDomain = new Map()
                        this.lastConnectionReadyCheckMap.set(message.domain, checksForDomain)
                    }
                    checksForDomain.set(message.application, true)
                    break
                case 'ToClientRedirected':
                    // All requests need to have a application signature
                    // to know what application is being communicated to/from
                    if (!this.hasValidApplicationInfo(message)) {
                        return
                    }
                    const subscriptionId = (message as IObservableLocalAPIResponse).subscriptionId
                    if (subscriptionId) {
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
                    }
                    let requestWebMessage = this.pendingWebMessageMap.get(message.id)
                    if (requestWebMessage) {
                        requestWebMessage.resolve(message)
                    }
                    break
                default:
                    break
            }
        }, false)
    }

    onMessage(callback: (
        message: any
    ) => void) {
        this.messageCallback = callback
    }

    private hasValidApplicationInfo(
        message: ILocalAPIResponse
    ) {
        return typeof message.domain === 'string' && message.domain.length >= 3
            && typeof message.application === 'string' && message.application.length >= 3
    }

    invokeApiMethod<T = any>(
        fullDIDescriptor: IFullDITokenDescriptor,
        methodName: string,
        args: any[],
        isObservable: boolean
    ): Promise<T> | Observable<T> {
        let serializedParams
        if (_inWebMode) {
            serializedParams = args
        } else {
            serializedParams = this.operationSerializer.serializeAsArray(args)
        }

        const request: ILocalAPIRequest = {
            actor: null,
            application: fullDIDescriptor.application.name,
            args: serializedParams,
            category: 'FromClient',
            domain: fullDIDescriptor.application.domain.name,
            hostDomain: null,
            hostProtocol: null,
            id: guidv4(),
            methodName,
            objectName: fullDIDescriptor.descriptor.interface,
            protocol: window.location.protocol,
        }

        if (isObservable) {
            (request as IObservableLocalAPIRequest).subscriptionOperation
                = SubscriptionOperation.OPERATION_SUBSCRIBE
            const subject = new SubscriptionCountSubject<T>(args, request,
                fullDIDescriptor, this.observableRequestMap)

            if (_inWebMode) {
                // The postMessage will be peformed during a subscription to the subject
                // this.clientIframe.contentWindow.postMessage(request, _webServer)
            } else {
                throw new Error(`Not implemented`)
            }

            return subject
        } else {
            return this.doInvokeApiMethod(fullDIDescriptor,
                request, args)
        }
    }

    async doInvokeApiMethod<T>(
        fullDIDescriptor: IFullDITokenDescriptor,
        request: ILocalAPIRequest,
        args: any[]
    ): Promise<any> {
        await this.waitForConnectionToBeReady(fullDIDescriptor)

        let response: ILocalAPIResponse

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
        response: ILocalAPIResponse
    ): any {
        if (response.errorMessage) {
            throw new Error(response.errorMessage)
        }

        let payload
        if (_inWebMode) {
            payload = response.payload
        } else {
            if (response.payload) {
                payload = this.queryResultsDeserializer
                    .deserialize(response.payload)
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
        const domain = fullDIDescriptor.application.domain.name
        const application = fullDIDescriptor.application.name
        if (this.lastConnectionReadyCheckMap.get(domain)
            && this.lastConnectionReadyCheckMap.get(domain).get(application)) {
            // FIXME: checking every time breaks in inconsistent ways,
            // The whole 'IsConnectionReady' check needs to be done internally
            // in the framework, without sending messages around (that is
            // done on every request). 
            // this.lastConnectionReadyCheckMap.get(domain).delete(application)
            return true
        }
        let request: ILocalAPIRequest = {
            actor: null,
            application,
            args: [],
            category: 'IsConnectionReady',
            domain,
            hostDomain: null,
            hostProtocol: null,
            id: null,
            methodName: null,
            objectName: null,
            protocol: window.location.protocol,
        }

        if (_inWebMode) {
            this.clientIframe.contentWindow.postMessage(request, _webServer)
            return false
        } else {
            const response = await this.sendLocalRequest(request)

            if (response.errorMessage) {
                return false
            }
            return true
        }
    }

    private async sendLocalRequest(
        request: ILocalAPIRequest
    ): Promise<ILocalAPIResponse> {
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
        request: ILocalAPIRequest
    ): Promise<ILocalAPIResponse> {
        if (!this.webListenerStarted) {
            this.startWebListener()
        }
        const returnValue = new Promise<ILocalAPIResponse>((resolve, reject) => {
            this.pendingWebMessageMap.set(request.id, {
                request,
                resolve,
                reject
            })
        })
        this.clientIframe.contentWindow.postMessage(request, _webServer)

        return returnValue
    }

    private startWebListener() {
        window.addEventListener("message", event => {
            this.handleWebResponse(event.data);
        })
    }

    private handleWebResponse(
        response: ILocalAPIResponse
    ) {
        if (response.domain !== window.location.host) {
            return
        }
        if (response.category !== 'ToClientRedirected') {
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

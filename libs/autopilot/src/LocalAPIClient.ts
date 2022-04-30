import {
    ILocalAPIRequest,
    ILocalAPIResponse
} from "@airport/aviation-communication";
import { IDependencyInjectionToken } from "@airport/direction-indicator";
import {
    IOperationSerializer,
    IQueryResultsDeserializer
} from "@airport/pressurization";
import { v4 as uuidv4 } from "uuid";

export interface ILocalAPIClient {

    invokeApiMethod<T = any>(
        token: IDependencyInjectionToken<T>,
        methodName: string,
        args: any[]
    ): Promise<void>

    onMessage(callback: (
        message: any
    ) => void)

}

let _inDemoMode = true
// let _demoServer = 'https://turbase.app'
let _demoServer = 'http://localhost:7500'

export interface IRequestRecord {
    request: ILocalAPIRequest
    reject
    resolve
}

// Autopilot is included in client source, so not adding @airport/air-control dependency
// @Injected()
export class LocalAPIClient
    implements ILocalAPIClient {

    // @Inject()
    operationSerializer: IOperationSerializer
    // @Inject()
    queryResultsDeserializer: IQueryResultsDeserializer

    pendingDemoMessageMap: Map<string, IRequestRecord> = new Map();

    demoListenerStarted = false;

    connectionReady = false

    clientIframe: HTMLIFrameElement

    messageCallback: (
        message: any
    ) => void

    constructor() {
        if (_inDemoMode) {
            this.clientIframe = document.getElementsByName('AIRportClient') as any;

            if (this.clientIframe) {
                this.clientIframe = document.createElement('iframe')
                this.clientIframe.src = _demoServer + '/client/index.html'
                this.clientIframe.name = 'AIRportClient'
                this.clientIframe.style.display = 'none'
                document.body.appendChild(this.clientIframe)
            }

            window.addEventListener("message", event => {
                const message: ILocalAPIResponse = event.data
                if (message.__received__) {
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
                        this.connectionReady = true
                        break
                    case 'ToClientRedirected':
                        // All requests need to have a application signature
                        // to know what application is being communicated to/from
                        if (!this.hasValidApplicationInfo(message)) {
                            return
                        }
                        let requestDemoMessage = this.pendingDemoMessageMap.get(message.id)
                        if (requestDemoMessage) {
                            requestDemoMessage.resolve(message)
                        }
                        break
                    default:
                        break
                }
            }, false)
        }
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

    async invokeApiMethod<T>(
        token: IDependencyInjectionToken<T>,
        methodName: string,
        args: any[]
    ): Promise<any> {
        while (!await this.isConnectionReady(token)) {
            await this.wait(100)
        }

        let serializedParams
        if (_inDemoMode) {
            serializedParams = args
        } else {
            serializedParams = this.operationSerializer.serializeAsArray(args)
        }

        const request: ILocalAPIRequest = {
            application: token.application.name,
            args: serializedParams,
            category: 'FromClient',
            domain: token.application.domain.name,
            id: uuidv4(),
            methodName,
            objectName: token.descriptor.interface,
            protocol: window.location.protocol,
        }

        let response: ILocalAPIResponse

        if (_inDemoMode) {
            response = await this.sendDemoRequest(request)
        } else {
            response = await this.sendLocalRequest(request)
        }

        if (response.errorMessage) {
            throw new Error(response.errorMessage)
        }

        if (_inDemoMode) {
            return response.payload
        } else {
            return this.queryResultsDeserializer
                .deserialize(response.payload)
        }
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
        token: IDependencyInjectionToken<T>
    ): Promise<boolean> {
        if (this.connectionReady) {
            return true
        }
        let request: ILocalAPIRequest = {
            application: token.application.name,
            args: [],
            category: 'IsConnectionReady',
            domain: token.application.domain.name,
            id: null,
            methodName: null,
            objectName: null,
            protocol: window.location.protocol,
        }

        if (_inDemoMode) {
            this.clientIframe.contentWindow.postMessage(request, _demoServer)
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

    private async sendDemoRequest(
        request: ILocalAPIRequest
    ): Promise<ILocalAPIResponse> {
        if (!this.demoListenerStarted) {
            this.startDemoListener()
        }
        const returnValue = new Promise<ILocalAPIResponse>((resolve, reject) => {
            this.pendingDemoMessageMap.set(request.id, {
                request,
                resolve,
                reject
            })
        })
        this.clientIframe.contentWindow.postMessage(request, _demoServer)

        return returnValue
    }

    private startDemoListener() {
        window.addEventListener("message", event => {
            this.handleDemoResponse(event.data);
        })
    }

    private handleDemoResponse(
        response: ILocalAPIResponse
    ) {
        if (response.domain !== window.location.host) {
            return
        }
        if (response.category !== 'ToClientRedirected') {
            return
        }
        const pendingRequest = this.pendingDemoMessageMap.get(response.id)
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

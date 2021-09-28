import { container, DI } from "@airport/di";
import {
    OPERATION_SERIALIZER,
    QUERY_RESULTS_DESERIALIZER,
    SERIALIZATION_STATE_MANAGER
} from "@airport/pressurization";
import { v4 as uuidv4 } from "uuid";
import { LOCAL_API_CLIENT } from "../tokens";
import { ILocalAPIRequest } from "./LocalAPIRequest";
import { ILocalAPIResponse } from "./LocalAPIResponse";

export interface ILocalAPIClient {

    invokeApiMethod(
        schemaSignature: string,
        daoName: string,
        methodName: string,
        args: any[]
    ): Promise<void>;

	onMessage(callback: (
		message: any
	) => void)

}

let _inDemoMode = true
// let _demoServer = 'https://turbase.app'
let _demoServer = 'http://localhost:7000'

export interface IRequestRecord {
    request: ILocalAPIRequest
    reject
    resolve
}

export class LocalAPIClient
    implements ILocalAPIClient {

    pendingDemoMessageMap: Map<string, IRequestRecord> = new Map();

    demoListenerStarted = false;

    connectionReady = false

	messageCallback: (
		message: any
	) => void

    constructor() {
        if (_inDemoMode) {
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
                        // All requests need to have a schema signature
                        // to know what schema is being communicated to/from
                        if (!this.hasValidSchemaSignature(message)) {
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

    private hasValidSchemaSignature(
        message: ILocalAPIResponse
    ) {
        return message.schemaSignature && message.schemaSignature.indexOf('.') === -1
    }

    async invokeApiMethod(
        schemaSignature: string,
        objectName: string,
        methodName: string,
        args: any[]
    ): Promise<any> {
        while (!await this.isConnectionReady(schemaSignature)) {
            await this.wait(100)
        }

        const [serializationStateManager, operationSerializer, queryResultsDeserializer]
            = await container(this).get(SERIALIZATION_STATE_MANAGER,
                OPERATION_SERIALIZER, QUERY_RESULTS_DESERIALIZER)

        let serializedParams
        if (_inDemoMode) {
            serializedParams = args
        } else {
            if (args) {
                if (args.length) {
                    serializedParams = args
                        .map(arg => operationSerializer.serialize(arg, serializationStateManager))
                } else {
                    serializedParams = [operationSerializer.serialize(args, serializationStateManager)]
                }
            } else {
                serializedParams = []
            }
        }

        const request: ILocalAPIRequest = {
            category: 'FromClient',
            args: serializedParams,
            host: window.location.host,
            id: uuidv4(),
            methodName,
            objectName,
            protocol: window.location.protocol,
            schemaSignature
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
            return queryResultsDeserializer
                .deserialize(response.payload, serializationStateManager)
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

    private async isConnectionReady(
        schemaSignature: string
    ): Promise<boolean> {
        if (this.connectionReady) {
            return true
        }
        let request: ILocalAPIRequest = {
            category: 'IsConnectionReady',
            args: [],
            host: window.location.host,
            id: null,
            methodName: null,
            objectName: null,
            protocol: window.location.protocol,
            schemaSignature
        }

        if (_inDemoMode) {
            window.parent.postMessage(request, _demoServer)
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
        // window.postMessage(request, _demoServer)
        window.parent.postMessage(request, _demoServer)

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
        if (response.host !== window.location.host) {
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
DI.set(LOCAL_API_CLIENT, LocalAPIClient)

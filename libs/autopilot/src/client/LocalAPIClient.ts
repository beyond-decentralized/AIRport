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

    async invokeApiMethod(
        schemaSignature: string,
        objectName: string,
        methodName: string,
        args: any[]
    ): Promise<any> {
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
            category: 'FromApp',
            args: serializedParams,
            host: window.location.hostname,
            id: uuidv4(),
            methodName,
            objectName,
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
            return queryResultsDeserializer
                .deserialize(response.payload, serializationStateManager)
        } else {
            return response.payload
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
        window.postMessage(request, _demoServer)

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
        if (response.host !== window.location.hostname) {
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

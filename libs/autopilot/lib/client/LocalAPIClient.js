import { container, DI } from "@airport/di";
import { OPERATION_SERIALIZER, QUERY_RESULTS_DESERIALIZER, SERIALIZATION_STATE_MANAGER } from "@airport/pressurization";
import { v4 as uuidv4 } from "uuid";
import { LOCAL_API_CLIENT } from "../tokens";
let _inDemoMode = true;
// let _demoServer = 'https://turbase.app'
let _demoServer = 'http://localhost:7000';
export class LocalAPIClient {
    constructor() {
        this.pendingDemoMessageMap = new Map();
        this.demoListenerStarted = false;
    }
    async invokeApiMethod(schemaSignature, objectName, methodName, args) {
        const [serializationStateManager, operationSerializer, queryResultsDeserializer] = await container(this).get(SERIALIZATION_STATE_MANAGER, OPERATION_SERIALIZER, QUERY_RESULTS_DESERIALIZER);
        let serializedParams;
        if (_inDemoMode) {
            serializedParams = args;
        }
        else {
            if (args) {
                if (args.length) {
                    serializedParams = args
                        .map(arg => operationSerializer.serialize(arg, serializationStateManager));
                }
                else {
                    serializedParams = [operationSerializer.serialize(args, serializationStateManager)];
                }
            }
            else {
                serializedParams = [];
            }
        }
        const request = {
            category: 'FromApp',
            args: serializedParams,
            host: window.location.hostname,
            id: uuidv4(),
            methodName,
            objectName,
            schemaSignature
        };
        let response;
        if (_inDemoMode) {
            response = await this.sendDemoRequest(request);
        }
        else {
            response = await this.sendLocalRequest(request);
        }
        if (response.errorMessage) {
            throw new Error(response.errorMessage);
        }
        if (_inDemoMode) {
            return queryResultsDeserializer
                .deserialize(response.payload, serializationStateManager);
        }
        else {
            return response.payload;
        }
    }
    async sendLocalRequest(request) {
        const httpResponse = await fetch('http://localhost:31817', {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'omit',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            // redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'origin',
            body: JSON.stringify(request) // body data type must match "Content-Type" header
        });
        return await httpResponse.json();
    }
    async sendDemoRequest(request) {
        if (!this.demoListenerStarted) {
            this.startDemoListener();
        }
        const returnValue = new Promise((resolve, reject) => {
            this.pendingDemoMessageMap.set(request.id, {
                request,
                resolve,
                reject
            });
        });
        window.postMessage(request, _demoServer);
        return returnValue;
    }
    startDemoListener() {
        window.addEventListener("message", event => {
            this.handleDemoResponse(event.data);
        });
    }
    handleDemoResponse(response) {
        if (response.host !== window.location.hostname) {
            return;
        }
        const pendingRequest = this.pendingDemoMessageMap.get(response.id);
        if (!pendingRequest) {
            return;
        }
        if (response.errorMessage) {
            pendingRequest.reject(response.errorMessage);
        }
        else {
            pendingRequest.resolve(response);
        }
    }
}
DI.set(LOCAL_API_CLIENT, LocalAPIClient);
//# sourceMappingURL=LocalAPIClient.js.map
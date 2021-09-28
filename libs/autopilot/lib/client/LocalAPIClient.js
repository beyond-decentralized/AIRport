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
        this.connectionReady = false;
        if (_inDemoMode) {
            window.addEventListener("message", event => {
                const message = event.data;
                if (message.__received__) {
                    return;
                }
                message.__received__ = true;
                if (this.messageCallback) {
                    const receivedDate = new Date();
                    message.__receivedTime__ = receivedDate.getTime();
                    this.messageCallback(message);
                }
                switch (message.category) {
                    case 'ConnectionIsReady':
                        this.connectionReady = true;
                        break;
                    case 'ToClientRedirected':
                        // All requests need to have a schema signature
                        // to know what schema is being communicated to/from
                        if (!this.hasValidSchemaSignature(message)) {
                            return;
                        }
                        let requestDemoMessage = this.pendingDemoMessageMap.get(message.id);
                        if (requestDemoMessage) {
                            requestDemoMessage.resolve(message);
                        }
                        break;
                    default:
                        break;
                }
            }, false);
        }
    }
    onMessage(callback) {
        this.messageCallback = callback;
    }
    hasValidSchemaSignature(message) {
        return message.schemaSignature && message.schemaSignature.indexOf('.') === -1;
    }
    async invokeApiMethod(schemaSignature, objectName, methodName, args) {
        while (!await this.isConnectionReady(schemaSignature)) {
            await this.wait(100);
        }
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
            category: 'FromClient',
            args: serializedParams,
            host: window.location.host,
            id: uuidv4(),
            methodName,
            objectName,
            protocol: window.location.protocol,
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
            return response.payload;
        }
        else {
            return queryResultsDeserializer
                .deserialize(response.payload, serializationStateManager);
        }
    }
    wait(milliseconds) {
        return new Promise((resolve, _reject) => {
            setTimeout(() => {
                resolve();
            }, milliseconds);
        });
    }
    async isConnectionReady(schemaSignature) {
        if (this.connectionReady) {
            return true;
        }
        let request = {
            category: 'IsConnectionReady',
            args: [],
            host: window.location.host,
            id: null,
            methodName: null,
            objectName: null,
            protocol: window.location.protocol,
            schemaSignature
        };
        if (_inDemoMode) {
            window.parent.postMessage(request, _demoServer);
            return false;
        }
        else {
            const response = await this.sendLocalRequest(request);
            if (response.errorMessage) {
                return false;
            }
            return true;
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
        // window.postMessage(request, _demoServer)
        window.parent.postMessage(request, _demoServer);
        return returnValue;
    }
    startDemoListener() {
        window.addEventListener("message", event => {
            this.handleDemoResponse(event.data);
        });
    }
    handleDemoResponse(response) {
        if (response.host !== window.location.host) {
            return;
        }
        if (response.category !== 'ToClientRedirected') {
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
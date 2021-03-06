var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from "@airport/direction-indicator";
import { v4 as guidv4 } from "uuid";
let _inDemoMode = true;
// let _demoServer = 'https://turbase.app'
let _demoServer = 'http://localhost:7500';
let LocalAPIClient = class LocalAPIClient {
    constructor() {
        this.pendingDemoMessageMap = new Map();
        this.demoListenerStarted = false;
        this.lastConnectionReadyCheckMap = new Map();
    }
    init() {
        if (_inDemoMode) {
            this.initializeForWeb();
        }
    }
    initializeForWeb() {
        const htmlElements = document.getElementsByName('AIRportClient');
        if (htmlElements.length) {
            this.clientIframe = htmlElements[0];
        }
        else {
            this.clientIframe = document.createElement('iframe');
            this.clientIframe.src = _demoServer + '/client/index.html';
            this.clientIframe.name = 'AIRportClient';
            this.clientIframe.style.display = 'none';
            document.body.appendChild(this.clientIframe);
        }
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
                    let checksForDomain = this.lastConnectionReadyCheckMap.get(message.domain);
                    if (!checksForDomain) {
                        checksForDomain = new Map();
                        this.lastConnectionReadyCheckMap.set(message.domain, checksForDomain);
                    }
                    checksForDomain.set(message.application, true);
                    break;
                case 'ToClientRedirected':
                    // All requests need to have a application signature
                    // to know what application is being communicated to/from
                    if (!this.hasValidApplicationInfo(message)) {
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
    onMessage(callback) {
        this.messageCallback = callback;
    }
    hasValidApplicationInfo(message) {
        return typeof message.domain === 'string' && message.domain.length >= 3
            && typeof message.application === 'string' && message.application.length >= 3;
    }
    async invokeApiMethod(token, methodName, args) {
        while (!await this.isConnectionReady(token)) {
            await this.wait(100);
        }
        let serializedParams;
        if (_inDemoMode) {
            serializedParams = args;
        }
        else {
            serializedParams = this.operationSerializer.serializeAsArray(args);
        }
        const request = {
            application: token.application.name,
            args: serializedParams,
            category: 'FromClient',
            domain: token.application.domain.name,
            hostDomain: null,
            hostProtocol: null,
            id: guidv4(),
            methodName,
            objectName: token.descriptor.interface,
            protocol: window.location.protocol,
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
        let payload;
        if (_inDemoMode) {
            payload = response.payload;
        }
        else {
            if (response.payload) {
                payload = this.queryResultsDeserializer
                    .deserialize(response.payload);
            }
        }
        if (payload) {
            this.queryResultsDeserializer.setPropertyDescriptors(payload);
        }
        for (let i = 0; i < args.length; i++) {
            this.queryResultsDeserializer
                .deepCopyProperties(response.args[i], args[i]);
        }
        return payload;
    }
    wait(milliseconds) {
        return new Promise((resolve, _reject) => {
            setTimeout(() => {
                resolve();
            }, milliseconds);
        });
    }
    async isConnectionReady(token) {
        const domain = token.application.domain.name;
        const application = token.application.name;
        if (this.lastConnectionReadyCheckMap.get(domain)
            && this.lastConnectionReadyCheckMap.get(domain).get(application)) {
            // FIXME: checking every time breaks in inconsistent ways,
            // The whole 'IsConnectionReady' check needs to be done internally
            // in the framework, without sending messages around (that is
            // done on every request). 
            // this.lastConnectionReadyCheckMap.get(domain).delete(application)
            return true;
        }
        let request = {
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
        };
        if (_inDemoMode) {
            this.clientIframe.contentWindow.postMessage(request, _demoServer);
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
        this.clientIframe.contentWindow.postMessage(request, _demoServer);
        return returnValue;
    }
    startDemoListener() {
        window.addEventListener("message", event => {
            this.handleDemoResponse(event.data);
        });
    }
    handleDemoResponse(response) {
        if (response.domain !== window.location.host) {
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
};
__decorate([
    Inject()
], LocalAPIClient.prototype, "operationSerializer", void 0);
__decorate([
    Inject()
], LocalAPIClient.prototype, "queryResultsDeserializer", void 0);
LocalAPIClient = __decorate([
    Injected()
], LocalAPIClient);
export { LocalAPIClient };
//# sourceMappingURL=LocalAPIClient.js.map
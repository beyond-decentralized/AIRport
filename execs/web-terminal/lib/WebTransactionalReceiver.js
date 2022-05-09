var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
import { IsolateMessageType, } from '@airport/apron';
import { TransactionalReceiver } from '@airport/terminal';
import { map } from 'rxjs/operators';
let WebTransactionalReceiver = class WebTransactionalReceiver extends TransactionalReceiver {
    init() {
        const ownDomain = window.location.hostname;
        const mainDomainFragments = ownDomain.split('.');
        if (mainDomainFragments[0] === 'www'
            || mainDomainFragments[0].startsWith('random_')) {
            mainDomainFragments.splice(0, 1);
        }
        const domainPrefix = '.' + mainDomainFragments.join('.');
        // set domain to a random value so that an iframe cannot directly invoke logic in this domain
        if (document.domain !== 'localhost') {
            document.domain = 'random_' + Math.random() + '_' + Math.random() + domainPrefix;
        }
        const webReciever = this.terminalStore.getWebReceiver();
        webReciever.domainPrefix = domainPrefix;
        webReciever.mainDomainFragments = mainDomainFragments;
    }
    handleClientRequest(message) {
        if (message.__received__) {
            return;
        }
        message.__received__ = true;
        // All requests need to have a application signature
        // to know what application is being communicated to/from
        if (!this.hasValidApplicationInfo(message)) {
            return;
        }
        if (this.webMessageReciever.needMessageSerialization()) {
            // FIXME: deserialize message
        }
        const webReciever = this.terminalStore.getWebReceiver();
        if (webReciever.onClientMessageCallback) {
            const receivedDate = new Date();
            message.__receivedTime__ = receivedDate.getTime();
            webReciever.onClientMessageCallback(message);
        }
        switch (message.category) {
            case 'FromClient':
                const fromClientRedirectedMessage = {
                    ...message,
                    __received__: false,
                    __receivedTime__: null,
                    category: 'FromClientRedirected'
                };
                this.handleFromClientRequest(fromClientRedirectedMessage).then();
                break;
            case 'IsConnectionReady':
                this.ensureConnectionIsReady(message).then();
                break;
        }
    }
    handleAppRequest(message, messageOrigin, source) {
        if (message.__received__) {
            return;
        }
        message.__received__ = true;
        // All requests need to have a application signature
        // to know what application is being communicated to/from
        if (!this.hasValidApplicationInfo(message)) {
            return;
        }
        const webReciever = this.terminalStore.getWebReceiver();
        if (webReciever.onClientMessageCallback) {
            const receivedDate = new Date();
            message.__receivedTime__ = receivedDate.getTime();
            webReciever.onClientMessageCallback(message);
        }
        switch (message.category) {
            case 'ToDb':
                this.handleIsolateMessage(message, messageOrigin, source).then();
                break;
            case 'ToClient':
                const interAppApiCallRequest = webReciever.pendingInterAppApiCallMessageMap.get(message.id);
                const context = {};
                this.endApiCall({
                    application: message.application,
                    domain: message.domain,
                    methodName: message.methodName,
                    objectName: message.objectName,
                    transactionId: message.transactionId
                }, message.errorMessage, context).then((success) => {
                    if (interAppApiCallRequest) {
                        if (!success) {
                            interAppApiCallRequest.reject(message.errorMessage);
                        }
                        else if (message.errorMessage) {
                            interAppApiCallRequest.reject(message.errorMessage);
                        }
                        else {
                            interAppApiCallRequest.resolve(message.payload);
                        }
                    }
                    else {
                        const toClientRedirectedMessage = {
                            ...message,
                            __received__: false,
                            __receivedTime__: null,
                            application: message.application,
                            category: 'ToClientRedirected',
                            domain: message.domain,
                            errorMessage: message.errorMessage,
                            methodName: message.methodName,
                            objectName: message.objectName,
                            payload: message.payload,
                            protocol: message.protocol,
                            transactionId: message.transactionId
                        };
                        if (!success) {
                            toClientRedirectedMessage.errorMessage = context.errorMessage;
                            toClientRedirectedMessage.payload = null;
                        }
                        this.handleToClientRequest(toClientRedirectedMessage, messageOrigin)
                            .then();
                    }
                });
                break;
            default:
                break;
        }
    }
    onMessage(callback) {
        const webReciever = this.terminalStore.getWebReceiver();
        webReciever.onClientMessageCallback = callback;
    }
    async nativeStartApiCall(message, context) {
        return await this.startApiCall(message, context, async () => {
            const fullApplicationName = this.dbApplicationUtils.
                getFullApplicationNameFromDomainAndName(message.domain, message.application);
            const frameWindow = this.getFrameWindow(fullApplicationName);
            if (frameWindow) {
                // Forward the request to the correct application iframe
                frameWindow.postMessage(message, '*');
            }
            else {
                throw new Error(`No Application IFrame found for: ${fullApplicationName}`);
            }
        });
    }
    async nativeHandleApiCall(message, context) {
        if (!await this.nativeStartApiCall(message, context)) {
            throw new Error(context.errorMessage);
        }
        const webReciever = this.terminalStore.getWebReceiver();
        return new Promise((resolve, reject) => {
            webReciever.pendingInterAppApiCallMessageMap.set(message.id, {
                message,
                reject,
                resolve
            });
        });
    }
    async ensureConnectionIsReady(message) {
        const fullApplicationName = this.dbApplicationUtils.
            getFullApplicationNameFromDomainAndName(message.domain, message.application);
        const applicationInitializing = this.applicationInitializer.initializingApplicationMap.get(fullApplicationName);
        if (applicationInitializing) {
            return;
        }
        const applicationWindow = this.applicationInitializer.applicationWindowMap.get(fullApplicationName);
        if (!applicationWindow) {
            this.applicationInitializer.initializingApplicationMap.set(fullApplicationName, true);
            await this.applicationInitializer.nativeInitializeApplication(message.domain, message.application, fullApplicationName);
        }
        const connectionIsReadyMessage = {
            application: message.application,
            category: 'ConnectionIsReady',
            domain: message.domain,
            errorMessage: null,
            id: message.id,
            methodName: message.methodName,
            objectName: message.objectName,
            protocol: window.location.protocol,
            payload: null,
            transactionId: message.transactionId
        };
        if (this.webMessageReciever.needMessageSerialization()) {
            // FIXME: serialize message
        }
        this.webMessageReciever.sendMessageToClient(connectionIsReadyMessage);
    }
    hasValidApplicationInfo(message) {
        return typeof message.domain === 'string' && message.domain.length >= 3
            && typeof message.application === 'string' && message.application.length >= 3;
    }
    async handleFromClientRequest(message) {
        const webReciever = this.terminalStore.getWebReceiver();
        let numPendingMessagesFromHost = webReciever.pendingHostCounts.get(message.domain);
        if (!numPendingMessagesFromHost) {
            numPendingMessagesFromHost = 0;
        }
        if (numPendingMessagesFromHost > 4) {
            // Prevent hosts from making local 'Denial of Service' attacks
            return;
        }
        const fullApplicationName = this.dbApplicationUtils.
            getFullApplicationNameFromDomainAndName(message.domain, message.application);
        let numPendingMessagesForApplication = webReciever.pendingApplicationCounts.get(fullApplicationName);
        if (!numPendingMessagesForApplication) {
            numPendingMessagesForApplication = 0;
        }
        if (numPendingMessagesForApplication === -1) {
            // Already could not install the application, may be a DOS attack, return right away
            return;
        }
        webReciever.pendingHostCounts.set(message.domain, numPendingMessagesFromHost + 1);
        webReciever.pendingApplicationCounts.set(fullApplicationName, numPendingMessagesForApplication + 1);
        if (!await this.ensureApplicationIsInstalled(fullApplicationName)) {
            this.relyToClientWithError(message, `Application is not installed`);
            return;
        }
        const context = {};
        if (!await this.nativeStartApiCall(message, context)) {
            this.relyToClientWithError(message, context.errorMessage);
        }
    }
    relyToClientWithError(message, errorMessage) {
        const toClientRedirectedMessage = {
            __received__: false,
            __receivedTime__: null,
            application: message.application,
            category: 'ToClientRedirected',
            domain: message.domain,
            errorMessage,
            id: message.id,
            methodName: message.methodName,
            objectName: message.objectName,
            payload: null,
            protocol: message.protocol,
            transactionId: message.transactionId
        };
        this.replyToClientRequest(toClientRedirectedMessage);
    }
    getFrameWindow(fullApplicationName) {
        const iframe = document
            .getElementsByName(fullApplicationName);
        if (!iframe || !iframe[0]) {
            return null;
        }
        return iframe[0].contentWindow;
    }
    async handleToClientRequest(message, messageOrigin) {
        if (!await this.messageIsFromValidApp(message, messageOrigin)) {
            return;
        }
        this.replyToClientRequest(message);
    }
    replyToClientRequest(message) {
        const fullApplicationName = this.dbApplicationUtils.
            getFullApplicationNameFromDomainAndName(message.domain, message.application);
        const webReciever = this.terminalStore.getWebReceiver();
        let numMessagesFromHost = webReciever.pendingHostCounts.get(message.domain);
        if (numMessagesFromHost > 0) {
            webReciever.pendingHostCounts.set(message.domain, numMessagesFromHost - 1);
        }
        let numMessagesForApplication = webReciever.pendingApplicationCounts.get(fullApplicationName);
        if (numMessagesForApplication > 0) {
            webReciever.pendingApplicationCounts.set(message.domain, numMessagesForApplication - 1);
        }
        // Forward the request to the source client
        if (this.webMessageReciever.needMessageSerialization()) {
            // FIXME: serialize message
        }
        this.webMessageReciever.sendMessageToClient(message);
    }
    async ensureApplicationIsInstalled(fullApplicationName) {
        if (!fullApplicationName) {
            return false;
        }
        return !!this.applicationInitializer.applicationWindowMap.get(fullApplicationName);
    }
    async messageIsFromValidApp(message, messageOrigin) {
        const applicationDomain = messageOrigin.split('//')[1];
        const applicationDomainFragments = applicationDomain.split('.');
        // Allow local debugging
        if (applicationDomain.split(':')[0] === 'localhost') {
            return true;
        }
        const webReciever = this.terminalStore.getWebReceiver();
        const fullApplicationName = this.dbApplicationUtils.
            getFullApplicationNameFromDomainAndName(message.domain, message.application);
        // Only accept requests from https protocol
        if (!messageOrigin.startsWith("https")
            // and from application domains that match the fullApplicationName
            || applicationDomain !== fullApplicationName + webReciever.domainPrefix) {
            return false;
        }
        // Only accept requests from '${applicationName}.${mainDomainName}'
        if (applicationDomainFragments.length !== webReciever.mainDomainFragments.length + 1) {
            return false;
        }
        // Only accept requests from non-'www' domain (don't accept requests from self)
        if (applicationDomainFragments[0] === 'www') {
            return false;
        }
        const applicationDomainFirstFragment = applicationDomainFragments[0];
        // check application domain-embedded signature and fullApplicationName in message
        // and make sure they result in a match
        if (applicationDomainFirstFragment !== fullApplicationName) {
            return false;
        }
        // Make sure the application is installed
        return !!this.applicationInitializer.applicationWindowMap.get(fullApplicationName);
    }
    async handleIsolateMessage(message, messageOrigin, source) {
        if (!await this.messageIsFromValidApp(message, messageOrigin)) {
            return;
        }
        const webReciever = this.terminalStore.getWebReceiver();
        const fullApplicationName = this.dbApplicationUtils.
            getFullApplicationNameFromDomainAndName(message.domain, message.application);
        switch (message.type) {
            case IsolateMessageType.SEARCH_UNSUBSCRIBE:
                let isolateSubscriptionMap = webReciever.subsriptionMap.get(fullApplicationName);
                if (!isolateSubscriptionMap) {
                    return;
                }
                let subscription = isolateSubscriptionMap.get(message.id);
                if (!subscription) {
                    return;
                }
                subscription.unsubscribe();
                isolateSubscriptionMap.delete(message.id);
                return;
        }
        this.processMessage(message).then(response => {
            if (!response) {
                return;
            }
            const webReciever = this.terminalStore.getWebReceiver();
            let shemaDomainName = fullApplicationName + '.' + webReciever.localDomain;
            switch (message.type) {
                case IsolateMessageType.SEARCH:
                case IsolateMessageType.SEARCH_ONE:
                    const observableDataResult = response;
                    observableDataResult.result.pipe(map(value => {
                        window.postMessage(value, shemaDomainName);
                    }));
                    const subscription = observableDataResult.result.subscribe();
                    let isolateSubscriptionMap = webReciever.subsriptionMap.get(fullApplicationName);
                    if (!isolateSubscriptionMap) {
                        isolateSubscriptionMap = new Map();
                        webReciever.subsriptionMap.set(fullApplicationName, isolateSubscriptionMap);
                    }
                    isolateSubscriptionMap.set(message.id, subscription);
                    return;
            }
            source.postMessage(response, '*');
        });
    }
};
__decorate([
    Inject()
], WebTransactionalReceiver.prototype, "applicationInitializer", void 0);
__decorate([
    Inject()
], WebTransactionalReceiver.prototype, "dbApplicationUtils", void 0);
__decorate([
    Inject()
], WebTransactionalReceiver.prototype, "terminalStore", void 0);
__decorate([
    Inject()
], WebTransactionalReceiver.prototype, "webMessageReciever", void 0);
WebTransactionalReceiver = __decorate([
    Injected()
], WebTransactionalReceiver);
export { WebTransactionalReceiver };
//# sourceMappingURL=WebTransactionalReceiver.js.map
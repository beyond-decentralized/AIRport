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
            throw new Error("Deserialization is not yet implemented.");
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
                        interAppApiCallRequest.resolve(message);
                    }
                    else {
                        const toClientRedirectedMessage = {
                            ...message,
                            __received__: false,
                            __receivedTime__: null,
                            application: message.application,
                            args: message.args,
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
            const fullApplication_Name = this.dbApplicationUtils.
                getFullApplication_NameFromDomainAndName(message.domain, message.application);
            const frameWindow = this.getFrameWindow(fullApplication_Name);
            if (frameWindow) {
                // Forward the request to the correct application iframe
                frameWindow.postMessage(message, '*');
            }
            else {
                throw new Error(`No Application IFrame found for: ${fullApplication_Name}`);
            }
        });
    }
    async nativeHandleApiCall(message, context) {
        const messageCopy = {
            ...message
        };
        delete messageCopy.__received__;
        delete messageCopy.__receivedTime__;
        messageCopy.category = 'FromClientRedirected';
        const startDescriptor = await this.nativeStartApiCall(messageCopy, context);
        if (!startDescriptor.isStarted) {
            throw new Error(context.errorMessage);
        }
        let args, errorMessage, payload, transactionId;
        if (startDescriptor.isFramework) {
            try {
                const fullApplication_Name = this.dbApplicationUtils
                    .getFullApplication_NameFromDomainAndName(message.domain, message.application);
                const application = this.terminalStore
                    .getApplicationMapByFullName().get(fullApplication_Name);
                if (!application) {
                    throw new Error(`Could not find AIRport Framework Application: ${fullApplication_Name}`);
                }
                payload = await this.localApiServer.coreHandleRequest(message, application.currentVersion[0].applicationVersion.jsonApplication.versions[0].api);
            }
            catch (e) {
                errorMessage = e.message ? e.message : e;
                console.error(e);
            }
            args = message.args;
            transactionId = message.transactionId;
        }
        else {
            const replyMessage = await new Promise((resolve) => {
                this.terminalStore.getWebReceiver().pendingInterAppApiCallMessageMap.set(messageCopy.id, {
                    message: {
                        ...messageCopy,
                        category: 'FromDb',
                        type: IsolateMessageType.CALL_API
                    },
                    resolve
                });
            });
            args = replyMessage.args;
            errorMessage = replyMessage.errorMessage;
            payload = replyMessage.payload;
            transactionId = replyMessage.transactionId;
        }
        const response = {
            ...messageCopy,
            category: 'FromDb',
            args,
            errorMessage,
            payload,
            transactionId
        };
        return response;
    }
    async ensureConnectionIsReady(message) {
        const fullApplication_Name = this.dbApplicationUtils.
            getFullApplication_NameFromDomainAndName(message.domain, message.application);
        const applicationInitializing = this.terminalStore.getApplicationInitializer()
            .initializingApplicationMap.get(fullApplication_Name);
        if (applicationInitializing) {
            return;
        }
        const applicationWindow = this.terminalStore.getApplicationInitializer()
            .applicationWindowMap.get(fullApplication_Name);
        if (!applicationWindow) {
            this.terminalStore.getApplicationInitializer()
                .initializingApplicationMap.set(fullApplication_Name, true);
            await this.applicationInitializer.nativeInitializeApplication(message.domain, message.application, fullApplication_Name);
        }
        const connectionIsReadyMessage = {
            application: message.application,
            args: message.args,
            category: 'ConnectionIsReady',
            domain: message.domain,
            errorMessage: null,
            id: message.id,
            hostDomain: message.hostDomain,
            hostProtocol: message.hostProtocol,
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
        const fullApplication_Name = this.dbApplicationUtils.
            getFullApplication_NameFromDomainAndName(message.domain, message.application);
        let numPendingMessagesForApplication = webReciever.pendingApplicationCounts.get(fullApplication_Name);
        if (!numPendingMessagesForApplication) {
            numPendingMessagesForApplication = 0;
        }
        if (numPendingMessagesForApplication === -1) {
            // Already could not install the application, may be a DOS attack, return right away
            return;
        }
        webReciever.pendingHostCounts.set(message.domain, numPendingMessagesFromHost + 1);
        webReciever.pendingApplicationCounts.set(fullApplication_Name, numPendingMessagesForApplication + 1);
        if (!await this.ensureApplicationIsInstalled(fullApplication_Name)) {
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
            args: message.args,
            category: 'ToClientRedirected',
            domain: message.domain,
            errorMessage,
            id: message.id,
            hostDomain: message.hostDomain,
            hostProtocol: message.hostProtocol,
            methodName: message.methodName,
            objectName: message.objectName,
            payload: null,
            protocol: message.protocol,
            transactionId: message.transactionId
        };
        this.replyToClientRequest(toClientRedirectedMessage);
    }
    getFrameWindow(fullApplication_Name) {
        const iframe = document
            .getElementsByName(fullApplication_Name);
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
        const fullApplication_Name = this.dbApplicationUtils.
            getFullApplication_NameFromDomainAndName(message.domain, message.application);
        const webReciever = this.terminalStore.getWebReceiver();
        let numMessagesFromHost = webReciever.pendingHostCounts.get(message.domain);
        if (numMessagesFromHost > 0) {
            webReciever.pendingHostCounts.set(message.domain, numMessagesFromHost - 1);
        }
        let numMessagesForApplication = webReciever.pendingApplicationCounts.get(fullApplication_Name);
        if (numMessagesForApplication > 0) {
            webReciever.pendingApplicationCounts.set(message.domain, numMessagesForApplication - 1);
        }
        // Forward the request to the source client
        if (this.webMessageReciever.needMessageSerialization()) {
            // FIXME: serialize message
        }
        this.webMessageReciever.sendMessageToClient(message);
    }
    async ensureApplicationIsInstalled(fullApplication_Name) {
        if (!fullApplication_Name) {
            return false;
        }
        return !!this.terminalStore.getApplicationInitializer()
            .applicationWindowMap.get(fullApplication_Name);
    }
    async messageIsFromValidApp(message, messageOrigin) {
        const applicationDomain = messageOrigin.split('//')[1];
        const applicationDomainFragments = applicationDomain.split('.');
        // Allow local debugging
        if (applicationDomain.split(':')[0] === 'localhost') {
            return true;
        }
        const webReciever = this.terminalStore.getWebReceiver();
        const fullApplication_Name = this.dbApplicationUtils.
            getFullApplication_NameFromDomainAndName(message.domain, message.application);
        // Only accept requests from https protocol
        if (!messageOrigin.startsWith("https")
            // and from application domains that match the fullApplication_Name
            || applicationDomain !== fullApplication_Name + webReciever.domainPrefix) {
            return false;
        }
        // Only accept requests from '${applicationName}.${mainDomain_Name}'
        if (applicationDomainFragments.length !== webReciever.mainDomainFragments.length + 1) {
            return false;
        }
        // Only accept requests from non-'www' domain (don't accept requests from self)
        if (applicationDomainFragments[0] === 'www') {
            return false;
        }
        const applicationDomainFirstFragment = applicationDomainFragments[0];
        // check application domain-embedded signature and fullApplication_Name in message
        // and make sure they result in a match
        if (applicationDomainFirstFragment !== fullApplication_Name) {
            return false;
        }
        // Make sure the application is installed
        return !!this.terminalStore.getApplicationInitializer()
            .applicationWindowMap.get(fullApplication_Name);
    }
    async handleIsolateMessage(message, messageOrigin, source) {
        if (!await this.messageIsFromValidApp(message, messageOrigin)) {
            return;
        }
        const webReciever = this.terminalStore.getWebReceiver();
        const fullApplication_Name = this.dbApplicationUtils.
            getFullApplication_NameFromDomainAndName(message.domain, message.application);
        switch (message.type) {
            case IsolateMessageType.SEARCH_UNSUBSCRIBE:
                let isolateSubscriptionMap = webReciever.subsriptionMap.get(fullApplication_Name);
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
        let response;
        if (message.type === IsolateMessageType.CALL_API) {
            response = await this.nativeHandleApiCall(message, {
                startedAt: new Date()
            });
        }
        else {
            response = await this.processMessage(message);
        }
        if (!response) {
            return;
        }
        let shemaDomain_Name = fullApplication_Name + '.' + webReciever.localDomain;
        switch (message.type) {
            case IsolateMessageType.SEARCH:
            case IsolateMessageType.SEARCH_ONE:
                const observableDataResult = response;
                observableDataResult.result.pipe(map(value => {
                    window.postMessage(value, shemaDomain_Name);
                }));
                const subscription = observableDataResult.result.subscribe();
                let isolateSubscriptionMap = webReciever.subsriptionMap.get(fullApplication_Name);
                if (!isolateSubscriptionMap) {
                    isolateSubscriptionMap = new Map();
                    webReciever.subsriptionMap.set(fullApplication_Name, isolateSubscriptionMap);
                }
                isolateSubscriptionMap.set(message.id, subscription);
                return;
        }
        source.postMessage(response, '*');
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
], WebTransactionalReceiver.prototype, "localApiServer", void 0);
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
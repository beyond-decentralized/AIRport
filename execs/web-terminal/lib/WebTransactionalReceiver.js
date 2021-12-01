import { DI, } from '@airport/di';
import { IsolateMessageType, } from '@airport/security-check';
import { TransactionalReceiver } from '@airport/terminal';
import { TRANSACTIONAL_RECEIVER } from '@airport/terminal-map';
import { map } from 'rxjs/operators';
import { injectTransactionalConnector, injectTransactionalServer } from '@airport/terminal';
import { injectAirportDatabase, injectEntityStateManager } from '@airport/tower';
let _mainDomain = 'localhost:31717';
export class WebTransactionalReceiver extends TransactionalReceiver {
    constructor() {
        super();
        this.subsriptionMap = new Map();
        this.pendingFromClientMessageIds = new Map();
        this.pendingHostCounts = new Map();
        this.pendingApplicationCounts = new Map();
        this.installedApplicationFrames = new Set();
        const ownDomain = window.location.hostname;
        this.mainDomainFragments = ownDomain.split('.');
        if (this.mainDomainFragments[0] === 'www') {
            this.mainDomainFragments.splice(0, 1);
        }
        this.domainPrefix = '.' + this.mainDomainFragments.join('.');
        this.installedApplicationFrames.add("featureDemo");
        // set domain to a random value so that an iframe cannot directly invoke logic in this domain
        if (document.domain !== 'localhost') {
            document.domain = Math.random() + '.' + Math.random() + this.domainPrefix;
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
            // All requests need to have a application signature
            // to know what application is being communicated to/from
            if (!this.hasValidApplicationSignature(message)) {
                return;
            }
            const messageOrigin = event.origin;
            switch (message.category) {
                case 'ToDb':
                    this.handleIsolateMessage(message, messageOrigin, event.source);
                    break;
                case 'FromClient':
                    const fromClientRedirectedMessage = {
                        ...message,
                        __received__: false,
                        __receivedTime__: null,
                        category: 'FromClientRedirected'
                    };
                    this.handleFromClientRequest(fromClientRedirectedMessage, messageOrigin, event.source).then();
                    break;
                case 'IsConnectionReady':
                    const connectionIsReadyMessage = {
                        category: 'ConnectionIsReady',
                        errorMessage: null,
                        id: message.id,
                        host: document.domain,
                        protocol: window.location.protocol,
                        payload: null,
                        applicationSignature: message.applicationSignature
                    };
                    event.source.postMessage(connectionIsReadyMessage, messageOrigin);
                    break;
                case 'ToClient':
                    const toClientRedirectedMessage = {
                        ...message,
                        __received__: false,
                        __receivedTime__: null,
                        category: 'ToClientRedirected'
                    };
                    this.handleToClientRequest(toClientRedirectedMessage, messageOrigin);
                    break;
                default:
                    break;
            }
        }, false);
    }
    onMessage(callback) {
        this.messageCallback = callback;
    }
    hasValidApplicationSignature(message) {
        return message.applicationSignature && message.applicationSignature.indexOf('.') === -1;
    }
    async handleFromClientRequest(message, messageOrigin, sourceWindow) {
        const appDomainAndPort = messageOrigin.split('//')[1];
        if (message.host !== appDomainAndPort) {
            return;
        }
        if (message.applicationSignature === 'AIRport') {
            this.handleToAIRportMessage(message, messageOrigin, sourceWindow);
            return;
        }
        let numPendingMessagesFromHost = this.pendingHostCounts.get(message.host);
        if (!numPendingMessagesFromHost) {
            numPendingMessagesFromHost = 0;
        }
        if (numPendingMessagesFromHost > 4) {
            // Prevent hosts from making local 'Denial of Service' attacks
            return;
        }
        let numPendingMessagesForApplication = this.pendingApplicationCounts.get(message.applicationSignature);
        if (!numPendingMessagesForApplication) {
            numPendingMessagesForApplication = 0;
        }
        if (numPendingMessagesForApplication === -1) {
            // Already could not install the application, may be a DOS attack, return right away
            return;
        }
        this.pendingHostCounts.set(message.host, numPendingMessagesFromHost + 1);
        this.pendingApplicationCounts.set(message.applicationSignature, numPendingMessagesForApplication + 1);
        if (!await this.ensureApplicationIsInstalled(message.applicationSignature, numPendingMessagesForApplication)) {
            this.pendingApplicationCounts.set(message.applicationSignature, -1);
            return;
        }
        let pendingMessageIdsFromHost = this.pendingFromClientMessageIds.get(message.host);
        if (!pendingMessageIdsFromHost) {
            pendingMessageIdsFromHost = new Map();
            this.pendingFromClientMessageIds.set(message.host, pendingMessageIdsFromHost);
        }
        let pendingMessageIdsFromHostForApplication = pendingMessageIdsFromHost.get(message.applicationSignature);
        if (!pendingMessageIdsFromHostForApplication) {
            pendingMessageIdsFromHostForApplication = new Map();
            pendingMessageIdsFromHost.set(message.applicationSignature, pendingMessageIdsFromHostForApplication);
        }
        pendingMessageIdsFromHostForApplication.set(message.id, sourceWindow);
        const frameWindow = this.getFrameWindow(message.applicationSignature);
        if (frameWindow) {
            // Forward the request to the correct application iframe
            frameWindow.postMessage(message, '*');
        }
        else {
            throw new Error(`No Application IFrame found for signature: ${message.applicationSignature}`);
        }
    }
    handleToAIRportMessage(message, messageOrigin, sourceWindow) {
        if (message.objectName == 'UrlManager' && message.methodName == 'changeUrl') {
            try {
                const appPath = message.args[0].split('//')[1];
                window.location.hash = '#/' + appPath;
            }
            catch (e) {
                console.error(e);
            }
        }
    }
    getFrameWindow(applicationSignature) {
        const iframes = document.getElementsByTagName("iframe");
        for (var i = 0; i < iframes.length; i++) {
            let iframe = iframes[i];
            if (iframe.name === applicationSignature) {
                return iframe.contentWindow;
            }
        }
        return null;
    }
    async handleToClientRequest(message, messageOrigin) {
        if (!this.messageIsFromValidApp(message, messageOrigin)) {
            return;
        }
        let pendingMessagesFromHost = this.pendingFromClientMessageIds.get(message.host);
        if (!pendingMessagesFromHost) {
            return;
        }
        let pendingMessagesFromHostForApplication = pendingMessagesFromHost.get(message.applicationSignature);
        if (!pendingMessagesFromHostForApplication) {
            return;
        }
        let sourceWindow = pendingMessagesFromHostForApplication.get(message.id);
        if (!sourceWindow) {
            return;
        }
        pendingMessagesFromHostForApplication.delete(message.id);
        let numMessagesFromHost = this.pendingHostCounts.get(message.host);
        if (numMessagesFromHost > 0) {
            this.pendingHostCounts.set(message.host, numMessagesFromHost - 1);
        }
        let numMessagesForApplication = this.pendingApplicationCounts.get(message.applicationSignature);
        if (numMessagesForApplication > 0) {
            this.pendingHostCounts.set(message.host, numMessagesForApplication - 1);
        }
        // Forward the request to the source client
        sourceWindow.postMessage(message, message.protocol + '//' + message.host);
    }
    async ensureApplicationIsInstalled(applicationSignature, numPendingMessagesForApplication) {
        if (!applicationSignature) {
            return false;
        }
        if (this.installedApplicationFrames.has(applicationSignature)) {
            return true;
        }
        // TODO: ensure that the application is installed
        if (numPendingMessagesForApplication == 0) {
        }
        else {
            // TODO: wait for application initialization
        }
        return true;
    }
    messageIsFromValidApp(message, messageOrigin) {
        const applicationDomain = messageOrigin.split('//')[1];
        const applicationDomainFragments = applicationDomain.split('.');
        // Allow local debugging
        if (applicationDomain.split(':')[0] === 'localhost') {
            return true;
        }
        // Only accept requests from https protocol
        if (!messageOrigin.startsWith("https")
            // and from application domains that match the applicationSignature
            || applicationDomain !== message.applicationSignature + this.domainPrefix) {
            return false;
        }
        // Only accept requests from '${applicationName}.${mainDomainName}'
        if (applicationDomainFragments.length !== this.mainDomainFragments.length + 1) {
            return false;
        }
        // Only accept requests from non-'www' domain (don't accept requests from self)
        if (applicationDomainFragments[0] === 'www') {
            return false;
        }
        const applicationDomainSignature = applicationDomainFragments[0];
        // check application domain-embedded signature and applicationSignature in message
        // and make sure they result in a match
        if (applicationDomainSignature !== message.applicationSignature) {
            return false;
        }
        // Make sure the application is installed
        return this.installedApplicationFrames.has(applicationDomainSignature);
    }
    handleIsolateMessage(message, messageOrigin, source) {
        if (!this.messageIsFromValidApp(message, messageOrigin)) {
            return;
        }
        switch (message.type) {
            case IsolateMessageType.SEARCH_UNSUBSCRIBE:
                let isolateSubscriptionMap = this.subsriptionMap.get(message.applicationSignature);
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
            let shemaDomainName = message.applicationSignature + '.' + _mainDomain;
            switch (message.type) {
                case IsolateMessageType.SEARCH:
                case IsolateMessageType.SEARCH_ONE:
                    const observableDataResult = response;
                    observableDataResult.result.pipe(map(value => {
                        window.postMessage(value, shemaDomainName);
                    }));
                    const subscription = observableDataResult.result.subscribe();
                    let isolateSubscriptionMap = this.subsriptionMap.get(message.applicationSignature);
                    if (!isolateSubscriptionMap) {
                        isolateSubscriptionMap = new Map();
                        this.subsriptionMap.set(message.applicationSignature, isolateSubscriptionMap);
                    }
                    isolateSubscriptionMap.set(message.id, subscription);
                    return;
            }
            source.postMessage(response, '*');
        });
    }
}
DI.set(TRANSACTIONAL_RECEIVER, WebTransactionalReceiver);
export function injectTransactionalReceiver() {
    console.log('Injecting TransactionalReceiver');
    injectTransactionalConnector();
    injectAirportDatabase();
    injectTransactionalServer();
    injectEntityStateManager();
}
//# sourceMappingURL=WebTransactionalReceiver.js.map
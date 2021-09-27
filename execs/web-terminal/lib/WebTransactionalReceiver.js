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
        this.pendingSchemaCounts = new Map();
        this.installedSchemaFrames = new Set();
        const ownDomain = window.location.hostname;
        this.mainDomainFragments = ownDomain.split('.');
        if (this.mainDomainFragments[0] === 'www') {
            this.mainDomainFragments.splice(0, 1);
        }
        this.domainPrefix = '.' + this.mainDomainFragments.join('.');
        this.installedSchemaFrames.add("featureDemo");
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
            const messageOrigin = event.origin;
            // All requests need to have a schema signature
            // to know what schema is being communicated to/from
            if (!this.hasValidSchemaSignature(message)) {
                return;
            }
            switch (message.category) {
                case 'Db':
                    this.handleIsolateMessage(message, messageOrigin, event.source);
                    break;
                case 'FromClient':
                    const fromClientRedirectedMessage = {
                        ...message,
                        __received__: false,
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
                        schemaSignature: message.schemaSignature
                    };
                    event.source.postMessage(connectionIsReadyMessage, messageOrigin);
                    break;
                case 'ToClient':
                    const toClientRedirectedMessage = {
                        ...message,
                        __received__: false,
                        category: 'ToClientRedirected'
                    };
                    this.handleToClientRequest(toClientRedirectedMessage, messageOrigin);
                    break;
                default:
                    break;
            }
        }, false);
    }
    hasValidSchemaSignature(message) {
        return message.schemaSignature && message.schemaSignature.indexOf('.') === -1;
    }
    async handleFromClientRequest(message, messageOrigin, sourceWindow) {
        const appDomainAndPort = messageOrigin.split('//')[1];
        if (message.host !== appDomainAndPort) {
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
        let numPendingMessagesForSchema = this.pendingSchemaCounts.get(message.schemaSignature);
        if (!numPendingMessagesForSchema) {
            numPendingMessagesForSchema = 0;
        }
        if (numPendingMessagesForSchema === -1) {
            // Already could not install the schema, may be a DOS attack, return right away
            return;
        }
        this.pendingHostCounts.set(message.host, numPendingMessagesFromHost + 1);
        this.pendingSchemaCounts.set(message.schemaSignature, numPendingMessagesForSchema + 1);
        if (!await this.ensureSchemaIsInstalled(message.schemaSignature, numPendingMessagesForSchema)) {
            this.pendingSchemaCounts.set(message.schemaSignature, -1);
            return;
        }
        let pendingMessageIdsFromHost = this.pendingFromClientMessageIds.get(message.host);
        if (!pendingMessageIdsFromHost) {
            pendingMessageIdsFromHost = new Map();
            this.pendingFromClientMessageIds.set(message.host, pendingMessageIdsFromHost);
        }
        let pendingMessageIdsFromHostForSchema = pendingMessageIdsFromHost.get(message.schemaSignature);
        if (!pendingMessageIdsFromHostForSchema) {
            pendingMessageIdsFromHostForSchema = new Map();
            pendingMessageIdsFromHost.set(message.schemaSignature, pendingMessageIdsFromHostForSchema);
        }
        pendingMessageIdsFromHostForSchema.set(message.id, sourceWindow);
        const frameWindow = this.getFrameWindow(message.schemaSignature);
        if (frameWindow) {
            // Forward the request to the correct schema iframe
            frameWindow.postMessage(message, '*');
        }
    }
    getFrameWindow(schemaSignature) {
        const iframes = document.getElementsByTagName("iframe");
        for (var i = 0; i < iframes.length; i++) {
            let iframe = iframes[i];
            if (iframe.name === schemaSignature) {
                return iframe.contentWindow;
            }
        }
        return null;
    }
    async handleToClientRequest(message, messageOrigin) {
        if (!this.messageIsFromValidSchema(message, messageOrigin)) {
            return;
        }
        let pendingMessagesFromHost = this.pendingFromClientMessageIds.get(message.host);
        if (!pendingMessagesFromHost) {
            return;
        }
        let pendingMessagesFromHostForSchema = pendingMessagesFromHost.get(message.schemaSignature);
        if (!pendingMessagesFromHostForSchema) {
            return;
        }
        let sourceWindow = pendingMessagesFromHostForSchema.get(message.id);
        if (!sourceWindow) {
            return;
        }
        pendingMessagesFromHostForSchema.delete(message.id);
        let numMessagesFromHost = this.pendingHostCounts.get(message.host);
        if (numMessagesFromHost > 0) {
            this.pendingHostCounts.set(message.host, numMessagesFromHost - 1);
        }
        let numMessagesForSchema = this.pendingSchemaCounts.get(message.schemaSignature);
        if (numMessagesForSchema > 0) {
            this.pendingHostCounts.set(message.host, numMessagesForSchema - 1);
        }
        // Forward the request to the source client
        sourceWindow.postMessage(message, message.protocol + '//' + message.host);
    }
    async ensureSchemaIsInstalled(schemaSignature, numPendingMessagesForSchema) {
        if (!schemaSignature) {
            return false;
        }
        if (this.installedSchemaFrames.has(schemaSignature)) {
            return true;
        }
        // TODO: ensure that the schema is installed
        if (numPendingMessagesForSchema == 0) {
        }
        else {
            // TODO: wait for schema initialization
        }
        return true;
    }
    messageIsFromValidSchema(message, messageOrigin) {
        const schemaDomain = messageOrigin.split('//')[1];
        const schemaDomainFragments = schemaDomain.split('.');
        // Allow local debugging
        if (schemaDomain.split(':')[0] === 'localhost') {
            return true;
        }
        // Only accept requests from https protocol
        if (!messageOrigin.startsWith("https")
            // and from schema domains that match the schemaSignature
            || schemaDomain !== message.schemaSignature + this.domainPrefix) {
            return false;
        }
        // Only accept requests from '${schemaName}.${mainDomainName}'
        if (schemaDomainFragments.length !== this.mainDomainFragments.length + 1) {
            return false;
        }
        // Only accept requests from non-'www' domain (don't accept requests from self)
        if (schemaDomainFragments[0] === 'www') {
            return false;
        }
        const schemaDomainSignature = schemaDomainFragments[0];
        // check schema domain-embedded signature and schemaSignature in message
        // and make sure they result in a match
        if (schemaDomainSignature !== message.schemaSignature) {
            return false;
        }
        // Make sure the schema is installed
        return this.installedSchemaFrames.has(schemaDomainSignature);
    }
    handleIsolateMessage(message, messageOrigin, source) {
        if (!this.messageIsFromValidSchema(message, messageOrigin)) {
            return;
        }
        switch (message.type) {
            case IsolateMessageType.SEARCH_UNSUBSCRIBE:
                let isolateSubscriptionMap = this.subsriptionMap.get(message.schemaSignature);
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
            let shemaDomainName = message.schemaSignature + '.' + _mainDomain;
            switch (message.type) {
                case IsolateMessageType.SEARCH:
                case IsolateMessageType.SEARCH_ONE:
                    const observableDataResult = response;
                    observableDataResult.result.pipe(map(value => {
                        window.postMessage(value, shemaDomainName);
                    }));
                    const subscription = observableDataResult.result.subscribe();
                    let isolateSubscriptionMap = this.subsriptionMap.get(message.schemaSignature);
                    if (!isolateSubscriptionMap) {
                        isolateSubscriptionMap = new Map();
                        this.subsriptionMap.set(message.schemaSignature, isolateSubscriptionMap);
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
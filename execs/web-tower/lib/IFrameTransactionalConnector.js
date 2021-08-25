import { container, DI } from '@airport/di';
import { TRANSACTIONAL_CONNECTOR } from '@airport/ground-control';
import { IsolateMessageType } from '@airport/security-check';
import { LOCAL_API_SERVER } from '@airport/tower';
import { Observable } from 'rxjs';
export class IframeTransactionalConnector {
    constructor() {
        this.pendingMessageMap = new Map();
        this.observableMessageMap = new Map();
        this.messageId = 0;
        window.addEventListener("message", event => {
            const origin = event.origin;
            const message = event.data;
            if (message.schemaSignature.indexOf('.') > -1) {
                // Invalid schema signature - cannot have periods that would point to invalid subdomains
                return;
            }
            const mainDomain = origin.split('//')[1];
            const mainDomainFragments = mainDomain.split('.');
            let startsWithWww = false;
            if (mainDomainFragments[0] === 'www') {
                mainDomainFragments.splice(0, 1);
                startsWithWww = true;
            }
            const domainSuffix = '.' + mainDomainFragments.join('.');
            const ownDomain = window.location.hostname;
            // Only accept requests from https protocol
            if (!origin.startsWith("https")
                // And only if message has the schema signature 
                || !message.schemaSignature
                // And if own domain is a direct sub-domain of the message's domain
                || ownDomain !== message.schemaSignature + domainSuffix) {
                return;
            }
            const ownDomainFragments = ownDomain.split('.');
            // Only accept requests from 'www.${mainDomainName}' or 'www.${mainDomainName}'
            // All 'App' messages must first come from the main domain, which ensures
            // that the schema is installed
            const expectedNumFragments = mainDomainFragments.length + (startsWithWww ? 0 : 1);
            if (ownDomainFragments.length !== expectedNumFragments) {
                return;
            }
            switch (event.data.category) {
                case 'FromApp':
                    this.handleLocalApiRequest(message).then();
                    return;
                case 'Db':
                    this.handleDbToIsolateMessage(message, mainDomain);
                    return;
                default:
                    return;
            }
        });
        this.sendMessage({
            ...this.getCoreFields(),
            type: IsolateMessageType.INIT_CONNECTION
        });
    }
    async init() {
        throw new Error('Not implemented');
    }
    async addRepository(name, url, platform, platformConfig, distributionStrategy, context) {
        return this.sendMessage({
            ...this.getCoreFields(),
            distributionStrategy,
            name,
            platform,
            platformConfig,
            type: IsolateMessageType.ADD_REPOSITORY,
            url
        });
    }
    async find(portableQuery, context, cachedSqlQueryId) {
        return this.sendMessage({
            ...this.getCoreFields(),
            cachedSqlQueryId,
            portableQuery,
            type: IsolateMessageType.FIND
        });
    }
    async findOne(portableQuery, context, cachedSqlQueryId) {
        return this.sendMessage({
            ...this.getCoreFields(),
            cachedSqlQueryId,
            portableQuery,
            type: IsolateMessageType.FIND_ONE
        });
    }
    search(portableQuery, context, cachedSqlQueryId) {
        return this.sendObservableMessage(portableQuery, context, IsolateMessageType.SEARCH, cachedSqlQueryId);
    }
    searchOne(portableQuery, context, cachedSqlQueryId) {
        return this.sendObservableMessage(portableQuery, context, IsolateMessageType.SEARCH_ONE, cachedSqlQueryId);
    }
    async save(entity, context) {
        return this.sendMessage({
            ...this.getCoreFields(),
            entity,
            type: IsolateMessageType.SAVE
        });
    }
    // FIXME: check if ensureGeneratedValues is needed
    async insertValues(portableQuery, context, ensureGeneratedValues // For internal use only
    ) {
        return this.sendMessage({
            ...this.getCoreFields(),
            portableQuery,
            type: IsolateMessageType.INSERT_VALUES
        });
    }
    async insertValuesGetIds(portableQuery, context) {
        return this.sendMessage({
            ...this.getCoreFields(),
            portableQuery,
            type: IsolateMessageType.INSERT_VALUES_GET_IDS
        });
    }
    async updateValues(portableQuery, context) {
        return this.sendMessage({
            ...this.getCoreFields(),
            portableQuery,
            type: IsolateMessageType.UPDATE_VALUES
        });
    }
    async deleteWhere(portableQuery, context) {
        return this.sendMessage({
            ...this.getCoreFields(),
            portableQuery,
            type: IsolateMessageType.DELETE_WHERE
        });
    }
    async startTransaction(context) {
        return this.sendMessage({
            ...this.getCoreFields(),
            type: IsolateMessageType.START_TRANSACTION
        });
    }
    async commit(context) {
        return this.sendMessage({
            ...this.getCoreFields(),
            type: IsolateMessageType.COMMIT
        });
    }
    async rollback(context) {
        return this.sendMessage({
            ...this.getCoreFields(),
            type: IsolateMessageType.ROLLBACK
        });
    }
    async handleLocalApiRequest(request) {
        const localApiServer = await container(this).get(LOCAL_API_SERVER);
        const response = await localApiServer.handleRequest(request);
        window.postMessage(response, response.host);
    }
    handleDbToIsolateMessage(message, mainDomain) {
        const messageRecord = this.pendingMessageMap.get(message.id);
        if (!messageRecord) {
            return;
        }
        let observableMessageRecord;
        switch (message.type) {
            case IsolateMessageType.INIT_CONNECTION:
                this.mainDomain = mainDomain;
                this.pendingMessageMap.delete(message.id);
                return;
            case IsolateMessageType.SEARCH:
            case IsolateMessageType.SEARCH_ONE:
                observableMessageRecord = this.observableMessageMap.get(message.id);
                if (!observableMessageRecord || !observableMessageRecord.observer) {
                    return;
                }
                if (message.errorMessage) {
                    observableMessageRecord.observer.error(message.errorMessage);
                }
                else {
                    observableMessageRecord.observer.next(message.result);
                }
                return;
            case IsolateMessageType.SEARCH_UNSUBSCRIBE:
                observableMessageRecord = this.observableMessageMap.get(message.id);
                if (!observableMessageRecord || !observableMessageRecord.observer) {
                    return;
                }
                observableMessageRecord.observer.complete();
                this.pendingMessageMap.delete(message.id);
                return;
        }
        if (message.errorMessage) {
            messageRecord.reject(message.errorMessage);
        }
        else {
            messageRecord.resolve(message.result);
        }
        this.pendingMessageMap.delete(message.id);
    }
    getCoreFields() {
        return {
            category: 'Db',
            id: ++this.messageId,
            schemaSignature: window.location.hostname.split('.')[0],
        };
    }
    sendMessage(message) {
        window.postMessage(message, "localhost");
        return new Promise((resolve, reject) => {
            this.pendingMessageMap.set(message.id, {
                message,
                resolve,
                reject
            });
        });
    }
    sendObservableMessage(portableQuery, context, type, cachedSqlQueryId) {
        const coreFields = this.getCoreFields();
        let message = {
            ...coreFields,
            cachedSqlQueryId,
            portableQuery,
            type
        };
        let observableMessageRecord = {
            id: coreFields.id
        };
        this.observableMessageMap.set(coreFields.id, observableMessageRecord);
        const observable = new Observable((observer) => {
            observableMessageRecord.observer = observer;
            return () => {
                this.sendMessage({
                    ...coreFields,
                    type: IsolateMessageType.SEARCH_UNSUBSCRIBE
                });
            };
        });
        window.postMessage(message, this.mainDomain);
        return observable;
    }
}
DI.set(TRANSACTIONAL_CONNECTOR, IframeTransactionalConnector);
//# sourceMappingURL=IFrameTransactionalConnector.js.map
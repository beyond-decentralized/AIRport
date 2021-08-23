import { DI } from '@airport/di';
import { TRANSACTIONAL_CONNECTOR } from '@airport/ground-control';
import { IsolateMessageType } from '@airport/security-check';
import { Observable } from 'rxjs';
export class IframeTransactionalConnector {
    constructor() {
        this.pendingMessageMap = new Map();
        this.observableMessageMap = new Map();
        this.messageId = 0;
        window.addEventListener("message", event => {
            const message = event.data;
            const origin = event.origin;
            const mainDomain = origin.split('//')[1];
            const mainDomainFragments = mainDomain.split('.');
            let startsWithWww = false;
            if (mainDomainFragments[0] === 'www') {
                mainDomainFragments.splice(0, 1);
                startsWithWww = true;
            }
            const domainPrefix = '.' + mainDomain;
            const ownDomain = window.location.hostname;
            // Only accept requests from https protocol
            if (!origin.startsWith("https")
                || origin !== message.isolateId
                || !ownDomain.endsWith(domainPrefix)) {
                return;
            }
            const ownDomainFragments = ownDomain.split('.');
            // Only accept requests from 'www.${mainDomainName}' or 'www.${mainDomainName}'
            const expectedNumFragments = mainDomainFragments.length + (startsWithWww ? 0 : 1);
            if (ownDomainFragments.length !== expectedNumFragments) {
                return;
            }
            // Don't accept requests from self
            if (mainDomain === ownDomain) {
                return;
            }
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
    getCoreFields() {
        return {
            id: ++this.messageId,
            isolateId: window.location.hostname,
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
import { DI } from '@airport/di';
import { TRANSACTIONAL_CONNECTOR } from '@airport/ground-control';
import { IsolateMessageType } from '@airport/security-check';
export class IframeTransactionalConnector {
    constructor() {
        this.pendingMessageMap = new Map();
        this.messageId = 0;
        window.addEventListener("message", event => {
            const message = event.data;
            const mainDomainFragments = message.isolateId.split('.');
            let startsWithWww = false;
            if (mainDomainFragments[0] === 'www') {
                mainDomainFragments.splice(0, 1);
                startsWithWww = true;
            }
            const domainPrefix = '.' + mainDomainFragments.join('.');
            const origin = event.origin;
            const ownDomain = window.location.hostname;
            // Only accept requests from https protocol
            if (!origin.startsWith("https")
                || origin !== message.isolateId
                || !ownDomain.endsWith(domainPrefix)) {
                return;
            }
            const sourceDomainNameFragments = origin.split('//')[1].split('.');
            // Only accept requests from 'www.${mainDomainName}' or 'www.${mainDomainName}'
            const expectedNumFragments = mainDomainFragments.length + (startsWithWww ? 0 : 1);
            if (sourceDomainNameFragments.length !== expectedNumFragments) {
                return;
            }
            // Only accept requests from non-'www' domain (don't accept requests from self)
            if (sourceDomainNameFragments[0] === 'www') {
                return;
            }
            const messageRecord = this.pendingMessageMap.get(message.id);
            if (!messageRecord) {
                return;
            }
            if (message.errorMessage) {
                messageRecord.reject(message.errorMessage);
            }
            else {
                messageRecord.resolve(message.result);
            }
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
    async search(portableQuery, context, cachedSqlQueryId) {
        return this.sendMessage({
            ...this.getCoreFields(),
            cachedSqlQueryId,
            portableQuery,
            type: IsolateMessageType.SEARCH
        });
    }
    async searchOne(portableQuery, context, cachedSqlQueryId) {
        return this.sendMessage({
            ...this.getCoreFields(),
            cachedSqlQueryId,
            portableQuery,
            type: IsolateMessageType.SEARCH_ONE
        });
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
}
DI.set(TRANSACTIONAL_CONNECTOR, IframeTransactionalConnector);
//# sourceMappingURL=IFrameTransactionalConnector.js.map
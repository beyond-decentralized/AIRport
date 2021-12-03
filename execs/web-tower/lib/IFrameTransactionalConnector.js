import { container, DI } from '@airport/di';
import { getApplicationName, TRANSACTIONAL_CONNECTOR } from '@airport/ground-control';
import { IsolateMessageType } from '@airport/security-check';
import { APPLICATION_LOADER, LOCAL_API_SERVER } from '@airport/security-check';
import { Observable } from 'rxjs';
// FIXME: make this dynamic for web version (https://turbase.app), local version (https://localhost:PORT)
// and debugging (http://localhost:7000)
export const hostServer = 'http://localhost:7000';
export var AppState;
(function (AppState) {
    AppState["NOT_INITIALIED"] = "NOT_INITIALIED";
    AppState["START_INITIALIZING"] = "START_INITIALIZING";
    AppState["INITIALIZING_IN_PROGRESS"] = "INITIALIZING_IN_PROGRESS";
    AppState["INITIALIZED"] = "INITIALIZED";
})(AppState || (AppState = {}));
export class IframeTransactionalConnector {
    constructor() {
        this.pendingMessageMap = new Map();
        this.observableMessageMap = new Map();
        this.messageId = 0;
        this.appState = AppState.NOT_INITIALIED;
    }
    async init() {
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
            const origin = event.origin;
            if (message.applicationSignature.indexOf('.') > -1) {
                // Invalid application signature - cannot have periods that would point to invalid subdomains
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
            if (ownDomain !== 'localhost') {
                // Only accept requests from https protocol
                if (!origin.startsWith("https")
                    // And only if message has the application signature 
                    || !message.applicationSignature
                    // And if own domain is a direct sub-domain of the message's domain
                    || ownDomain !== message.applicationSignature + domainSuffix) {
                    return;
                }
                const ownDomainFragments = ownDomain.split('.');
                // Only accept requests from 'www.${mainDomainName}' or 'www.${mainDomainName}'
                // All 'App' messages must first come from the main domain, which ensures
                // that the application is installed
                const expectedNumFragments = mainDomainFragments.length + (startsWithWww ? 0 : 1);
                if (ownDomainFragments.length !== expectedNumFragments) {
                    return;
                }
            }
            switch (message.category) {
                case 'FromClientRedirected':
                    this.handleLocalApiRequest(message, origin).then();
                    return;
                case 'FromDb':
                    if (message.type === IsolateMessageType.APP_INITIALIZING) {
                        if (this.appState === AppState.NOT_INITIALIED) {
                            let initConnectionIMO = message;
                            this.lastIds = initConnectionIMO.result;
                            this.appState = AppState.START_INITIALIZING;
                        }
                        return;
                    }
                    this.handleDbToIsolateMessage(message, mainDomain);
                    return;
                default:
                    return;
            }
        });
        this.initializeConnection().then();
    }
    async addRepository(
    // url: string,
    // platform: PlatformType,
    // platformConfig: string,
    // distributionStrategy: DistributionStrategy,
    context) {
        return await this.sendMessage({
            ...this.getCoreFields(),
            // distributionStrategy,
            // platform,
            // platformConfig,
            type: IsolateMessageType.ADD_REPOSITORY,
        });
    }
    async find(portableQuery, context, cachedSqlQueryId) {
        return await this.sendMessage({
            ...this.getCoreFields(),
            cachedSqlQueryId,
            portableQuery,
            repository: context.repository,
            type: IsolateMessageType.FIND
        });
    }
    async findOne(portableQuery, context, cachedSqlQueryId) {
        return await this.sendMessage({
            ...this.getCoreFields(),
            cachedSqlQueryId,
            portableQuery,
            repository: context.repository,
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
        const dbEntity = context.dbEntity;
        return await this.sendMessage({
            ...this.getCoreFields(),
            dbEntity: {
                id: dbEntity.id,
                applicationVersionId: dbEntity.applicationVersion.id
            },
            entity,
            type: IsolateMessageType.SAVE
        });
    }
    async saveToDestination(repositoryDestination, entity, context) {
        const dbEntity = context.dbEntity;
        return await this.sendMessage({
            ...this.getCoreFields(),
            dbEntity: {
                id: dbEntity.id,
                applicationVersionId: dbEntity.applicationVersion.id
            },
            entity,
            repositoryDestination,
            type: IsolateMessageType.SAVE_TO_DESTINATION
        });
    }
    // FIXME: check if ensureGeneratedValues is needed
    async insertValues(portableQuery, context, ensureGeneratedValues // For internal use only
    ) {
        return await this.sendMessage({
            ...this.getCoreFields(),
            portableQuery,
            type: IsolateMessageType.INSERT_VALUES
        });
    }
    async insertValuesGetIds(portableQuery, context) {
        return await this.sendMessage({
            ...this.getCoreFields(),
            portableQuery,
            type: IsolateMessageType.INSERT_VALUES_GET_IDS
        });
    }
    async updateValues(portableQuery, context) {
        return await this.sendMessage({
            ...this.getCoreFields(),
            portableQuery,
            type: IsolateMessageType.UPDATE_VALUES
        });
    }
    async deleteWhere(portableQuery, context) {
        return await this.sendMessage({
            ...this.getCoreFields(),
            portableQuery,
            type: IsolateMessageType.DELETE_WHERE
        });
    }
    async startTransaction(context) {
        return await this.sendMessage({
            ...this.getCoreFields(),
            type: IsolateMessageType.START_TRANSACTION
        });
    }
    async commit(context) {
        return await this.sendMessage({
            ...this.getCoreFields(),
            type: IsolateMessageType.COMMIT
        });
    }
    async rollback(context) {
        return await this.sendMessage({
            ...this.getCoreFields(),
            type: IsolateMessageType.ROLLBACK
        });
    }
    async getLatestApplicationVersionMapByApplicationName(applicationName) {
        return await this.sendMessageNoWait({
            ...this.getCoreFields(),
            applicationName,
            type: IsolateMessageType.GET_LATEST_APPLICATION_VERSION_BY_APPLICATION_NAME
        });
    }
    async initializeConnection() {
        while (this.appState === AppState.NOT_INITIALIED
            || this.appState === AppState.START_INITIALIZING) {
            await this.isConnectionInitialized();
            await this.wait(100);
        }
    }
    async handleLocalApiRequest(request, origin) {
        while (this.appState !== AppState.INITIALIZED) {
            await this.wait(100);
        }
        const localApiServer = await container(this).get(LOCAL_API_SERVER);
        const response = await localApiServer.handleRequest(request);
        window.parent.postMessage(response, origin);
    }
    handleDbToIsolateMessage(message, mainDomain) {
        const messageRecord = this.pendingMessageMap.get(message.id);
        if (!messageRecord) {
            return;
        }
        let observableMessageRecord;
        switch (message.type) {
            // case IsolateMessageType.APP_INITIALIZING:
            // 	this.mainDomain = mainDomain
            // 	this.pendingMessageMap.delete(message.id);
            // 	return
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
            category: 'ToDb',
            id: ++this.messageId,
            applicationSignature: window.location.hostname.split('.')[0],
        };
    }
    async sendMessage(message) {
        while (!await this.isConnectionInitialized()) {
            await this.wait(100);
        }
        return await this.sendMessageNoWait(message);
    }
    async sendMessageNoWait(message) {
        window.parent.postMessage(message, hostServer);
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
            repository: context.repository,
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
                }).then();
            };
        });
        window.parent.postMessage(message, hostServer);
        return observable;
    }
    wait(milliseconds) {
        return new Promise((resolve, _reject) => {
            setTimeout(() => {
                resolve();
            }, milliseconds);
        });
    }
    async isConnectionInitialized() {
        switch (this.appState) {
            case AppState.NOT_INITIALIED:
                break;
            case AppState.INITIALIZING_IN_PROGRESS:
                return false;
            case AppState.START_INITIALIZING:
                this.appState = AppState.INITIALIZING_IN_PROGRESS;
                const applicationLoader = await container(this).get(APPLICATION_LOADER);
                await applicationLoader.load(this.lastIds);
                this.appState = AppState.INITIALIZED;
                window.parent.postMessage({
                    ...this.getCoreFields(),
                    applicationName: getApplicationName(applicationLoader.getApplication()),
                    type: IsolateMessageType.APP_INITIALIZED
                }, hostServer);
                return true;
            case AppState.INITIALIZED:
                return true;
        }
        const applicationLoader = await DI.db().get(APPLICATION_LOADER);
        let message = {
            ...this.getCoreFields(),
            application: applicationLoader.getApplication(),
            type: IsolateMessageType.APP_INITIALIZING
        };
        window.parent.postMessage(message, hostServer);
        return false;
    }
    onMessage(callback) {
        this.messageCallback = callback;
    }
}
DI.set(TRANSACTIONAL_CONNECTOR, IframeTransactionalConnector);
export function loadIframeTransactionalConnector() {
    console.log('IframeTransactionalConnector loaded');
}
//# sourceMappingURL=IFrameTransactionalConnector.js.map
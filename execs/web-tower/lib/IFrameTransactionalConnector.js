var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
import { getFullApplicationName } from '@airport/ground-control';
import { IsolateMessageType, AppState } from '@airport/apron';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from "uuid";
let IframeTransactionalConnector = class IframeTransactionalConnector {
    async processMessage(message, origin) {
        if (message.__received__) {
            return;
        }
        message.__received__ = true;
        if (this.applicationStore.state.messageCallback) {
            const receivedDate = new Date();
            message.__receivedTime__ = receivedDate.getTime();
            this.applicationStore.state.messageCallback(message);
        }
        if (message.domain.indexOf('.') > -1) {
            // Invalid Domain name - cannot have periods that would point to invalid subdomains
            return;
        }
        if (message.application.indexOf('.') > -1) {
            // Invalid Application name - cannot have periods that would point to invalid subdomains
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
                // And only if message has Domain and Application names 
                || !message.domain
                || !message.application
                // And if own domain is a direct sub-domain of the message's domain
                || ownDomain !== getFullApplicationName({
                    domain: message.domain,
                    name: message.application,
                }) + domainSuffix) {
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
                await this.handleLocalApiRequest(message, origin);
                return;
            case 'FromDb':
                this.applicationStore.state.domain = message.domain;
                this.applicationStore.state.application = message.application;
                if (message.type === IsolateMessageType.APP_INITIALIZING) {
                    if (this.applicationStore.state.appState === AppState.NOT_INITIALIED) {
                        let initConnectionIMO = message;
                        this.applicationStore.state.lastIds = initConnectionIMO.result;
                        this.applicationStore.state.appState = AppState.START_INITIALIZING;
                    }
                    return;
                }
                this.handleDbToIsolateMessage(message, mainDomain);
                return;
            default:
                return;
        }
    }
    async callApi(apiInput) {
        return await this.sendMessage({
            ...this.getCoreFields(),
            args: apiInput.args,
            methodName: apiInput.methodName,
            objectName: apiInput.objectName,
            type: IsolateMessageType.CALL_API
        });
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
            // url
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
    async getLatestApplicationVersionMapByFullApplicationName(fullApplicationName) {
        return await this.sendMessageNoWait({
            ...this.getCoreFields(),
            fullApplicationName: fullApplicationName,
            type: IsolateMessageType.GET_LATEST_APPLICATION_VERSION_BY_APPLICATION_NAME
        });
    }
    async initializeConnection() {
        while (this.applicationStore.state.appState === AppState.NOT_INITIALIED
            || this.applicationStore.state.appState === AppState.START_INITIALIZING) {
            await this.isConnectionInitialized();
            await this.wait(100);
        }
    }
    async handleLocalApiRequest(request, origin) {
        while (this.applicationStore.state.appState !== AppState.INITIALIZED) {
            await this.wait(100);
        }
        const response = await this.localApiServer.handleRequest(request);
        window.parent.postMessage(response, origin);
    }
    handleDbToIsolateMessage(message, mainDomain) {
        const messageRecord = this.applicationStore.state.pendingMessageMap.get(message.id);
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
                observableMessageRecord = this.applicationStore.state.observableMessageMap.get(message.id);
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
                observableMessageRecord = this.applicationStore.state.observableMessageMap.get(message.id);
                if (!observableMessageRecord || !observableMessageRecord.observer) {
                    return;
                }
                observableMessageRecord.observer.complete();
                this.applicationStore.state.pendingMessageMap.delete(message.id);
                return;
        }
        if (message.errorMessage) {
            messageRecord.reject(message.errorMessage);
        }
        else {
            messageRecord.resolve(message.result);
        }
        this.applicationStore.state.pendingMessageMap.delete(message.id);
    }
    getCoreFields() {
        return {
            application: this.applicationStore.state.application,
            category: 'ToDb',
            domain: this.applicationStore.state.domain,
            id: uuidv4(),
        };
    }
    async sendMessage(message) {
        while (!await this.isConnectionInitialized()) {
            await this.wait(100);
        }
        return await this.sendMessageNoWait(message);
    }
    async sendMessageNoWait(message) {
        message.transactionId = this.__container__.context.id;
        window.parent.postMessage(message, this.applicationStore.state.hostServer);
        return new Promise((resolve, reject) => {
            this.applicationStore.state.pendingMessageMap.set(message.id, {
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
        this.applicationStore.state.observableMessageMap.set(coreFields.id, observableMessageRecord);
        const observable = new Observable((observer) => {
            observableMessageRecord.observer = observer;
            return () => {
                this.sendMessage({
                    ...coreFields,
                    type: IsolateMessageType.SEARCH_UNSUBSCRIBE
                }).then();
            };
        });
        window.parent.postMessage(message, this.applicationStore.state.hostServer);
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
        switch (this.applicationStore.state.appState) {
            case AppState.NOT_INITIALIED:
                break;
            case AppState.INITIALIZING_IN_PROGRESS:
                return false;
            case AppState.START_INITIALIZING:
                this.applicationStore.state.appState = AppState.INITIALIZING_IN_PROGRESS;
                await this.applicationLoader.load(this.applicationStore.state.lastIds);
                this.applicationStore.state.appState = AppState.INITIALIZED;
                await this.applicationLoader.initialize();
                window.parent.postMessage({
                    ...this.getCoreFields(),
                    fullApplicationName: getFullApplicationName(this.applicationLoader.getApplication()),
                    type: IsolateMessageType.APP_INITIALIZED
                }, this.applicationStore.state.hostServer);
                return true;
            case AppState.INITIALIZED:
                return true;
        }
        let jsonApplication = this.applicationLoader.getApplication();
        this.applicationStore.state.domain = jsonApplication.domain;
        this.applicationStore.state.application = jsonApplication.name;
        let message = {
            ...this.getCoreFields(),
            jsonApplication,
            type: IsolateMessageType.APP_INITIALIZING
        };
        window.parent.postMessage(message, this.applicationStore.state.hostServer);
        return false;
    }
    async retrieveDomain(domainName) {
        return await this.sendMessageNoWait({
            ...this.getCoreFields(),
            domainName,
            type: IsolateMessageType.RETRIEVE_DOMAIN
        });
    }
    onMessage(callback) {
        this.applicationStore.state.messageCallback = callback;
    }
};
__decorate([
    Inject()
], IframeTransactionalConnector.prototype, "applicationLoader", void 0);
__decorate([
    Inject()
], IframeTransactionalConnector.prototype, "localApiServer", void 0);
__decorate([
    Inject()
], IframeTransactionalConnector.prototype, "applicationStore", void 0);
IframeTransactionalConnector = __decorate([
    Injected()
], IframeTransactionalConnector);
export { IframeTransactionalConnector };
//# sourceMappingURL=IFrameTransactionalConnector.js.map
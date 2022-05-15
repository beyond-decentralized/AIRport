var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
import { INTERNAL_DOMAIN } from '@airport/ground-control';
import { IsolateMessageType } from '@airport/apron';
let TransactionalReceiver = class TransactionalReceiver {
    async processMessage(message) {
        let result;
        let errorMessage;
        try {
            if (message.domain === INTERNAL_DOMAIN) {
                throw new Error(`Internal domain cannot be used in external calls`);
            }
            let credentials = {
                application: message.application,
                domain: message.domain,
                methodName: message.methodName,
                objectName: message.objectName,
                transactionId: message.transactionId
            };
            let context = {};
            context.startedAt = new Date();
            const { theErrorMessage, theResult } = await this.doProcessMessage(message, credentials, context);
            errorMessage = theErrorMessage;
            result = theResult;
        }
        catch (error) {
            console.error(error);
            result = null;
            errorMessage = error.message;
        }
        return {
            application: message.application,
            category: 'FromDb',
            domain: message.domain,
            errorMessage,
            id: message.id,
            type: message.type,
            result
        };
    }
    async doProcessMessage(message, credentials, context) {
        let theErrorMessage = null;
        let theResult = null;
        switch (message.type) {
            case IsolateMessageType.APP_INITIALIZING:
                let initConnectionMessage = message;
                const application = initConnectionMessage.jsonApplication;
                const fullApplicationName = this.dbApplicationUtils.
                    getFullApplicationName(application);
                const messageFullApplicationName = this.dbApplicationUtils.
                    getFullApplicationNameFromDomainAndName(message.domain, message.application);
                if (fullApplicationName !== messageFullApplicationName) {
                    theResult = null;
                    break;
                }
                if (this.terminalStore.getReceiver().initializingApps
                    .has(fullApplicationName)) {
                    return {
                        theErrorMessage,
                        theResult
                    };
                }
                this.terminalStore.getReceiver().initializingApps
                    .add(fullApplicationName);
                // FIXME: initalize ahead of time, at Isolate Loading
                await this.databaseManager.initFeatureApplications({}, [application]);
                await this.internalRecordManager.ensureApplicationRecords(application, {});
                theResult = application.lastIds;
                break;
            case IsolateMessageType.APP_INITIALIZED:
                const initializedApps = this.terminalStore.getReceiver().initializedApps;
                initializedApps.add(message.fullApplicationName);
                return {
                    theErrorMessage,
                    theResult
                };
            case IsolateMessageType.GET_LATEST_APPLICATION_VERSION_BY_APPLICATION_NAME: {
                theResult = this.terminalStore.getLatestApplicationVersionMapByFullApplicationName()
                    .get(message.fullApplicationName);
                break;
            }
            case IsolateMessageType.RETRIEVE_DOMAIN: {
                theResult = this.terminalStore.getDomainMapByName()
                    .get(message.domain);
                break;
            }
            case IsolateMessageType.ADD_REPOSITORY:
                // const addRepositoryMessage: IAddRepositoryIMI = <IAddRepositoryIMI>message
                theResult = await this.transactionalServer.addRepository(
                // addRepositoryMessage.url,
                // addRepositoryMessage.platform,
                // addRepositoryMessage.platformConfig,
                // addRepositoryMessage.distributionStrategy,
                credentials, context);
                break;
            case IsolateMessageType.DELETE_WHERE:
                const deleteWhereMessage = message;
                theResult = await this.transactionalServer.deleteWhere(deleteWhereMessage.portableQuery, credentials, context);
                break;
            case IsolateMessageType.FIND:
                const findMessage = message;
                theResult = await this.transactionalServer.find(findMessage.portableQuery, credentials, {
                    ...context,
                    repository: findMessage.repository
                });
                break;
            case IsolateMessageType.FIND_ONE:
                const findOneMessage = message;
                theResult = await this.transactionalServer.findOne(findOneMessage.portableQuery, credentials, {
                    ...context,
                    repository: findOneMessage.repository,
                });
                break;
            case IsolateMessageType.INSERT_VALUES:
                const insertValuesMessage = message;
                theResult = await this.transactionalServer.insertValues(insertValuesMessage.portableQuery, credentials, context);
                break;
            case IsolateMessageType.INSERT_VALUES_GET_IDS:
                const insertValuesGetIdsMessage = message;
                theResult = await this.transactionalServer.insertValuesGetIds(insertValuesGetIdsMessage.portableQuery, credentials, context);
                break;
            case IsolateMessageType.SAVE:
            case IsolateMessageType.SAVE_TO_DESTINATION: {
                const saveMessage = message;
                if (!saveMessage.dbEntity) {
                    theErrorMessage = `DbEntity id was not passed in`;
                    break;
                }
                const dbEntityId = saveMessage.dbEntity.id;
                const dbEntity = this.terminalStore.getAllEntities()[dbEntityId];
                if (!dbEntity) {
                    theErrorMessage = `Could not find DbEntity with Id ${dbEntityId}`;
                    break;
                }
                context.dbEntity = dbEntity;
                if (message.type === IsolateMessageType.SAVE) {
                    theResult = await this.transactionalServer.save(saveMessage.entity, credentials, context);
                }
                else {
                    const saveToDestinationMessage = message;
                    theResult = await this.transactionalServer.saveToDestination(saveToDestinationMessage.repositoryDestination, saveToDestinationMessage.entity, credentials, context);
                }
                break;
            }
            case IsolateMessageType.SEARCH:
                const searchMessage = message;
                theResult = await this.transactionalServer.search(searchMessage.portableQuery, credentials, {
                    ...context,
                    repository: searchMessage.repository,
                });
                break;
            case IsolateMessageType.SEARCH_ONE:
                const searchOneMessage = message;
                theResult = await this.transactionalServer.search(searchOneMessage.portableQuery, credentials, {
                    ...context,
                    repository: searchOneMessage.repository,
                });
                break;
            case IsolateMessageType.UPDATE_VALUES:
                const updateValuesMessage = message;
                theResult = await this.transactionalServer.updateValues(updateValuesMessage.portableQuery, credentials, context);
                break;
            default:
                // Unexpected IsolateMessageInType
                return {
                    theErrorMessage,
                    theResult
                };
        }
        return {
            theErrorMessage,
            theResult,
        };
    }
    async startApiCall(message, context, nativeHandleCallback) {
        const transactionCredentials = {
            application: message.application,
            domain: message.domain,
            methodName: message.methodName,
            objectName: message.objectName,
            transactionId: message.transactionId
        };
        if (!await this.transactionalServer.startTransaction(transactionCredentials, context)) {
            return false;
        }
        const initiator = context.transaction.initiator;
        initiator.application = message.application;
        initiator.domain = message.domain;
        initiator.methodName = message.methodName;
        initiator.objectName = message.objectName;
        message.transactionId = context.transaction.id;
        try {
            await nativeHandleCallback();
        }
        catch (e) {
            context.errorMessage = e.message;
            this.transactionalServer.rollback(transactionCredentials, context);
            return false;
        }
        return true;
    }
    async endApiCall(credentials, errorMessage, context) {
        if (errorMessage) {
            return await this.transactionalServer.rollback(credentials, context);
        }
        else {
            return await this.transactionalServer.commit(credentials, context);
        }
    }
};
__decorate([
    Inject()
], TransactionalReceiver.prototype, "databaseManager", void 0);
__decorate([
    Inject()
], TransactionalReceiver.prototype, "dbApplicationUtils", void 0);
__decorate([
    Inject()
], TransactionalReceiver.prototype, "internalRecordManager", void 0);
__decorate([
    Inject()
], TransactionalReceiver.prototype, "terminalStore", void 0);
__decorate([
    Inject()
], TransactionalReceiver.prototype, "transactionManager", void 0);
__decorate([
    Inject()
], TransactionalReceiver.prototype, "transactionalServer", void 0);
TransactionalReceiver = __decorate([
    Injected()
], TransactionalReceiver);
export { TransactionalReceiver };
//# sourceMappingURL=TransactionalReceiver.js.map
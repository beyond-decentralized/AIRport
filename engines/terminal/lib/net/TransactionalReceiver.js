var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
import { INTERNAL_DOMAIN } from '@airport/ground-control';
import { IsolateMessageType } from '@airport/apron';
import { v4 as guidv4 } from "uuid";
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
                const fullApplication_Name = this.dbApplicationUtils.
                    getFullApplication_Name(application);
                const messageFullApplication_Name = this.dbApplicationUtils.
                    getFullApplication_NameFromDomainAndName(message.domain, message.application);
                if (fullApplication_Name !== messageFullApplication_Name) {
                    theResult = null;
                    break;
                }
                if (this.terminalStore.getReceiver().initializingApps
                    .has(fullApplication_Name)) {
                    return {
                        theErrorMessage,
                        theResult
                    };
                }
                this.terminalStore.getReceiver().initializingApps
                    .add(fullApplication_Name);
                // FIXME: initalize ahead of time, at Isolate Loading
                await this.databaseManager.initFeatureApplications({}, [application]);
                await this.internalRecordManager.ensureApplicationRecords(application, {});
                theResult = application.lastIds;
                break;
            case IsolateMessageType.APP_INITIALIZED:
                const initializedApps = this.terminalStore.getReceiver().initializedApps;
                initializedApps.add(message.fullApplication_Name);
                return {
                    theErrorMessage,
                    theResult
                };
            case IsolateMessageType.GET_LATEST_APPLICATION_VERSION_BY_APPLICATION_NAME: {
                theResult = this.terminalStore.getLatestApplicationVersionMapByFullApplication_Name()
                    .get(message.fullApplication_Name);
                break;
            }
            case IsolateMessageType.RETRIEVE_DOMAIN: {
                theResult = this.terminalStore.getDomainMapByName()
                    .get(message.domain);
                break;
            }
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
                theResult = await this.transactionalServer.insertValuesGetLocalIds(insertValuesGetIdsMessage.portableQuery, credentials, context);
                break;
            case IsolateMessageType.SAVE:
            case IsolateMessageType.SAVE_TO_DESTINATION: {
                const saveMessage = message;
                if (!saveMessage.dbEntity) {
                    theErrorMessage = `DbEntity id was not passed in`;
                    break;
                }
                const dbEntityId = saveMessage.dbEntity._localId;
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
        const userSession = await this.terminalSessionManager.getUserSession();
        const transactionCredentials = {
            application: message.application,
            domain: message.domain,
            methodName: message.methodName,
            objectName: message.objectName,
            transactionId: message.transactionId
        };
        if (!await this.transactionalServer.startTransaction(transactionCredentials, context)) {
            return {
                isStarted: false
            };
        }
        let actor = await this.getApiCallActor(message, userSession, context);
        context.transaction.actor = actor;
        const initiator = context.transaction.initiator;
        initiator.application = message.application;
        initiator.domain = message.domain;
        initiator.methodName = message.methodName;
        initiator.objectName = message.objectName;
        let isFramework = true;
        try {
            if (message.domain !== INTERNAL_DOMAIN) {
                isFramework = false;
                await this.doNativeHandleCallback(message, actor, context, nativeHandleCallback);
            }
        }
        catch (e) {
            context.errorMessage = e.message;
            this.transactionalServer.rollback(transactionCredentials, context);
            return {
                isStarted: false
            };
        }
        return {
            isFramework,
            isStarted: true
        };
    }
    async doNativeHandleCallback(message, actor, context, nativeHandleCallback) {
        message.transactionId = context.transaction.id;
        message.actor = {
            application: actor.application,
            GUID: actor.GUID,
            terminal: {
                GUID: actor.terminal.GUID
            },
            userAccount: {
                GUID: actor.userAccount.username,
                username: actor.userAccount.username
            }
        };
        await nativeHandleCallback();
    }
    async getApiCallActor(message, userSession, context) {
        if (context.transaction.parentTransaction) {
            return context.transaction.parentTransaction.actor;
        }
        const terminal = this.terminalStore.getTerminal();
        let actor = await this.actorDao.findOneByDomainAndApplication_Names_UserAccountGUID_TerminalGUID(message.domain, message.application, userSession.userAccount.GUID, terminal.GUID);
        if (actor) {
            userSession.currentActor = actor;
            return actor;
        }
        const application = await this.applicationDao.findOneByDomain_NameAndApplication_Name(message.domain, message.application);
        actor = {
            application,
            GUID: guidv4(),
            terminal: terminal,
            userAccount: userSession.userAccount
        };
        await this.actorDao.save(actor);
        userSession.currentActor = actor;
        return actor;
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
], TransactionalReceiver.prototype, "actorDao", void 0);
__decorate([
    Inject()
], TransactionalReceiver.prototype, "applicationDao", void 0);
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
], TransactionalReceiver.prototype, "localApiServer", void 0);
__decorate([
    Inject()
], TransactionalReceiver.prototype, "terminalSessionManager", void 0);
__decorate([
    Inject()
], TransactionalReceiver.prototype, "terminalStore", void 0);
__decorate([
    Inject()
], TransactionalReceiver.prototype, "transactionalServer", void 0);
TransactionalReceiver = __decorate([
    Injected()
], TransactionalReceiver);
export { TransactionalReceiver };
//# sourceMappingURL=TransactionalReceiver.js.map
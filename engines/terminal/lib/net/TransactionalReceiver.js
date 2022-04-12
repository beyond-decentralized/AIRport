import { container, } from '@airport/di';
import { getFullApplicationName, getFullApplicationNameFromDomainAndName, INTERNAL_DOMAIN } from '@airport/ground-control';
import { IsolateMessageType } from '@airport/security-check';
import { TERMINAL_STORE, TRANSACTIONAL_SERVER } from '@airport/terminal-map';
import { DATABASE_MANAGER, INTERNAL_RECORD_MANAGER } from '../tokens';
export class TransactionalReceiver {
    async processMessage(message) {
        let result;
        let errorMessage;
        try {
            if (message.domain === INTERNAL_DOMAIN) {
                throw new Error(`Internal domain cannot be used in external calls`);
            }
            const [transactionalServer, terminalStore] = await container(this)
                .get(TRANSACTIONAL_SERVER, TERMINAL_STORE);
            let credentials = {
                application: message.application,
                domain: message.domain,
                methodName: message.methodName,
                objectName: message.objectName
            };
            let context = {};
            context.startedAt = new Date();
            switch (message.type) {
                case IsolateMessageType.CALL_API: {
                    const context = {};
                    try {
                        result = await this.nativeHandleApiCall(message, context);
                    }
                    catch (e) {
                        errorMessage = e.message;
                    }
                    break;
                }
                case IsolateMessageType.APP_INITIALIZING:
                    let initConnectionMessage = message;
                    const application = initConnectionMessage.jsonApplication;
                    const fullApplicationName = getFullApplicationName(application);
                    const messageFullApplicationName = getFullApplicationNameFromDomainAndName(message.domain, message.application);
                    if (fullApplicationName !== messageFullApplicationName) {
                        result = null;
                        break;
                    }
                    if (terminalStore.getReceiver().initializingApps.has(fullApplicationName)) {
                        return null;
                    }
                    terminalStore.getReceiver().initializingApps.add(fullApplicationName);
                    const [databaseManager, internalRecordManager] = await container(this)
                        .get(DATABASE_MANAGER, INTERNAL_RECORD_MANAGER);
                    // FIXME: initalize ahead of time, at Isolate Loading
                    await databaseManager.initFeatureApplications({}, [application]);
                    await internalRecordManager.ensureApplicationRecords(application, {});
                    result = application.lastIds;
                    break;
                case IsolateMessageType.APP_INITIALIZED:
                    const initializedApps = terminalStore.getReceiver().initializedApps;
                    initializedApps.add(message.fullApplicationName);
                    return null;
                case IsolateMessageType.GET_LATEST_APPLICATION_VERSION_BY_APPLICATION_NAME: {
                    const terminalStore = await container(this).get(TERMINAL_STORE);
                    result = terminalStore.getLatestApplicationVersionMapByFullApplicationName()
                        .get(message.fullApplicationName);
                    break;
                }
                case IsolateMessageType.RETRIEVE_DOMAIN: {
                    const terminalStore = await container(this).get(TERMINAL_STORE);
                    result = terminalStore.getDomainMapByName()
                        .get(message.domain);
                    break;
                }
                case IsolateMessageType.ADD_REPOSITORY:
                    // const addRepositoryMessage: IAddRepositoryIMI = <IAddRepositoryIMI>message
                    result = await transactionalServer.addRepository(
                    // addRepositoryMessage.url,
                    // addRepositoryMessage.platform,
                    // addRepositoryMessage.platformConfig,
                    // addRepositoryMessage.distributionStrategy,
                    credentials, context);
                    break;
                case IsolateMessageType.DELETE_WHERE:
                    const deleteWhereMessage = message;
                    result = await transactionalServer.deleteWhere(deleteWhereMessage.portableQuery, credentials, context);
                    break;
                case IsolateMessageType.FIND:
                    const findMessage = message;
                    result = await transactionalServer.find(findMessage.portableQuery, credentials, {
                        ...context,
                        repository: findMessage.repository
                    });
                    break;
                case IsolateMessageType.FIND_ONE:
                    const findOneMessage = message;
                    result = await transactionalServer.findOne(findOneMessage.portableQuery, credentials, {
                        ...context,
                        repository: findMessage.repository,
                    });
                    break;
                case IsolateMessageType.INSERT_VALUES:
                    const insertValuesMessage = message;
                    result = await transactionalServer.insertValues(insertValuesMessage.portableQuery, credentials, context);
                    break;
                case IsolateMessageType.INSERT_VALUES_GET_IDS:
                    const insertValuesGetIdsMessage = message;
                    result = await transactionalServer.insertValuesGetIds(insertValuesGetIdsMessage.portableQuery, credentials, context);
                    break;
                case IsolateMessageType.SAVE:
                case IsolateMessageType.SAVE_TO_DESTINATION: {
                    const saveMessage = message;
                    const terminalStore = await container(this).get(TERMINAL_STORE);
                    if (!saveMessage.dbEntity) {
                        errorMessage = `DbEntity id was not passed in`;
                        break;
                    }
                    const dbEntityId = saveMessage.dbEntity.id;
                    const dbEntity = terminalStore.getAllEntities()[dbEntityId];
                    if (!dbEntity) {
                        errorMessage = `Could not find DbEntity with Id ${dbEntityId}`;
                        break;
                    }
                    context.dbEntity = dbEntity;
                    if (message.type === IsolateMessageType.SAVE) {
                        result = await transactionalServer.save(saveMessage.entity, credentials, context);
                    }
                    else {
                        const saveToDestinationMessage = message;
                        result = await transactionalServer.saveToDestination(saveToDestinationMessage.repositoryDestination, saveToDestinationMessage.entity, credentials, context);
                    }
                    break;
                }
                case IsolateMessageType.SEARCH:
                    const searchMessage = message;
                    result = await transactionalServer.search(searchMessage.portableQuery, credentials, {
                        ...context,
                        repository: findMessage.repository,
                    });
                    break;
                case IsolateMessageType.SEARCH_ONE:
                    const searchOneMessage = message;
                    result = await transactionalServer.search(searchOneMessage.portableQuery, credentials, {
                        ...context,
                        repository: findMessage.repository,
                    });
                    break;
                case IsolateMessageType.UPDATE_VALUES:
                    const updateValuesMessage = message;
                    result = await transactionalServer.updateValues(updateValuesMessage.portableQuery, credentials, context);
                    break;
                default:
                    // Unexpected IsolateMessageInType
                    return;
            }
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
    async startApiCall(message, context, nativeHandleCallback) {
        const transactionalServer = await container(this)
            .get(TRANSACTIONAL_SERVER);
        if (!await transactionalServer.startTransaction({
            application: message.application,
            domain: message.domain,
            methodName: message.methodName,
            objectName: message.objectName,
            transactionId: message.transactionId
        }, context)) {
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
            return false;
        }
        return true;
    }
    async endApiCall(credentials, errorMessage, context) {
        const transactionalServer = await container(this).get(TRANSACTIONAL_SERVER);
        if (errorMessage) {
            return await transactionalServer.rollback(credentials, context);
        }
        else {
            return await transactionalServer.commit(credentials, context);
        }
    }
    async handleApiCall(message, context, nativeHandleCallback) {
        const transactionalServer = await container(this)
            .get(TRANSACTIONAL_SERVER);
        if (!await transactionalServer.startTransaction({
            application: message.application,
            domain: message.domain,
            methodName: message.methodName,
            objectName: message.objectName
        }, context)) {
            return false;
        }
        try {
            await nativeHandleCallback();
        }
        catch (e) {
            context.errorMessage = e.message;
            return false;
        }
        return true;
    }
}
//# sourceMappingURL=TransactionalReceiver.js.map
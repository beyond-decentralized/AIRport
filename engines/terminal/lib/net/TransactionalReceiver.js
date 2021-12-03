import { container, } from '@airport/di';
import { getApplicationName } from '@airport/ground-control';
import { IsolateMessageType } from '@airport/security-check';
import { TERMINAL_STORE, TRANSACTIONAL_SERVER } from '@airport/terminal-map';
import { DATABASE_MANAGER, INTERNAL_RECORD_MANAGER } from '../tokens';
export class TransactionalReceiver {
    constructor() {
        // FIXME: move this state to Terminal.state
        this.initializingApps = new Set();
        this.initializedApps = new Set();
    }
    async processMessage(message) {
        const transactionalServer = await container(this)
            .get(TRANSACTIONAL_SERVER);
        let result;
        let errorMessage;
        let credentials = {
            applicationSignature: message.applicationSignature
        };
        let context = {};
        context.startedAt = new Date();
        try {
            switch (message.type) {
                case IsolateMessageType.APP_INITIALIZING:
                    let initConnectionMessage = message;
                    const application = initConnectionMessage.application;
                    const applicationName = getApplicationName(application);
                    if (this.initializingApps.has(applicationName)) {
                        return null;
                    }
                    this.initializingApps.add(applicationName);
                    const [databaseManager, internalRecordManager] = await container(this)
                        .get(DATABASE_MANAGER, INTERNAL_RECORD_MANAGER);
                    // FIXME: initalize ahead of time, at Isolate Loading
                    await databaseManager.initFeatureApplications({}, [application]);
                    await internalRecordManager.ensureApplicationRecords(application, message.applicationSignature, {});
                    result = application.lastIds;
                    break;
                case IsolateMessageType.APP_INITIALIZED:
                    this.initializedApps.add(message.applicationName);
                    return null;
                case IsolateMessageType.ADD_REPOSITORY:
                    // const addRepositoryMessage: IAddRepositoryIMI = <IAddRepositoryIMI>message
                    result = await transactionalServer.addRepository(
                    // addRepositoryMessage.url,
                    // addRepositoryMessage.platform,
                    // addRepositoryMessage.platformConfig,
                    // addRepositoryMessage.distributionStrategy,
                    credentials, context);
                    break;
                case IsolateMessageType.COMMIT:
                    result = await transactionalServer.commit(credentials, {});
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
                case IsolateMessageType.ROLLBACK:
                    result = await transactionalServer.rollback(credentials, {});
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
                case IsolateMessageType.START_TRANSACTION:
                    result = await transactionalServer.startTransaction(credentials, context);
                    break;
                case IsolateMessageType.UPDATE_VALUES:
                    const updateValuesMessage = message;
                    result = await transactionalServer.updateValues(updateValuesMessage.portableQuery, credentials, context);
                    break;
                case IsolateMessageType.GET_LATEST_APPLICATION_VERSION_BY_APPLICATION_NAME: {
                    const terminalStore = await container(this).get(TERMINAL_STORE);
                    result = terminalStore.getLatestApplicationVersionMapByApplicationName()
                        .get(message.applicationName);
                    break;
                }
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
            category: 'FromDb',
            errorMessage,
            id: message.id,
            applicationSignature: message.applicationSignature,
            type: message.type,
            result
        };
    }
}
//# sourceMappingURL=TransactionalReceiver.js.map
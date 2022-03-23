import { IEntityContext } from '@airport/air-control';
import {
    container,
    IContext,
} from '@airport/di';
import {
    getFullApplicationName,
    getFullApplicationNameFromDomainAndName
} from '@airport/ground-control';
import {
    IConnectionInitializedIMI,
    IGetLatestApplicationVersionByApplicationNameIMI,
    IInitConnectionIMI,
    IIsolateMessage,
    IIsolateMessageOut,
    IPortableQueryIMI,
    IReadQueryIMI,
    ISaveIMI,
    ISaveToDestinationIMI,
    IsolateMessageType,
    JsonApplicationWithLastIds
} from '@airport/security-check';
import {
    ICredentials,
    IQueryOperationContext,
    TERMINAL_STORE,
    TRANSACTIONAL_SERVER
} from '@airport/terminal-map';
import {
    DATABASE_MANAGER,
    INTERNAL_RECORD_MANAGER
} from '../tokens';

export abstract class TransactionalReceiver {

    // FIXME: move this state to Terminal.state
    initializingApps: Set<string> = new Set()

    async processMessage<ReturnType extends IIsolateMessageOut<any>>(
        message: IIsolateMessage
    ): Promise<ReturnType> {
        const [transactionalServer, terminalStore] = await container(this)
            .get(TRANSACTIONAL_SERVER, TERMINAL_STORE)
        let result: any
        let errorMessage
        let credentials: ICredentials = {
            application: message.application,
            domain: message.domain
        }
        let context: IContext = {}
        context.startedAt = new Date()
        try {
            switch (message.type) {
                case IsolateMessageType.APP_INITIALIZING:
                    let initConnectionMessage: IInitConnectionIMI = message as any
                    const application: JsonApplicationWithLastIds = initConnectionMessage.jsonApplication
                    const fullApplicationName = getFullApplicationName(application)
                    const messageFullApplicationName = getFullApplicationNameFromDomainAndName(message.domain, message.application)
                    if (fullApplicationName !== messageFullApplicationName) {
                        result = null
                        break
                    }

                    if (this.initializingApps.has(fullApplicationName)) {
                        return null
                    }
                    this.initializingApps.add(fullApplicationName)

                    const [databaseManager, internalRecordManager] = await container(this)
                        .get(DATABASE_MANAGER, INTERNAL_RECORD_MANAGER)
                    // FIXME: initalize ahead of time, at Isolate Loading
                    await databaseManager.initFeatureApplications({}, [application])

                    await internalRecordManager.ensureApplicationRecords(
                        application, {})

                    result = application.lastIds
                    break
                case IsolateMessageType.APP_INITIALIZED:
                    const lastTerminalState = terminalStore.getTerminalState()
                    const initializedApps = lastTerminalState.initializedApps
                    initializedApps.add((message as IConnectionInitializedIMI).fullApplicationName)
                    terminalStore.state.next({
                        ...lastTerminalState,
                        initializedApps
                    })
                    return null
                case IsolateMessageType.GET_LATEST_APPLICATION_VERSION_BY_APPLICATION_NAME: {
                    const terminalStore = await container(this).get(TERMINAL_STORE)
                    result = terminalStore.getLatestApplicationVersionMapByFullApplicationName()
                        .get((message as IGetLatestApplicationVersionByApplicationNameIMI).fullApplicationName)
                    break
                }
                case IsolateMessageType.ADD_REPOSITORY:
                    // const addRepositoryMessage: IAddRepositoryIMI = <IAddRepositoryIMI>message
                    result = await transactionalServer.addRepository(
                        // addRepositoryMessage.url,
                        // addRepositoryMessage.platform,
                        // addRepositoryMessage.platformConfig,
                        // addRepositoryMessage.distributionStrategy,
                        credentials,
                        context
                    );
                    break
                case IsolateMessageType.COMMIT:
                    result = await transactionalServer.commit(
                        credentials,
                        {}
                    )
                    break
                case IsolateMessageType.DELETE_WHERE:
                    const deleteWhereMessage: IPortableQueryIMI = <IPortableQueryIMI>message
                    result = await transactionalServer.deleteWhere(
                        deleteWhereMessage.portableQuery,
                        credentials,
                        context
                    )
                    break
                case IsolateMessageType.FIND:
                    const findMessage: IReadQueryIMI = <IReadQueryIMI>message;
                    result = await transactionalServer.find(
                        findMessage.portableQuery,
                        credentials,
                        {
                            ...context as any,
                            repository: findMessage.repository
                        } as IQueryOperationContext
                    )
                    break
                case IsolateMessageType.FIND_ONE:
                    const findOneMessage: IReadQueryIMI = <IReadQueryIMI>message;
                    result = await transactionalServer.findOne(
                        findOneMessage.portableQuery,
                        credentials,
                        {
                            ...context as any,
                            repository: findMessage.repository,
                        } as IQueryOperationContext
                    )
                    break
                case IsolateMessageType.INSERT_VALUES:
                    const insertValuesMessage: IPortableQueryIMI = <IPortableQueryIMI>message
                    result = await transactionalServer.insertValues(
                        insertValuesMessage.portableQuery,
                        credentials,
                        context
                    )
                    break
                case IsolateMessageType.INSERT_VALUES_GET_IDS:
                    const insertValuesGetIdsMessage: IPortableQueryIMI = <IPortableQueryIMI>message
                    result = await transactionalServer.insertValuesGetIds(
                        insertValuesGetIdsMessage.portableQuery,
                        credentials,
                        context
                    )
                    break
                case IsolateMessageType.ROLLBACK:
                    result = await transactionalServer.rollback(
                        credentials,
                        {}
                    )
                    break
                case IsolateMessageType.SAVE:
                case IsolateMessageType.SAVE_TO_DESTINATION: {
                    const saveMessage: ISaveIMI<any, any> = <ISaveIMI<any, any>>message
                    const terminalStore = await container(this).get(TERMINAL_STORE)
                    if (!saveMessage.dbEntity) {
                        errorMessage = `DbEntity id was not passed in`
                        break
                    }
                    const dbEntityId = saveMessage.dbEntity.id
                    const dbEntity = terminalStore.getAllEntities()[dbEntityId]
                    if (!dbEntity) {
                        errorMessage = `Could not find DbEntity with Id ${dbEntityId}`
                        break
                    }
                    (context as IEntityContext).dbEntity = dbEntity as any
                    if (message.type === IsolateMessageType.SAVE) {
                        result = await transactionalServer.save(
                            saveMessage.entity,
                            credentials,
                            context as IEntityContext
                        )
                    } else {
                        const saveToDestinationMessage: ISaveToDestinationIMI<any, any>
                            = <ISaveToDestinationIMI<any, any>>message
                        result = await transactionalServer.saveToDestination(
                            saveToDestinationMessage.repositoryDestination,
                            saveToDestinationMessage.entity,
                            credentials,
                            context as IEntityContext
                        )
                    }
                    break
                }
                case IsolateMessageType.SEARCH:
                    const searchMessage: IReadQueryIMI = <IReadQueryIMI>message;
                    result = await transactionalServer.search(
                        searchMessage.portableQuery,
                        credentials,
                        {
                            ...context as any,
                            repository: findMessage.repository,
                        } as IQueryOperationContext
                    )
                    break
                case IsolateMessageType.SEARCH_ONE:
                    const searchOneMessage: IReadQueryIMI = <IReadQueryIMI>message;
                    result = await transactionalServer.search(
                        searchOneMessage.portableQuery,
                        credentials,
                        {
                            ...context as any,
                            repository: findMessage.repository,
                        } as IQueryOperationContext
                    )
                    break
                case IsolateMessageType.START_TRANSACTION:
                    result = await transactionalServer.startTransaction(
                        credentials,
                        context
                    )
                    break
                case IsolateMessageType.UPDATE_VALUES:
                    const updateValuesMessage: IPortableQueryIMI = <IPortableQueryIMI>message
                    result = await transactionalServer.updateValues(
                        updateValuesMessage.portableQuery,
                        credentials,
                        context
                    )
                    break
                default:
                    // Unexpected IsolateMessageInType
                    return
            }
        } catch (error) {
            console.error(error)
            result = null
            errorMessage = error.message
        }
        return {
            application: message.application,
            category: 'FromDb',
            domain: message.domain,
            errorMessage,
            id: message.id,
            type: message.type,
            result
        } as any
    }

}
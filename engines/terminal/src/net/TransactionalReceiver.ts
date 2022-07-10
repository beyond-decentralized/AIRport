import {
    Inject,
    Injected
} from '@airport/direction-indicator'
import {
    ILocalAPIRequest,
    ILocalAPIResponse
} from '@airport/aviation-communication';
import {
    IContext,
} from '@airport/direction-indicator';
import {
    IDbApplicationUtils,
    INTERNAL_DOMAIN
} from '@airport/ground-control';
import {
    IApiIMI,
    IConnectionInitializedIMI,
    IGetLatestApplicationVersionByApplication_NameIMI,
    IInitConnectionIMI,
    IIsolateMessage,
    IIsolateMessageOut,
    IPortableQueryIMI,
    IReadQueryIMI,
    ISaveIMI,
    ISaveToDestinationIMI,
    IsolateMessageType,
    JsonApplicationWithLastIds
} from '@airport/apron';
import {
    IApiCallContext,
    IDatabaseManager,
    IQueryOperationContext,
    ITerminalStore,
    ITransactionalServer,
    ITransactionContext,
    ITransactionCredentials,
    ITransactionManager
} from '@airport/terminal-map';
import { IInternalRecordManager } from '../data/InternalRecordManager';
import { IEntityContext } from '@airport/tarmaq-entity';
@Injected()
export abstract class TransactionalReceiver {


    @Inject()
    databaseManager: IDatabaseManager

    @Inject()
    dbApplicationUtils: IDbApplicationUtils

    @Inject()
    internalRecordManager: IInternalRecordManager

    @Inject()
    terminalStore: ITerminalStore

    @Inject()
    transactionManager: ITransactionManager

    @Inject()
    transactionalServer: ITransactionalServer

    async processMessage<ReturnType extends IIsolateMessageOut<any>>(
        message: IIsolateMessage & IApiIMI
    ): Promise<ReturnType> {
        let result: any
        let errorMessage
        try {
            if (message.domain === INTERNAL_DOMAIN) {
                throw new Error(`Internal domain cannot be used in external calls`)
            }
            let credentials: ITransactionCredentials = {
                application: message.application,
                domain: message.domain,
                methodName: message.methodName,
                objectName: message.objectName,
                transactionId: message.transactionId
            }
            let context: IContext = {}
            context.startedAt = new Date()
            const {
                theErrorMessage,
                theResult
            } = await this.doProcessMessage(
                message,
                credentials,
                context
            )
            errorMessage = theErrorMessage
            result = theResult
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

    private async doProcessMessage<ReturnType extends IIsolateMessageOut<any>>(
        message: IIsolateMessage & IApiIMI
            | IPortableQueryIMI | ISaveIMI<any, any>,
        credentials: ITransactionCredentials,
        context: IContext
    ): Promise<{
        theErrorMessage: string
        theResult: ReturnType
    }> {
        let theErrorMessage: string = null
        let theResult: any = null
        switch (message.type) {
            case IsolateMessageType.APP_INITIALIZING:
                let initConnectionMessage: IInitConnectionIMI = message as any
                const application: JsonApplicationWithLastIds = initConnectionMessage.jsonApplication
                const fullApplication_Name = this.dbApplicationUtils.
                    getFullApplication_Name(application)
                const messageFullApplication_Name = this.dbApplicationUtils.
                    getFullApplication_NameFromDomainAndName(message.domain, message.application)
                if (fullApplication_Name !== messageFullApplication_Name) {
                    theResult = null
                    break
                }

                if (this.terminalStore.getReceiver().initializingApps
                    .has(fullApplication_Name)) {
                    return {
                        theErrorMessage,
                        theResult
                    }
                }
                this.terminalStore.getReceiver().initializingApps
                    .add(fullApplication_Name)

                // FIXME: initalize ahead of time, at Isolate Loading
                await this.databaseManager.initFeatureApplications({}, [application])

                await this.internalRecordManager.ensureApplicationRecords(
                    application, {})

                theResult = application.lastIds
                break
            case IsolateMessageType.APP_INITIALIZED:
                const initializedApps = this.terminalStore.getReceiver().initializedApps
                initializedApps.add((message as any as IConnectionInitializedIMI).fullApplication_Name)
                return {
                    theErrorMessage,
                    theResult
                }
            case IsolateMessageType.GET_LATEST_APPLICATION_VERSION_BY_APPLICATION_NAME: {
                theResult = this.terminalStore.getLatestApplicationVersionMapByFullApplication_Name()
                    .get((message as any as IGetLatestApplicationVersionByApplication_NameIMI).fullApplication_Name)
                break
            }
            case IsolateMessageType.RETRIEVE_DOMAIN: {
                theResult = this.terminalStore.getDomainMapByName()
                    .get(message.domain)
                break
            }
            case IsolateMessageType.ADD_REPOSITORY:
                // const addRepositoryMessage: IAddRepositoryIMI = <IAddRepositoryIMI>message
                theResult = await this.transactionalServer.addRepository(
                    // addRepositoryMessage.url,
                    // addRepositoryMessage.platform,
                    // addRepositoryMessage.platformConfig,
                    // addRepositoryMessage.distributionStrategy,
                    credentials,
                    context
                );
                break
            case IsolateMessageType.DELETE_WHERE:
                const deleteWhereMessage: IPortableQueryIMI = <IPortableQueryIMI>message
                theResult = await this.transactionalServer.deleteWhere(
                    deleteWhereMessage.portableQuery,
                    credentials,
                    context
                )
                break
            case IsolateMessageType.FIND:
                const findMessage: IReadQueryIMI = <IReadQueryIMI>message;
                theResult = await this.transactionalServer.find(
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
                theResult = await this.transactionalServer.findOne(
                    findOneMessage.portableQuery,
                    credentials,
                    {
                        ...context as any,
                        repository: findOneMessage.repository,
                    } as IQueryOperationContext
                )
                break
            case IsolateMessageType.INSERT_VALUES:
                const insertValuesMessage: IPortableQueryIMI = <IPortableQueryIMI>message
                theResult = await this.transactionalServer.insertValues(
                    insertValuesMessage.portableQuery,
                    credentials,
                    context
                )
                break
            case IsolateMessageType.INSERT_VALUES_GET_IDS:
                const insertValuesGetIdsMessage: IPortableQueryIMI = <IPortableQueryIMI>message
                theResult = await this.transactionalServer.insertValuesGetLocalIds(
                    insertValuesGetIdsMessage.portableQuery,
                    credentials,
                    context
                )
                break
            case IsolateMessageType.SAVE:
            case IsolateMessageType.SAVE_TO_DESTINATION: {
                const saveMessage: ISaveIMI<any, any> = <ISaveIMI<any, any>>message
                if (!saveMessage.dbEntity) {
                    theErrorMessage = `DbEntity id was not passed in`
                    break
                }
                const dbEntityId = saveMessage.dbEntity._localId
                const dbEntity = this.terminalStore.getAllEntities()[dbEntityId]
                if (!dbEntity) {
                    theErrorMessage = `Could not find DbEntity with Id ${dbEntityId}`
                    break
                }
                (context as IEntityContext).dbEntity = dbEntity as any
                if (message.type === IsolateMessageType.SAVE) {
                    theResult = await this.transactionalServer.save(
                        saveMessage.entity,
                        credentials,
                        context as IEntityContext
                    )
                } else {
                    const saveToDestinationMessage: ISaveToDestinationIMI<any, any>
                        = <ISaveToDestinationIMI<any, any>>message
                    theResult = await this.transactionalServer.saveToDestination(
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
                theResult = await this.transactionalServer.search(
                    searchMessage.portableQuery,
                    credentials,
                    {
                        ...context as any,
                        repository: searchMessage.repository,
                    } as IQueryOperationContext
                )
                break
            case IsolateMessageType.SEARCH_ONE:
                const searchOneMessage: IReadQueryIMI = <IReadQueryIMI>message;
                theResult = await this.transactionalServer.search(
                    searchOneMessage.portableQuery,
                    credentials,
                    {
                        ...context as any,
                        repository: searchOneMessage.repository,
                    } as IQueryOperationContext
                )
                break
            case IsolateMessageType.UPDATE_VALUES:
                const updateValuesMessage: IPortableQueryIMI = <IPortableQueryIMI>message
                theResult = await this.transactionalServer.updateValues(
                    updateValuesMessage.portableQuery,
                    credentials,
                    context
                )
                break
            default:
                // Unexpected IsolateMessageInType
                return {
                    theErrorMessage,
                    theResult
                }
        }
        return {
            theErrorMessage,
            theResult,
        }
    }

    protected abstract nativeStartApiCall(
        message: ILocalAPIRequest<'FromClientRedirected'>,
        context: IApiCallContext
    ): Promise<boolean>

    protected abstract nativeHandleApiCall(
        message: ILocalAPIRequest<'FromClientRedirected'>,
        context: IApiCallContext
    ): Promise<ILocalAPIResponse>

    protected async startApiCall(
        message: ILocalAPIRequest<'FromClientRedirected'>,
        context: IApiCallContext & ITransactionContext,
        nativeHandleCallback: () => void
    ): Promise<boolean> {
        const transactionCredentials: ITransactionCredentials = {
            application: message.application,
            domain: message.domain,
            methodName: message.methodName,
            objectName: message.objectName,
            transactionId: message.transactionId
        }

        if (!await this.transactionalServer.startTransaction(transactionCredentials, context)) {
            return false
        }

        const initiator = context.transaction.initiator
        initiator.application = message.application
        initiator.domain = message.domain
        initiator.methodName = message.methodName
        initiator.objectName = message.objectName

        message.transactionId = context.transaction.id

        try {
            await nativeHandleCallback()
        } catch (e) {
            context.errorMessage = e.message
            this.transactionalServer.rollback(transactionCredentials, context)
            return false
        }

        return true
    }

    protected async endApiCall(
        credentials: ITransactionCredentials,
        errorMessage: string,
        context: IApiCallContext
    ): Promise<boolean> {
        if (errorMessage) {
            return await this.transactionalServer.rollback(credentials, context)
        } else {
            return await this.transactionalServer.commit(credentials, context)
        }
    }

}
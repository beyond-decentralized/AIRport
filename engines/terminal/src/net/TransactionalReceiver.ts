import { ILastIds, JsonApplicationWithLastIds } from '@airport/air-traffic-control';
import { DbApplicationDao } from '@airport/airspace/dist/app/bundle';
import { Message_Direction, Message_Leg, Message_Type, IApiCallRequestMessage, IApiCallResponseMessage } from '@airport/aviation-communication';
import {
    IContext,
    Inject,
    Injected
} from '@airport/direction-indicator'
import {
    DbApplicationVersion,
    DbDomain,
    IActor,
    IAppTrackerUtils,
    IDbApplicationUtils,
    ITerminal
} from '@airport/ground-control';
import { ActorDao } from '@airport/holding-pattern/dist/app/bundle';
import { IEntityContext } from '@airport/tarmaq-entity';
import { v4 as guidv4 } from "uuid";
import {
    IApiCallContext,
    IConnectionInitializedMessage,
    ICredentials,
    IDatabaseManager,
    IGetLatestApplicationVersionByDbApplication_NameMessage,
    IInitializeConnectionMessage,
    ILocalAPIServer,
    IPortableQueryMessage,
    IQueryOperationContext,
    IReadQueryMessage,
    IRetrieveDomainMessage,
    ISaveMessage,
    ITerminalSessionManager,
    ITerminalStore,
    ITransactionalServer,
    ITransactionContext,
    IApiCredentials
} from '@airport/terminal-map';
import { IInternalRecordManager } from '../data/InternalRecordManager';

@Injected()
export abstract class TransactionalReceiver {

    @Inject()
    actorDao: ActorDao

    @Inject()
    dbApplicationDao: DbApplicationDao

    @Inject()
    appTrackerUtils: IAppTrackerUtils

    @Inject()
    databaseManager: IDatabaseManager

    @Inject()
    dbApplicationUtils: IDbApplicationUtils

    @Inject()
    internalRecordManager: IInternalRecordManager

    @Inject()
    localApiServer: ILocalAPIServer

    @Inject()
    terminalSessionManager: ITerminalSessionManager

    @Inject()
    terminalStore: ITerminalStore

    @Inject()
    transactionalServer: ITransactionalServer

    WITH_ID: {
        _localId: number
    } = {} as any

    async processFromClientMessage(
        message: IPortableQueryMessage
        | IReadQueryMessage
        | ISaveMessage<any>
    ): Promise<IApiCallResponseMessage> {
        let result: any
        let errorMessage
        try {
            const isInternalDomain = await this.appTrackerUtils
                .isInternalDomain(message.serverDomain)
            if (isInternalDomain) {
                throw new Error(`Internal domains cannot be used in external calls`)
            }
            let credentials: ICredentials = {
                application: message.clientApplication,
                domain: message.clientDomain,
                transactionId: message.transactionId
            }
            let context: IContext = {}
            context.startedAt = new Date()
            context.credentials = credentials
            const {
                theErrorMessage,
                theResult
            } = await this.doProcessFromClientMessage(
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
        const messageCopy = {
            ...message,
            direction: Message_Direction.TO_CLIENT,
            errorMessage,
            messageLeg: Message_Leg.FROM_HUB,
            returnedValue: result
        } as any

        return messageCopy
    }

    async processInternalMessage(
        message: IGetLatestApplicationVersionByDbApplication_NameMessage
            | IInitializeConnectionMessage
            | IRetrieveDomainMessage
    ): Promise<{
        theErrorMessage: string
        theResult: DbApplicationVersion | DbDomain | ILastIds | null
    }> {
        let theErrorMessage: string = null
        let theResult: any = null
        switch (message.type) {
            case Message_Type.APP_INITIALIZING:
                const application: JsonApplicationWithLastIds =
                    (message as IInitializeConnectionMessage).jsonApplication
                const fullDbApplication_Name = this.dbApplicationUtils.
                    getDbApplication_FullName(application)
                const messageDbApplication_FullName = this.dbApplicationUtils.
                    getDbApplication_FullNameFromDomainAndName(
                        message.clientDomain, message.clientApplication)
                if (fullDbApplication_Name !== messageDbApplication_FullName) {
                    theResult = null
                    break
                }

                if (this.terminalStore.getReceiver().initializingApps
                    .has(fullDbApplication_Name)) {
                    return {
                        theErrorMessage,
                        theResult
                    }
                }
                this.terminalStore.getReceiver().initializingApps
                    .add(fullDbApplication_Name)

                const context: IContext = {}
                context.startedAt = new Date()
                await this.databaseManager.initFeatureApplications(context, [application])

                await this.internalRecordManager.ensureApplicationRecords(
                    application, {})

                theResult = application.lastIds
                break
            case Message_Type.APP_INITIALIZED:
                const initializedApps = this.terminalStore.getReceiver().initializedApps
                initializedApps.add((message as IConnectionInitializedMessage).fullDbApplication_Name)
                // console.log(`--==<<(( INITIALIZED: ${(message as any as IConnectionInitializedIMI).fullDbApplication_Name}))>>==--`)
                return {
                    theErrorMessage,
                    theResult
                }
            case Message_Type.GET_LATEST_APPLICATION_VERSION_BY_APPLICATION_NAME: {
                theResult = this.terminalStore.getLatestApplicationVersionMapByDbApplication_FullName()
                    .get((message as IGetLatestApplicationVersionByDbApplication_NameMessage)
                        .fullDbApplication_Name)
                break
            }
            case Message_Type.RETRIEVE_DOMAIN: {
                theResult = this.terminalStore.getDomainMapByName()
                    .get(message.clientDomain)
                break
            }
            default: {
                return {
                    theErrorMessage: `Unexpected INTERNAL Message_Type: '${message.type}'`,
                    theResult
                }
            }
        }

        return {
            theErrorMessage,
            theResult,
        }
    }

    private async doProcessFromClientMessage(
        message: IPortableQueryMessage
            | IReadQueryMessage
            | ISaveMessage<any>,
        credentials: ICredentials,
        context: IContext
    ): Promise<{
        theErrorMessage: string
        theResult: IApiCallResponseMessage | ISaveMessage<any>
    }> {
        let theErrorMessage: string = null
        let theResult: any = null
        switch (message.type) {
            case Message_Type.DELETE_WHERE:
                theResult = await this.transactionalServer.deleteWhere(
                    (message as IPortableQueryMessage).portableQuery,
                    credentials,
                    context
                )
                break
            case Message_Type.FIND:
                theResult = await this.transactionalServer.find(
                    (message as IReadQueryMessage).portableQuery,
                    credentials,
                    {
                        ...context as any,
                        repository: (message as IReadQueryMessage).repository
                    } as IQueryOperationContext
                )
                break
            case Message_Type.FIND_ONE:
                theResult = await this.transactionalServer.findOne(
                    (message as IReadQueryMessage).portableQuery,
                    credentials,
                    {
                        ...context as any,
                        repository: (message as IReadQueryMessage).repository,
                    } as IQueryOperationContext
                )
                break
            case Message_Type.INSERT_VALUES:
                theResult = await this.transactionalServer.insertValues(
                    (message as IPortableQueryMessage).portableQuery,
                    credentials,
                    context
                )
                break
            case Message_Type.INSERT_VALUES_GET_IDS:
                theResult = await this.transactionalServer.insertValuesGetLocalIds(
                    (message as IPortableQueryMessage).portableQuery,
                    credentials,
                    context
                )
                break
            case Message_Type.SAVE: {
                if (!(message as ISaveMessage<any>).dbEntity) {
                    theErrorMessage = `DbEntity id was not passed in`
                    break
                }
                const dbEntityId = (message as ISaveMessage<any>).dbEntity._localId
                const dbEntity = this.terminalStore.getAllEntities()[dbEntityId]
                if (!dbEntity) {
                    theErrorMessage = `Could not find DbEntity with Id ${dbEntityId}`
                    break
                }
                (context as IEntityContext).dbEntity = dbEntity as any
                theResult = await this.transactionalServer.save(
                    (message as ISaveMessage<any>).entity,
                    credentials,
                    context as IEntityContext
                )
                break
            }
            case Message_Type.SEARCH_ONE_SUBSCRIBE:
                theResult = await this.transactionalServer.searchOne(
                    (message as IReadQueryMessage).portableQuery,
                    credentials,
                    {
                        ...context as any,
                        repository: (message as IReadQueryMessage).repository,
                    } as IQueryOperationContext
                )
                break
            case Message_Type.SEARCH_SUBSCRIBE:
                theResult = await this.transactionalServer.search(
                    (message as IReadQueryMessage).portableQuery,
                    credentials,
                    {
                        ...context as any,
                        repository: (message as IReadQueryMessage).repository,
                    } as IQueryOperationContext
                )
                break
            case Message_Type.UPDATE_VALUES:
                theResult = await this.transactionalServer.updateValues(
                    (message as IPortableQueryMessage).portableQuery,
                    credentials,
                    context
                )
                break
            default:
                return {
                    theErrorMessage: `Unexpected FROM_CLIENT Message_Type: '${message.type}'`,
                    theResult
                }
        }

        return {
            theErrorMessage,
            theResult,
        }
    }

    protected abstract nativeStartApiCall(
        message: IApiCallRequestMessage,
        context: IApiCallContext
    ): Promise<{
        isFramework?: boolean
        isStarted: boolean,
    }>

    protected abstract nativeHandleApiCall(
        message: IApiCallRequestMessage,
        context: IApiCallContext
    ): Promise<IApiCallResponseMessage>

    protected async startApiCall(
        message: IApiCallRequestMessage,
        context: IApiCallContext & ITransactionContext,
        nativeHandleCallback: () => void
    ): Promise<{
        isFramework?: boolean
        isStarted: boolean,
    }> {
        const transactionCredentials: IApiCredentials = {
            application: message.serverApplication,
            domain: message.serverDomain,
            methodName: message.methodName,
            objectName: message.objectName,
            transactionId: message.transactionId
        }
        context.credentials = transactionCredentials

        if (!context.isObservableApiCall) {
            if (!await this.transactionalServer
                .startTransaction(transactionCredentials, context)) {
                return {
                    isStarted: false
                }
            }
            const initiator = context.transaction.initiator
            initiator.application = message.serverApplication
            initiator.domain = message.serverDomain
            initiator.methodName = message.methodName
            initiator.objectName = message.objectName
        }

        let actor: IActor = await this.getApiCallActor(message, context)
        let isFramework = true
        try {

            const isInternalDomain = await this.appTrackerUtils
                .isInternalDomain(message.serverDomain)
            if (!isInternalDomain) {
                isFramework = false
                await this.doNativeHandleCallback(
                    message, actor, context, nativeHandleCallback)
            }
        } catch (e) {
            context.errorMessage = e.message

            if (!context.isObservableApiCall) {
                this.transactionalServer.rollback(transactionCredentials, context)
            }

            return {
                isStarted: false
            }
        }

        return {
            isFramework,
            isStarted: true
        }
    }

    private async doNativeHandleCallback(
        message: IApiCallRequestMessage<IActor>,
        actor: IActor,
        context: IApiCallContext & ITransactionContext,
        nativeHandleCallback: () => void
    ): Promise<void> {
        if (!context.isObservableApiCall) {
            message.transactionId = context.transaction.id
        }

        const terminal: ITerminal = {
            ...this.WITH_ID,
            GUID: actor.terminal.GUID
        } as any

        message.actor = {
            ...this.WITH_ID,
            _localId: actor._localId,
            application: actor.application,
            GUID: actor.GUID,
            terminal,
            userAccount: actor.userAccount
        }

        await nativeHandleCallback()
    }

    async getApiCallActor(
        message: IApiCallRequestMessage,
        context: IApiCallContext & ITransactionContext,
    ): Promise<IActor> {
        const userSession = await this.terminalSessionManager.getUserSession()
        let actor: IActor

        try {
            const isInternalDomain = await this.appTrackerUtils
                .isInternalDomain(message.serverDomain)
            if (isInternalDomain
                && !context.isObservableApiCall
                && context.transaction.parentTransaction) {
                actor = context.transaction.parentTransaction.actor

                return actor
            }
            const terminal = this.terminalStore.getTerminal()
            actor = await this.actorDao.findOneByDomainAndDbApplication_Names_AccountPublicSigningKey_TerminalGUID(
                message.serverDomain,
                message.serverApplication,
                userSession.userAccount.accountPublicSigningKey,
                terminal.GUID,
                context
            )
            if (actor) {
                return actor
            }

            const application = await this.dbApplicationDao.findOneByDomain_NameAndDbApplication_Name(
                message.serverDomain, message.serverApplication, context)
            actor = {
                _localId: null,
                application,
                GUID: guidv4(),
                terminal: terminal as any,
                userAccount: userSession.userAccount
            }
            await this.actorDao.save(actor, context)

            return actor
        } finally {
            context.actor = actor
            if (!context.isObservableApiCall) {
                context.transaction.actor = actor
                userSession.currentTransaction = context.transaction
            }
        }
    }

    protected async endApiCall(
        credentials: IApiCredentials,
        errorMessage: string,
        context: IApiCallContext
    ): Promise<boolean> {
        if (context.isObservableApiCall) {
            return
        }
        try {
            if (errorMessage) {
                return await this.transactionalServer.rollback(credentials, context)
            } else {
                return await this.transactionalServer.commit(credentials, context)
            }
        } finally {
            const userSession = await this.terminalSessionManager.getUserSession()
            userSession.currentTransaction = context.transaction
        }
    }

}
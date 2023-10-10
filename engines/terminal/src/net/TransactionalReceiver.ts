import { ILastIds, JsonApplicationWithLastIds } from '@airport/air-traffic-control';
import { IDdlApplicationDao } from '@airport/airspace/dist/app/bundle';
import { Message_Leg, IApiCallRequestMessage, IApiCallResponseMessage, INTERNAL_Message_Type, CRUD_Message_Type, ISubscriptionMessage, SUBSCRIPTION_Message_Type, IResponseMessage, IInternalMessage, IUrlChangeMessage, Message_Direction } from '@airport/aviation-communication';
import {
    IContext,
    Inject,
    Injected
} from '@airport/direction-indicator'
import {
    IApplicationVersion,
    IDomain,
    IActor,
    IAppTrackerUtils,
    IApplicationNameUtils,
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
    IGetLatestApplicationVersionByApplication_NameMessage,
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
    IApiCredentials,
    ISubscriptionReadQueryMessage
} from '@airport/terminal-map';
import { IInternalRecordManager } from '../data/InternalRecordManager';
import { Observable } from 'rxjs';

@Injected()
export abstract class TransactionalReceiver {

    @Inject()
    actorDao: ActorDao

    @Inject()
    ddlApplicationDao: IDdlApplicationDao

    @Inject()
    appTrackerUtils: IAppTrackerUtils

    @Inject()
    databaseManager: IDatabaseManager

    @Inject()
    applicationNameUtils: IApplicationNameUtils

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

    async processCRUDMessage(
        message: IPortableQueryMessage
            | IReadQueryMessage
            | ISaveMessage<any>
    ): Promise<IResponseMessage> {
        let result: any
        let errorMessage
        try {
            let context = await this.getProcessingContext(message)
            const {
                theErrorMessage,
                theResult
            } = await this.doProcessCRUDRequestMessage(
                message,
                context.credentials,
                context
            )
            errorMessage = theErrorMessage
            result = theResult
        } catch (error) {
            console.error(error)
            result = null
            errorMessage = error.message
        }

        return this.getMessageResponseCopy(message, result, errorMessage)
    }

    async processSubscriptionMessage(
        message: ISubscriptionMessage
    ): Promise<IResponseMessage<Observable<any>>> {
        let result: any
        let errorMessage
        try {
            let context = await this.getProcessingContext(message)
            const {
                theErrorMessage,
                theResult
            } = await this.doProcessSubscriptionRequestMessage(
                message,
                context.credentials,
                context
            )
            errorMessage = theErrorMessage
            result = theResult
        } catch (error) {
            console.error(error)
            result = null
            errorMessage = error.message
        }

        return this.getMessageResponseCopy(message, result, errorMessage)
    }

    async processInternalMessage(
        message: IGetLatestApplicationVersionByApplication_NameMessage
            | IInitializeConnectionMessage
            | IRetrieveDomainMessage
            | IUrlChangeMessage
            | IInternalMessage
    ): Promise<{
        theErrorMessage: string
        theResult: IApplicationVersion | IDomain | ILastIds | null
    }> {
        let theErrorMessage: string = undefined
        let theResult: any = null
        switch (message.type) {
            case INTERNAL_Message_Type.APP_INITIALIZING:
                const application: JsonApplicationWithLastIds =
                    (message as IInitializeConnectionMessage).jsonApplication
                const fullApplication_Name = this.applicationNameUtils.
                    getApplication_FullName(application)
                const messageApplication_FullName = this.applicationNameUtils.
                    getApplication_FullNameFromDomainAndName(
                        message.origin.domain, message.origin.app)
                if (fullApplication_Name !== messageApplication_FullName) {
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

                const context: IContext = {}
                context.startedAt = new Date()
                await this.databaseManager.initFeatureApplications(context, [application])

                await this.internalRecordManager.ensureApplicationRecords(
                    application, {})

                theResult = application.lastIds
                break
            case INTERNAL_Message_Type.APP_INITIALIZED:
                const initializedApps = this.terminalStore.getReceiver().initializedApps
                initializedApps.add((message as IConnectionInitializedMessage).fullApplication_Name)
                // console.log(`--==<<(( INITIALIZED: ${(message as any as IConnectionInitializedIMI).fullApplication_Name}))>>==--`)
                return {
                    theErrorMessage,
                    theResult
                }
            case INTERNAL_Message_Type.GET_LATEST_APPLICATION_VERSION_BY_APPLICATION_NAME: {
                theResult = this.terminalStore.getLatestApplicationVersionMapByApplication_FullName()
                    .get((message as IGetLatestApplicationVersionByApplication_NameMessage)
                        .fullApplication_Name)
                break
            }
            case INTERNAL_Message_Type.RETRIEVE_DOMAIN: {
                theResult = this.terminalStore.getDomainMapByName()
                    .get(message.origin.domain)
                break
            }
            case INTERNAL_Message_Type.UI_URL_CHANGED: {
                let state
                this.terminalStore.state.subscribe(theState => {
                    state = theState
                }).unsubscribe()
                this.terminalStore.state.next({
                    ...state,
                    ui: {
                        ...state.ui,
                        currentUrl: (message as IUrlChangeMessage).newUrl
                    }
                })
                theResult = undefined
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

    private async doProcessSubscriptionRequestMessage(
        message: ISubscriptionMessage,
        credentials: ICredentials,
        context: IContext
    ): Promise<{
        theErrorMessage: string
        theResult: Observable<any>
    }> {
        let theErrorMessage: string = null
        let theResult: any = null
        credentials.subscriptionId = message.subscriptionId
        switch (message.type) {
            case SUBSCRIPTION_Message_Type.SEARCH_ONE_SUBSCRIBE:
                theResult = this.transactionalServer.searchOne(
                    (message as ISubscriptionReadQueryMessage).portableQuery,
                    credentials,
                    {
                        ...context as any,
                        repository: (message as ISubscriptionReadQueryMessage).repository,
                    } as IQueryOperationContext
                )
                break
            case SUBSCRIPTION_Message_Type.SEARCH_SUBSCRIBE:
                theResult = this.transactionalServer.search(
                    (message as ISubscriptionReadQueryMessage).portableQuery,
                    credentials,
                    {
                        ...context as any,
                        repository: (message as ISubscriptionReadQueryMessage).repository,
                    } as IQueryOperationContext
                )
                break
            default:
                return {
                    theErrorMessage: `Unexpected SUBSCRIPTION_Message_Type: '${message.type}'`,
                    theResult
                }
        }

        return {
            theErrorMessage,
            theResult,
        }
    }

    private async doProcessCRUDRequestMessage(
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
        credentials.transactionId = message.transactionId
        switch (message.type) {
            case CRUD_Message_Type.DELETE_WHERE:
                theResult = await this.transactionalServer.deleteWhere(
                    (message as IPortableQueryMessage).portableQuery,
                    credentials,
                    context
                )
                break
            case CRUD_Message_Type.FIND:
                theResult = await this.transactionalServer.find(
                    (message as IReadQueryMessage).portableQuery,
                    credentials,
                    {
                        ...context as any,
                        repository: (message as IReadQueryMessage).repository
                    } as IQueryOperationContext
                )
                break
            case CRUD_Message_Type.FIND_ONE:
                theResult = await this.transactionalServer.findOne(
                    (message as IReadQueryMessage).portableQuery,
                    credentials,
                    {
                        ...context as any,
                        repository: (message as IReadQueryMessage).repository,
                    } as IQueryOperationContext
                )
                break
            case CRUD_Message_Type.INSERT_VALUES:
                theResult = await this.transactionalServer.insertValues(
                    (message as IPortableQueryMessage).portableQuery,
                    credentials,
                    context
                )
                break
            case CRUD_Message_Type.INSERT_VALUES_GET_IDS:
                theResult = await this.transactionalServer.insertValuesGetLocalIds(
                    (message as IPortableQueryMessage).portableQuery,
                    credentials,
                    context
                )
                break
            case CRUD_Message_Type.SAVE: {
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
            case CRUD_Message_Type.UPDATE_VALUES:
                theResult = await this.transactionalServer.updateValues(
                    (message as IPortableQueryMessage).portableQuery,
                    credentials,
                    context
                )
                break
            default:
                return {
                    theErrorMessage: `Unexpected CRUD_Message_Type: '${message.type}'`,
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
        const fullApplication_Name = this.applicationNameUtils.
            getApplication_FullNameFromDomainAndName(
                message.destination.domain, message.destination.app)
        const application = this.terminalStore.getApplicationMapByFullName().get(fullApplication_Name)
        if (!application) {
            console.error(`Application not found
${fullApplication_Name}
`)
            return {
                isStarted: false
            }
        }

        const apiClass = application.currentVersion[0].applicationVersion
            .apiClassMapByName[message.objectName]
        if (!apiClass) {

            console.error(`Could not find
            API Class:
${message.objectName}
            Application:
${fullApplication_Name}
`)
            return {
                isStarted: false
            }
        }

        const apiOperation = apiClass.operationMapByName[message.methodName]

        if (!apiOperation) {

            console.error(`Could not find
            @Api():
${message.objectName}.${message.methodName}
            Application:
${fullApplication_Name}
`)
            return {
                isStarted: false
            }
        }

        context.isObservableApiCall = !apiOperation.isAsync

        const transactionCredentials: IApiCredentials = {
            application: message.destination.app,
            domain: message.destination.domain,
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
            initiator.application = message.destination.app
            initiator.domain = message.destination.domain
            initiator.methodName = message.methodName
            initiator.objectName = message.objectName
        }

        let actor: IActor = await this.getApiCallActor(message, context)
        let isFramework = true
        try {

            const isInternalDomain = await this.appTrackerUtils
                .isInternalDomain(message.destination.domain)
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
                .isInternalDomain(message.destination.domain)
            if (isInternalDomain
                && !context.isObservableApiCall
                && context.transaction.parentTransaction) {
                actor = context.transaction.parentTransaction.actor

                return actor
            }
            const terminal = this.terminalStore.getTerminal()
            actor = await this.actorDao.findOneByDomainAndApplication_Names_AccountPublicSigningKey_TerminalGUID(
                message.destination.domain,
                message.destination.app,
                userSession.userAccount.accountPublicSigningKey,
                terminal.GUID,
                context
            )
            if (actor) {
                return actor
            }

            const application = await this.ddlApplicationDao.findOneByDomain_NameAndApplication_Name(
                message.destination.domain, message.destination.app, context)
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

    private async getProcessingContext(
        message: IPortableQueryMessage
            | IReadQueryMessage
            | ISaveMessage<any>
            | ISubscriptionMessage
    ): Promise<IContext> {
        if (message.destination) {
            const isInternalDomain = await this.appTrackerUtils
                .isInternalDomain(message.destination.domain)
            if (isInternalDomain) {
                throw new Error(`Internal domains cannot be used in external calls`)
            }
        }
        let credentials: ICredentials = {
            application: message.origin.app,
            domain: message.origin.domain
        }
        let context: IContext = {}
        context.startedAt = new Date()
        context.credentials = credentials

        return context
    }

    private getMessageResponseCopy(
        message: IPortableQueryMessage
            | IReadQueryMessage
            | ISaveMessage<any>
            | ISubscriptionMessage,
        result: any,
        errorMessage: string,
    ): IResponseMessage {
        return {
            ...message,
            destination: {
                app: message.origin.app,
                domain: message.origin.domain,
                protocol: message.origin.protocol,
                type: message.origin.type
            },
            direction: Message_Direction.RESPONSE,
            errorMessage,
            messageLeg: Message_Leg.FROM_HUB,
            // origin: {
            //     app: message.destination.app,
            //     domain: message.destination.domain,
            //     protocol: message.destination.protocol,
            //     type: message.destination.type
            // },
            returnedValue: result,
        }
    }

}
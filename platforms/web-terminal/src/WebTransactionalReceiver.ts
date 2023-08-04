import { JsonApplicationVersionWithApi } from '@airport/air-traffic-control'
import { Message_Direction, Message_Leg, Message_Type, IAirMessageUtils, IApiCallRequestMessage, IApiCallResponseMessage, IMessage } from '@airport/aviation-communication'
import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator'
import { DbApplication, DbApplication_FullName, IDbApplicationUtils } from '@airport/ground-control'
import {
	ITransactionalReceiver,
	IApiCallContext,
	ITransactionContext,
	ITerminalStore,
	ILocalAPIServer,
	IWebReceiverState,
	IInitializeConnectionMessage,
	IApiCredentials,
	IGetLatestApplicationVersionByDbApplication_NameMessage,
	IRetrieveDomainMessage,
	IPortableQueryMessage,
	IReadQueryMessage,
	ISaveMessage
} from '@airport/terminal-map'
import {
	TransactionalReceiver
} from '@airport/terminal'
import { IWebApplicationInitializer } from './WebApplicationInitializer'
import { IWebMessageGateway } from './WebMessageGateway'
import { Observable } from 'rxjs'

interface IToClientMessageOptions {
	endApiCall: boolean
	replyToClient: boolean
}

@Injected()
export class WebTransactionalReceiver
	extends TransactionalReceiver
	implements ITransactionalReceiver {

	@Inject()
	airMessageUtils: IAirMessageUtils

	@Inject()
	applicationInitializer: IWebApplicationInitializer

	@Inject()
	dbApplicationUtils: IDbApplicationUtils

	@Inject()
	localApiServer: ILocalAPIServer

	@Inject()
	terminalStore: ITerminalStore

	@Inject()
	webMessageGateway: IWebMessageGateway

	init() {
		const ownDomain = window.location.hostname
		const mainDomainFragments = ownDomain.split('.')
		if (mainDomainFragments[0] === 'www'
			|| mainDomainFragments[0].startsWith('random_')) {
			mainDomainFragments.splice(0, 1)
		}
		const domainPrefix = '.' + mainDomainFragments.join('.')
		// set domain to a random value so that an iframe cannot directly invoke logic in this domain
		if (document.domain !== 'localhost') {
			document.domain = 'random_' + Math.random() + '_' + Math.random() + domainPrefix
		}
		const webReciever = this.terminalStore.getWebReceiver()
		webReciever.domainPrefix = domainPrefix
		webReciever.mainDomainFragments = mainDomainFragments

		setTimeout(() => {
			if (globalThis.repositoryAutoload !== false) {
				setInterval(() => {
					this.pruneSubscriptions();
				}, 10000)
			}
		}, 2000)

	}

	private pruneSubscriptions(): void {
		const lastValidPingMillis = new Date().getTime() - 10000
		const webReciever = this.terminalStore.getWebReceiver()

		for (const [_application_FullName, isolateSubscriptionMap] of webReciever.subscriptionMap) {
			const staleSubscriptionIds = []
			for (const [subscriptionId, subscriptionRecord] of isolateSubscriptionMap) {
				if (subscriptionRecord.lastActive < lastValidPingMillis) {
					staleSubscriptionIds.push(subscriptionId)
				}
			}
			for (const staleSubscriptionId of staleSubscriptionIds) {
				isolateSubscriptionMap.get(staleSubscriptionId).subscription.unsubscribe()
				isolateSubscriptionMap.delete(staleSubscriptionId)
			}
		}
	}

	handleClientRequest(
		message: IApiCallRequestMessage
	): void {
		if (message.direction !== Message_Direction.FROM_CLIENT) {
			console.error(`Unexpected message direction '${message.direction}'`)
			return
		}

		if (this.webMessageGateway.needMessageSerialization()) {
			throw new Error("Deserialization is not yet implemented.")
			// FIXME: deserialize message
		}

		const webReciever = this.terminalStore.getWebReceiver()

		if (webReciever.onClientMessageCallback) {
			webReciever.onClientMessageCallback(message)
		}

		switch (message.type) {
			case Message_Type.IS_CONNECTION_READY:
				this.ensureConnectionIsReady(message).then()
				break
			default:
				const fromClientRedirectedMessage: IApiCallRequestMessage = {
					...message,
					messageLeg: Message_Leg.FROM_HUB
				}
				this.handleFromClientRequest(fromClientRedirectedMessage).then()
				break
		}
	}

	handleAppRequest(
		message: IApiCallRequestMessage
			| IApiCallResponseMessage
			| IGetLatestApplicationVersionByDbApplication_NameMessage
			| IInitializeConnectionMessage
			| IPortableQueryMessage
			| IReadQueryMessage
			| IRetrieveDomainMessage
			| ISaveMessage<any>,
		messageOrigin: string
	): void {
		const webReciever = this.terminalStore.getWebReceiver()

		if (webReciever.onClientMessageCallback) {
			webReciever.onClientMessageCallback(message)
		}

		switch (message.direction) {
			case Message_Direction.FROM_CLIENT:
				this.handleFromClientMessage(message as
					IApiCallRequestMessage
					| IPortableQueryMessage
					| IReadQueryMessage
					| ISaveMessage<any>,
					messageOrigin).then()
				break
			case Message_Direction.INTERNAL:
				this.handleInternalMessage(message as
					IGetLatestApplicationVersionByDbApplication_NameMessage
					| IInitializeConnectionMessage
					| IRetrieveDomainMessage,
					messageOrigin).then()
				break
			case Message_Direction.TO_CLIENT:
				this.handleToClientMessage(message as IApiCallResponseMessage,
					messageOrigin, webReciever).then()
				break
			default:
				break
		}
	}

	private async handleToClientMessage(
		message: IApiCallResponseMessage,
		messageOrigin: string,
		webReciever: IWebReceiverState
	): Promise<void> {
		const {
			endApiCall,
			replyToClient
		} = this.getToClientMessageOptions(message)

		const interAppApiCallRequest = webReciever.pendingInterAppApiCallMessageMap
			.get(message.id)
		const context: IApiCallContext = {
			isObservableApiCall: this.airMessageUtils.isObservableMessage(message)
		}
		const credentials: IApiCredentials = {
			application: message.serverApplication,
			domain: message.serverDomain,
			methodName: (message as IApiCallResponseMessage).methodName,
			objectName: (message as IApiCallResponseMessage).objectName,
			transactionId: message.transactionId
		}

		let success = true
		try {
			if (endApiCall) {
				await this.endApiCall(credentials, message.errorMessage, context)
			}
		} catch (e) {
			success = false
		}

		if (interAppApiCallRequest) {
			interAppApiCallRequest.resolve(message)
		} else if (replyToClient) {
			await this.replyToClient(
				message,
				success ? message.errorMessage : context.errorMessage,
				message.returnedValue,
				success,
				messageOrigin
			)
		}
	}

	private getToClientMessageOptions(
		message: IApiCallResponseMessage
			| IInitializeConnectionMessage
	): IToClientMessageOptions {
		let endApiCall = true
		let replyToClient = true
		switch (message.type) {
			case Message_Type.API_SUBSCRIBE: {
				endApiCall = true
				break
			}
			case Message_Type.API_SUBSCRIPTION_DATA: {
				endApiCall = false
				replyToClient = true
				break
			}
			case Message_Type.SUBSCRIPTION_PING: {
				endApiCall = false
				replyToClient = false
				break
			}
			case Message_Type.API_UNSUBSCRIBE: {
				endApiCall = false
				replyToClient = false
				break
			}
		}

		return {
			endApiCall,
			replyToClient
		}
	}

	private async replyToClient(
		message: IApiCallResponseMessage
			| IInitializeConnectionMessage,
		errorMessage,
		returnedValue,
		success,
		messageOrigin
	): Promise<void> {
		const toClientRedirectedMessage: IApiCallResponseMessage | IInitializeConnectionMessage = {
			...message,
			direction: Message_Direction.TO_CLIENT,
			messageLeg: Message_Leg.FROM_HUB,
			returnedValue
		}
		if (!success) {
			toClientRedirectedMessage.errorMessage = errorMessage
			toClientRedirectedMessage.returnedValue = null
		}
		if (messageOrigin) {
			if (!await this.messageIsFromValidApp(
				toClientRedirectedMessage, messageOrigin)) {
				return
			}
		}
		this.replyToClientRequest(toClientRedirectedMessage)
	}

	onMessage(callback: (
		message: any
	) => void) {
		const webReciever = this.terminalStore.getWebReceiver()
		webReciever.onClientMessageCallback = callback
	}

	protected async nativeStartApiCall(
		message: IApiCallRequestMessage,
		context: IApiCallContext & ITransactionContext
	): Promise<{
		isFramework?: boolean
		isStarted: boolean,
	}> {
		const messageCopy = {
			...message,
			messageLeg: Message_Leg.FROM_HUB
		}

		return await this.startApiCall(messageCopy, context, async () => {
			if (!context.isObservableApiCall) {
				messageCopy.transactionId = context.transaction.id
			}
			const application_FullName = this.getMessageServerApplication(
				message)

			this.webMessageGateway.sendMessageToApp(application_FullName, messageCopy)
		})
	}

	protected async nativeHandleApiCall(
		message: IApiCallRequestMessage,
		context: IApiCallContext & ITransactionContext
	): Promise<IApiCallResponseMessage> {
		const startDescriptor = await this.nativeStartApiCall(message, context);
		if (!startDescriptor.isStarted) {
			throw new Error(context.errorMessage)
		}

		let args, errorMessage, returnedValue, transactionId
		if (startDescriptor.isFramework) {
			const result = await this.callFrameworkApi(message, context)
			errorMessage = result.errorMessage
			returnedValue = result.returnedValue
			args = message.args
			transactionId = message.transactionId
		} else {
			const replyMessage: IApiCallResponseMessage = await new Promise((resolve) => {
				this.terminalStore.getWebReceiver().pendingInterAppApiCallMessageMap.set(message.id, {
					message: {
						...message,
						direction: Message_Direction.TO_CLIENT,
						messageLeg: Message_Leg.FROM_HUB,
						type: Message_Type.API_CALL
					},
					resolve
				})
			})

			args = replyMessage.args
			errorMessage = replyMessage.errorMessage
			returnedValue = replyMessage.returnedValue
			transactionId = replyMessage.transactionId
		}

		const response: IApiCallResponseMessage = {
			...message,
			direction: Message_Direction.TO_CLIENT,
			messageLeg: Message_Leg.FROM_HUB,
			args,
			errorMessage,
			returnedValue,
			transactionId
		}

		return response;
	}

	protected async nativeHandleObservableApiCall(
		message: IApiCallRequestMessage,
		context: IApiCallContext & ITransactionContext
	): Promise<boolean> {
		const startDescriptor = await this.nativeStartApiCall(message, context);
		if (!startDescriptor.isStarted) {
			throw new Error(context.errorMessage)
		}

		if (startDescriptor.isFramework) {
			await this.callFrameworkApi(message, context)
		}

		return startDescriptor.isFramework
	}

	private async callFrameworkApi(
		message: IApiCallRequestMessage,
		context: IApiCallContext & ITransactionContext,
	): Promise<{
		errorMessage,
		replyToClient,
		returnedValue
	}> {
		let internalResponse: {
			isAsync: boolean,
			result: any
		}
		let errorMessage
		const messageCopy = {
			...message,
			transactionId: context.isObservableApiCall ? null : context.transaction.id
		}
		const internalCredentials = this.terminalStore.getInternalConnector().internalCredentials
		const priorTransactionId = internalCredentials.transactionId

		let replyToClient = true

		try {
			if (!context.isObservableApiCall) {
				internalCredentials.transactionId = context.transaction.id
			}
			const fullDbApplication_Name = this.getMessageServerApplication(
				message)
			const application: DbApplication = this.terminalStore
				.getApplicationMapByFullName().get(fullDbApplication_Name)
			if (!application) {
				throw new Error(`Could not find AIRport Framework Application: ${fullDbApplication_Name}`)
			}
			internalResponse = await this.localApiServer.coreHandleRequest(messageCopy,
				(application.currentVersion[0].applicationVersion.jsonApplication //
					.versions[0] as JsonApplicationVersionWithApi).api, context)

			replyToClient = internalResponse.isAsync
		} catch (e) {
			errorMessage = e.message ? e.message : e
			console.error(e)
		} finally {
			try {
				await this.endApiCall({
					application: message.clientApplication,
					domain: message.clientDomain,
					methodName: message.methodName,
					objectName: message.objectName,
					transactionId: messageCopy.transactionId
				}, errorMessage, context);
			} catch (e) {
				errorMessage = e.message ? e.message : e
				console.error(e)
			} finally {
				if (!context.isObservableApiCall) {
					internalCredentials.transactionId = priorTransactionId
				}
			}
		}

		return {
			errorMessage,
			replyToClient,
			returnedValue: internalResponse ? internalResponse.result : null
		}
	}

	private async ensureConnectionIsReady(
		message: IApiCallRequestMessage
	): Promise<void> {
		const applicationIsInstalled = await this.applicationInitializer
			.ensureApplicationIsInstalled(message.serverDomain,
				message.serverApplication)

		if (applicationIsInstalled) {
			this.sendConnectionReadyMessage(message)
		}
	}

	private sendConnectionReadyMessage(
		message: IApiCallRequestMessage
	) {
		const connectionIsReadyMessage: IApiCallResponseMessage = {
			...message,
			args: message.args,
			direction: Message_Direction.TO_CLIENT,
			messageLeg: Message_Leg.FROM_HUB,
			errorMessage: null,
			returnedValue: null,
			transactionId: message.transactionId,
			type: Message_Type.CONNECTION_IS_READY
		};

		if (this.webMessageGateway.needMessageSerialization()) {
			// FIXME: serialize message
		}
		this.webMessageGateway.sendMessageToClient(connectionIsReadyMessage)
	}

	private async handleFromClientRequest(
		message: IApiCallRequestMessage,
	): Promise<void> {
		const webReciever = this.terminalStore.getWebReceiver()

		const application_FullName = this.getMessageServerApplication(
			message)

		if (!await this.applicationInitializer.isApplicationIsInstalled(
			message.serverDomain, application_FullName)) {
			this.relyToClientWithError(message, `Application is not installed`)
			return
		}

		const context: IApiCallContext = {
			isObservableApiCall: this.airMessageUtils.isObservableMessage(message)
		}
		const localApiRequest = message
		const startDescriptor = await this.nativeStartApiCall(localApiRequest, context);
		if (!startDescriptor.isStarted) {
			this.relyToClientWithError(message, context.errorMessage)
		} else if (startDescriptor.isFramework) {
			const result = await this.callFrameworkApi(localApiRequest, context)
			if (result.replyToClient) {
				await this.replyToClient(
					message,
					result.errorMessage,
					result.returnedValue,
					!result.errorMessage,
					null
				)
			}
		}
	}

	private relyToClientWithError(
		message: IApiCallRequestMessage,
		errorMessage: string
	) {
		const toClientRedirectedMessage: IApiCallResponseMessage = {
			...message,
			direction: Message_Direction.TO_CLIENT,
			messageLeg: Message_Leg.FROM_HUB,
			errorMessage,
			id: message.id,
			returnedValue: null
		}

		this.replyToClientRequest(toClientRedirectedMessage)
	}

	private replyToClientRequest(
		message: IApiCallResponseMessage
			| IInitializeConnectionMessage
	) {
		// Forward the request to the source client
		if (this.webMessageGateway.needMessageSerialization()) {
			// FIXME: serialize message
		}

		if (message.subscriptionId && message.clientApplication !== 'UserInterface') {
			const application_FullName = this.getMessageClientApplication(
				message)
			this.webMessageGateway.sendMessageToApp(
				application_FullName, message)
		} else {
			this.webMessageGateway.sendMessageToClient(message)
		}
	}

	private async messageIsFromValidApp(
		message: IMessage | IApiCallResponseMessage,
		messageOrigin: string
	): Promise<boolean> {
		const applicationDomain = messageOrigin.split('//')[1]
		const applicationDomainFragments = applicationDomain.split('.')

		// Allow local debugging
		if (applicationDomain.split(':')[0] === 'localhost') {
			return true
		}

		const webReciever = this.terminalStore.getWebReceiver()

		const fullDbApplication_Name = this.getMessageServerApplication(
			message)
		// Only accept requests from https protocol
		if (!messageOrigin.startsWith("https")
			// and from application domains that match the fullDbApplication_Name
			|| applicationDomain !== fullDbApplication_Name + webReciever.domainPrefix) {
			return false
		}
		// Only accept requests from '${applicationName}.${mainDomain_Name}'
		if (applicationDomainFragments.length !== webReciever.mainDomainFragments.length + 1) {
			return false
		}
		// Only accept requests from non-'www' domain (don't accept requests from self)
		if (applicationDomainFragments[0] === 'www') {
			return false
		}
		const applicationDomainFirstFragment = applicationDomainFragments[0]

		// check application domain-embedded signature and fullDbApplication_Name in message
		// and make sure they result in a match
		if (applicationDomainFirstFragment !== fullDbApplication_Name) {
			return false
		}

		return !!this.terminalStore.getApplicationInitializer()
			.applicationWindowMap.get(fullDbApplication_Name)
	}


	private async handleInternalMessage(
		message: IGetLatestApplicationVersionByDbApplication_NameMessage
			| IInitializeConnectionMessage
			| IRetrieveDomainMessage,
		messageOrigin: string
	): Promise<void> {
		if (!await this.messageIsFromValidApp(message, messageOrigin)) {
			return
		}

		const result = await this.processInternalMessage(message)

		this.webMessageGateway.sendMessageToApp(
			this.getMessageClientApplication(message), {
			...message,
			returnedValue: result.theResult as any
		})
	}

	private async handleFromClientMessage(
		message: IApiCallRequestMessage
			| IPortableQueryMessage
			| IReadQueryMessage
			| ISaveMessage<any>,
		messageOrigin: string
	): Promise<void> {
		if (!await this.messageIsFromValidApp(message, messageOrigin)) {
			return
		}

		const webReciever = this.terminalStore.getWebReceiver()

		const application_FullName = this
			.getMessageClientApplication(message)
		switch (message.type) {
			case Message_Type.SEARCH_UNSUBSCRIBE:
				let isolateSubscriptionMap = webReciever
					.subscriptionMap.get(application_FullName)
				if (!isolateSubscriptionMap) {
					return
				}
				let subscriptionRecord = isolateSubscriptionMap.get(message.subscriptionId)
				if (!subscriptionRecord) {
					return
				}
				subscriptionRecord.subscription.unsubscribe()
				isolateSubscriptionMap.delete(message.subscriptionId)
				return;
		}

		let response
		let isFrameworkObservableCall = false
		switch (message.type) {
			case Message_Type.API_CALL: {
				response = await this.nativeHandleApiCall(message as IApiCallRequestMessage, {
					isObservableApiCall: this.airMessageUtils.isObservableMessage(message),
					startedAt: new Date()
				})
				break
			}
			case Message_Type.API_SUBSCRIBE:
			case Message_Type.API_UNSUBSCRIBE: {
				const observableApiResult = await this.handleApiSubscribeOrUnsubscribe(message)
				isFrameworkObservableCall = observableApiResult.isFrameworkObservableCall
				response = observableApiResult.response
				break
			}
			case Message_Type.SUBSCRIPTION_PING: {
				let isolateSubscriptionMap = webReciever.subscriptionMap.get(application_FullName)
				if (!isolateSubscriptionMap) {
					break
				}
				const subscriptionRecord = isolateSubscriptionMap.get(message.subscriptionId)
				if (!subscriptionRecord) {
					break
				}
				subscriptionRecord.lastActive = new Date().getTime()
				break
			}
			default: {
				response = await this.processFromClientMessage(message as IPortableQueryMessage
					| IReadQueryMessage
					| ISaveMessage<any>)
				break
			}
		}

		if (!response) {
			return
		}

		this.handleApiCallOrSubscription(
			message,
			message as IApiCallRequestMessage,
			response,
			application_FullName,
			isFrameworkObservableCall,
			webReciever
		)

	}

	private async handleApiSubscribeOrUnsubscribe(
		message: IApiCallRequestMessage
			| IPortableQueryMessage
			| IReadQueryMessage
			| ISaveMessage<any>
	): Promise<{
		isFrameworkObservableCall: boolean,
		response: Observable<any>
	}> {
		let isFrameworkObservableCall = false
		let response = null

		const context: IContext = {
			isObservableApiCall: this.airMessageUtils.isObservableMessage(message),
			startedAt: new Date()
		}
		const startDescriptor = await this.nativeStartApiCall(message as IApiCallRequestMessage, context);
		if (!startDescriptor.isStarted) {
			console.error(context.errorMessage)
			return {
				isFrameworkObservableCall,
				response
			}
		}

		isFrameworkObservableCall = startDescriptor.isFramework
		if (isFrameworkObservableCall) {
			const apiCallResult = await this.callFrameworkApi(message as IApiCallRequestMessage, context)
	
			if (apiCallResult.errorMessage) {
				// TODO: send back error messages for (UN)SUBSCRIBE messages
				console.error(apiCallResult)
				return
			}
			response = apiCallResult
		} else {
			response = {
				...message,
				direction: Message_Direction.TO_CLIENT,
				messageLeg: Message_Leg.FROM_HUB
			}
		}

		return {
			isFrameworkObservableCall,
			response
		}
	}

	private handleApiCallOrSubscription(
		message: IApiCallRequestMessage
			| IPortableQueryMessage
			| IReadQueryMessage
			| ISaveMessage<any>,
		response: IApiCallResponseMessage,
		returnedValue: any,
		application_FullName: DbApplication_FullName,
		isFrameworkObservableCall: boolean,
		webReciever: IWebReceiverState
	): void {
		switch (message.type) {
			case Message_Type.API_SUBSCRIBE: {
				if (!isFrameworkObservableCall) {
					this.webMessageGateway.sendMessageToApp(
						application_FullName, response)
					break
				}
				this.subscribeToFrameworkObservable(message,
					Message_Type.API_SUBSCRIPTION_DATA,
					response, returnedValue, application_FullName,
					webReciever)
				break
			}
			case Message_Type.SEARCH_ONE_SUBSCRIBE: {
				this.subscribeToFrameworkObservable(message,
					Message_Type.SEARCH_ONE_SUBSCRIBTION_DATA,
					response, returnedValue, application_FullName,
					webReciever)
				break
			}
			case Message_Type.SEARCH_SUBSCRIBE: {
				this.subscribeToFrameworkObservable(message,
					Message_Type.SEARCH_SUBSCRIBTION_DATA,
					response, returnedValue, application_FullName,
					webReciever)
				break
			}
			case Message_Type.API_UNSUBSCRIBE: {
				if (!isFrameworkObservableCall) {
					break
				}
				let isolateSubscriptionMap = webReciever.subscriptionMap
					.get(application_FullName)
				if (!isolateSubscriptionMap) {
					console.error(`		Did not find isolateSubscriptionMap for Application:
${application_FullName}
					`)
					break
				}
				isolateSubscriptionMap.delete(message.subscriptionId)
				break
			}
			default: {
				this.webMessageGateway.sendMessageToApp(
					application_FullName, response)
				break
			}
		}
	}

	private subscribeToFrameworkObservable(
		message: IApiCallRequestMessage
			| IPortableQueryMessage
			| IReadQueryMessage
			| ISaveMessage<any>,
		type: Message_Type,
		messageFields: IApiCallResponseMessage,
		returnedValue: any,
		application_FullName: DbApplication_FullName,
		webReciever: IWebReceiverState,
	): void {
		const subscription = returnedValue.subscribe(
			returnedValue => {
				this.webMessageGateway.sendMessageToApp(
					application_FullName, {
					...messageFields,
					returnedValue,
					type
				})
			})
		let isolateSubscriptionMap = webReciever.subscriptionMap
			.get(application_FullName)
		if (!isolateSubscriptionMap) {
			isolateSubscriptionMap = new Map()
			webReciever.subscriptionMap.set(application_FullName, isolateSubscriptionMap)
		}
		isolateSubscriptionMap.set(message.subscriptionId, {
			lastActive: new Date().getTime(),
			subscription
		})
	}

	private getMessageServerApplication(
		message: IMessage
	) {
		return this.dbApplicationUtils.
			getDbApplication_FullNameFromDomainAndName(
				message.clientDomain, message.clientApplication)

	}

	private getMessageClientApplication(
		message: IMessage
	) {
		return this.dbApplicationUtils.
			getDbApplication_FullNameFromDomainAndName(
				message.serverDomain, message.serverApplication)
	}

}

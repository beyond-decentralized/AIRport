import { JsonApplicationVersionWithApi } from '@airport/air-traffic-control'
import { Message_Leg, IAirMessageUtils, IApiCallRequestMessage, IApiCallResponseMessage, IMessage, IInternalMessage, INTERNAL_Message_Type, Message_Direction, Message_Type_Group, ISubscriptionMessage, IObservableApiCallResponseMessage, SUBSCRIPTION_Message_Type, Message_OriginOrDestination_Type, IObservableApiCallRequestMessage, IConnectionReadyMessage, IResponseMessage } from '@airport/aviation-communication'
import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator'
import { IApplication, Application_FullName, IApplicationNameUtils } from '@airport/ground-control'
import {
	ITransactionalReceiver,
	IApiCallContext,
	ITransactionContext,
	ITerminalStore,
	ILocalAPIServer,
	IWebReceiverState,
	IInitializeConnectionMessage,
	IApiCredentials,
	IGetLatestApplicationVersionByApplication_NameMessage,
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
	applicationNameUtils: IApplicationNameUtils

	@Inject()
	localApiServer: ILocalAPIServer

	@Inject()
	terminalStore: ITerminalStore

	@Inject()
	webMessageGateway: IWebMessageGateway

	init() {
		const ownDomain = location.hostname
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
	}

	handleUIRequest(
		message: IInternalMessage | IApiCallRequestMessage
	): void {
		if (this.webMessageGateway.needMessageSerialization()) {
			throw new Error("Deserialization is not yet implemented.")
			// FIXME: deserialize message
		}

		if (message.typeGroup === Message_Type_Group.INTERNAL) {
			switch ((message as IInternalMessage).type) {
				case INTERNAL_Message_Type.IS_CONNECTION_READY: {
					this.ensureConnectionIsReady(message as IInternalMessage).then()
					return
				}
				default: {
					this.processInternalMessage(message as IInternalMessage)
					return
				}
			}
		}

		const fromClientRedirectedMessage: IApiCallRequestMessage = {
			...message,
			messageLeg: Message_Leg.FROM_HUB
		} as IApiCallRequestMessage
		this.doHandleUIRequest(fromClientRedirectedMessage).then()
	}

	handleAppRequest(
		message: IApiCallRequestMessage
			| IApiCallResponseMessage
			| IGetLatestApplicationVersionByApplication_NameMessage
			| IInitializeConnectionMessage
			| ISubscriptionMessage
			| IPortableQueryMessage
			| IReadQueryMessage
			| IRetrieveDomainMessage
			| ISaveMessage<any>,
		messageOrigin: string
	): void {
		const webReciever = this.terminalStore.getWebReceiver()

		switch (message.direction) {
			case Message_Direction.REQUEST:
				if (message.typeGroup === Message_Type_Group.INTERNAL) {
					this.handleInternalMessage(message as
						IGetLatestApplicationVersionByApplication_NameMessage
						| IInitializeConnectionMessage
						| IRetrieveDomainMessage,
						messageOrigin).then()
				} else {
					this.handleRequestMessage(message as
						IApiCallRequestMessage
						| ISubscriptionMessage
						| IPortableQueryMessage
						| IReadQueryMessage
						| ISaveMessage<any>,
						messageOrigin).then()
				}
				break
			case Message_Direction.RESPONSE:
				this.handleResponseMessage(message as IApiCallResponseMessage,
					messageOrigin, webReciever).then()
				break
			default:
				console.error(`Unexpected message direction ${message.direction}`)
				break
		}
	}

	async unloadUI(): Promise<void> {
		const subscriptionMap = this.terminalStore.getUI().subscriptionMap
		for (const [_subscriptionId, message] of subscriptionMap) {
			await this.doHandleUIRequest(message as any)
		}
		subscriptionMap.clear()
	}

	private async handleResponseMessage(
		message: IApiCallResponseMessage,
		messageOrigin: string,
		webReciever: IWebReceiverState
	): Promise<void> {
		const {
			endApiCall,
			replyToClient
		} = this.getResponseMessageOptions(message)

		const interAppApiCallRequest = webReciever.pendingInterAppApiCallMessageMap
			.get(message.id)
		const context: IApiCallContext = {
			isObservableApiCall: this.airMessageUtils.isObservableMessage(message)
		}
		const credentials: IApiCredentials = {
			application: message.origin.app,
			domain: message.origin.domain,
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

	private getResponseMessageOptions(
		message: IApiCallResponseMessage
			| IObservableApiCallResponseMessage
			| IInitializeConnectionMessage
	): IToClientMessageOptions {
		let endApiCall = true
		let replyToClient = true
		if (message.typeGroup === Message_Type_Group.SUBSCRIPTION) {
			switch ((message as IObservableApiCallResponseMessage).type) {
				case SUBSCRIPTION_Message_Type.API_SUBSCRIBE: {
					endApiCall = true
					break
				}
				case SUBSCRIPTION_Message_Type.API_SUBSCRIPTION_DATA: {
					endApiCall = false
					replyToClient = true
					break
				}
				case SUBSCRIPTION_Message_Type.API_UNSUBSCRIBE: {
					endApiCall = false
					replyToClient = false
					break
				}
			}
		}

		return {
			endApiCall,
			replyToClient
		}
	}

	private async replyToClient(
		message: IApiCallResponseMessage
			| IObservableApiCallResponseMessage
			| IInitializeConnectionMessage,
		errorMessage,
		returnedValue,
		success,
		messageOrigin
	): Promise<void> {
		const toClientRedirectedMessage: IApiCallResponseMessage
			| IObservableApiCallResponseMessage
			| IInitializeConnectionMessage = {
			...message,
			direction: Message_Direction.RESPONSE,
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
		this.sendMessageReply(toClientRedirectedMessage)
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
			const application_FullName = this.getMessageDestinationApplication(
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
						destination: message.origin,
						direction: Message_Direction.RESPONSE,
						messageLeg: Message_Leg.FROM_HUB,
						origin: message.destination,
						typeGroup: Message_Type_Group.API
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
			args,
			destination: message.origin,
			direction: Message_Direction.RESPONSE,
			errorMessage,
			messageLeg: Message_Leg.FROM_HUB,
			origin: message.destination,
			returnedValue,
			transactionId
		}

		return response;
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
			const fullApplication_Name = this.getMessageDestinationApplication(
				message)
			const application: IApplication = this.terminalStore
				.getApplicationMapByFullName().get(fullApplication_Name)
			if (!application) {
				throw new Error(`Could not find AIRport Framework Application: ${fullApplication_Name}`)
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
					application: message.destination.app,
					domain: message.destination.domain,
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
		message: IInternalMessage
	): Promise<void> {
		const applicationIsInstalled = await this.applicationInitializer
			.ensureApplicationIsInstalled(message.destination.domain,
				message.destination.app)

		if (!applicationIsInstalled) {
			return
		}

		const connectionIsReadyMessage: IConnectionReadyMessage = {
			...message,
			destination: message.origin,
			origin: {
				domain: 'turbase.org',
				protocol: 'https:',
				type: Message_OriginOrDestination_Type.FRAMEWORK
			},
			direction: Message_Direction.RESPONSE,
			messageLeg: Message_Leg.FROM_HUB,
			returnedValue: {
				app: message.destination.app,
				domain: message.destination.domain
			},
			type: INTERNAL_Message_Type.CONNECTION_IS_READY,
			typeGroup: Message_Type_Group.INTERNAL
		};

		if (this.webMessageGateway.needMessageSerialization()) {
			// FIXME: serialize message
		}
		this.webMessageGateway.sendMessageToClient(connectionIsReadyMessage)
	}

	private async doHandleUIRequest(
		message: IApiCallRequestMessage | IObservableApiCallRequestMessage
	): Promise<void> {
		const application_FullName = this.getMessageDestinationApplication(
			message)

		if (!await this.applicationInitializer.isApplicationIsInstalled(
			message.destination.domain, application_FullName)) {
			this.relyWithError(message, `Application is not installed`)
			return
		}

		this.maintainUiSubscriptions(message as any)

		
		let isFrameworkApiCall = false
		switch (message.typeGroup) {
			case Message_Type_Group.API: {
				const result = await this.handleApiCall(message as IApiCallRequestMessage)
				const response = result.response
				if (result.isFrameworkApiCall) {
					await this.replyToClient(
						{
							...message,
							destination: message.origin,
							origin: message.destination
						},
						response.errorMessage,
						response.returnedValue,
						!response.errorMessage,
						null
					)
				}
				break
			}
			case Message_Type_Group.SUBSCRIPTION: {
				const result = await this.handleSubscriptionRequestMessage(message as ISubscriptionMessage)
				isFrameworkApiCall = result.isFrameworkApiCall

				if (isFrameworkApiCall) {
					const webReciever = this.terminalStore.getWebReceiver()
					switch ((message as ISubscriptionMessage).type) {
						case SUBSCRIPTION_Message_Type.API_SUBSCRIBE: {
							const response = result.response
							this.subscribeToFrameworkObservable(message as ISubscriptionMessage,
								SUBSCRIPTION_Message_Type.API_SUBSCRIPTION_DATA,
								message, response.returnedValue, Message_OriginOrDestination_Type.USER_INTERFACE,
								webReciever)
							break
						}
						case SUBSCRIPTION_Message_Type.API_UNSUBSCRIBE: {
							this.frameworkApiUnsubscribe(message as ISubscriptionMessage,
								Message_OriginOrDestination_Type.USER_INTERFACE, webReciever
							)
							break
						}
					}
				}
				break
			}
			default: {
				throw new Error(`
Unexpected message typeGroup for UI request:
	${message.typeGroup}
`)
			}
		}

	}

	private maintainUiSubscriptions(
		message: ISubscriptionMessage
	): void {
		switch (message.typeGroup) {
			case Message_Type_Group.SUBSCRIPTION:
				break
			default:
				return
		}
		const subscriptionMap = this.terminalStore.getUI().subscriptionMap
		switch (message.type) {
			case SUBSCRIPTION_Message_Type.API_SUBSCRIBE:
				subscriptionMap.set(message.subscriptionId, {
					...message,
					type: SUBSCRIPTION_Message_Type.API_UNSUBSCRIBE
				})
				break
			case SUBSCRIPTION_Message_Type.API_UNSUBSCRIBE:
				subscriptionMap.delete(message.subscriptionId)
				break
			default:
				return
		}
	}

	private relyWithError(
		message: IApiCallRequestMessage,
		errorMessage: string
	) {
		const toClientRedirectedMessage: IApiCallResponseMessage = {
			...message,
			direction: Message_Direction.RESPONSE,
			messageLeg: Message_Leg.FROM_HUB,
			errorMessage,
			id: message.id,
			returnedValue: null
		}

		this.sendMessageReply(toClientRedirectedMessage)
	}

	private sendMessageReply(
		message: IApiCallResponseMessage
			| IInitializeConnectionMessage
	) {
		// Forward the request to the source client
		if (this.webMessageGateway.needMessageSerialization()) {
			// FIXME: serialize message
		}

		if (message.typeGroup === Message_Type_Group.SUBSCRIPTION
			&& message.destination.type !== Message_OriginOrDestination_Type.USER_INTERFACE) {
			const application_FullName = this.getMessageDestinationApplication(
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

		const fullApplication_Name = this.getMessageDestinationApplication(
			message)
		// Only accept requests from https protocol
		if (!messageOrigin.startsWith("https")
			// and from application domains that match the fullApplication_Name
			|| applicationDomain !== fullApplication_Name + webReciever.domainPrefix) {
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

		// check application domain-embedded signature and fullApplication_Name in message
		// and make sure they result in a match
		if (applicationDomainFirstFragment !== fullApplication_Name) {
			return false
		}

		return !!this.terminalStore.getApplicationInitializer()
			.applicationWindowMap.get(fullApplication_Name)
	}


	private async handleInternalMessage(
		message: IInternalMessage,
		messageOrigin: string
	): Promise<void> {
		if (!await this.messageIsFromValidApp(message, messageOrigin)) {
			return
		}

		const result = await this.processInternalMessage(message)

		if (result.theResult === undefined
			&& result.theErrorMessage === undefined) {
			return
		}

		this.webMessageGateway.sendMessageToApp(
			this.getMessageOriginApplication(message), {
				...message,
				origin: {
					domain: 'turbase.org',
					protocol: 'https:',
					type: Message_OriginOrDestination_Type.FRAMEWORK
				},
				destination: message.origin,
				errorMessage: result.theErrorMessage,
				returnedValue: result.theResult as any
			} as IInternalMessage)
	}

	private async handleRequestMessage(
		message: IApiCallRequestMessage
			| ISubscriptionMessage
			| IPortableQueryMessage
			| IReadQueryMessage
			| ISaveMessage<any>,
		messageOrigin: string
	): Promise<void> {
		if (!await this.messageIsFromValidApp(message, messageOrigin)) {
			return
		}

		let response
		let isFrameworkApiCall = false
		switch (message.typeGroup) {
			case Message_Type_Group.API: {
				response = await this.nativeHandleApiCall(message as IApiCallRequestMessage, {
					isObservableApiCall: this.airMessageUtils.isObservableMessage(message),
					startedAt: new Date()
				})
				break
			}
			case Message_Type_Group.CRUD: {
				response = await this.processCRUDMessage(message as IPortableQueryMessage
					| IReadQueryMessage
					| ISaveMessage<any>)
				break
			}
			case Message_Type_Group.SUBSCRIPTION: {
				const result = await this.handleSubscriptionRequestMessage(message as ISubscriptionMessage)
				isFrameworkApiCall = result.isFrameworkApiCall
				response = result.response
				break
			}
			default: {
				throw new Error(`
Unexpected message typeGroup:
	${message.typeGroup}
`)
			}
		}

		if (!response) {
			return
		}

		const application_FullName = this
			.getMessageOriginApplication(message)
		const webReciever = this.terminalStore.getWebReceiver()

		this.handleApiCallOrSubscription(
			message,
			response,
			response.returnedValue,
			application_FullName,
			isFrameworkApiCall,
			webReciever
		)

	}

	private async handleSubscriptionRequestMessage(
		message: ISubscriptionMessage
	): Promise<{
		isFrameworkApiCall: boolean,
		response: IResponseMessage<Observable<any>>
	}> {
		const webReciever = this.terminalStore.getWebReceiver()
		const application_FullName = this.getMessageOriginApplication(message)

		let response
		let isFrameworkApiCall = false
		switch (message.type) {
			case SUBSCRIPTION_Message_Type.API_SUBSCRIBE:
			case SUBSCRIPTION_Message_Type.API_UNSUBSCRIBE: {
				const observableApiResult = await this.handleApiCall(message as IObservableApiCallRequestMessage)
				isFrameworkApiCall = observableApiResult.isFrameworkApiCall
				response = observableApiResult.response
				break
			}
			case SUBSCRIPTION_Message_Type.SEARCH_ONE_UNSUBSCRIBE:
			case SUBSCRIPTION_Message_Type.SEARCH_UNSUBSCRIBE: {
				if (message.origin.type === Message_OriginOrDestination_Type.USER_INTERFACE) {
					throw new Error(`search calls cannot be made from user interfaces`)
				}
				let clientSubscriptionMap = webReciever
					.subscriptionMap.get(application_FullName)
				if (!clientSubscriptionMap) {
					break
				}
				let subscription = clientSubscriptionMap.get(message.subscriptionId)
				if (!subscription) {
					break
				}
				subscription.unsubscribe()
				clientSubscriptionMap.delete(message.subscriptionId)
				break
			}
			case SUBSCRIPTION_Message_Type.SEARCH_ONE_SUBSCRIBE:
			case SUBSCRIPTION_Message_Type.SEARCH_SUBSCRIBE: {
				if (message.origin.type === Message_OriginOrDestination_Type.USER_INTERFACE) {
					throw new Error(`search calls cannot be made from user interfaces`)
				}
				response = await this.processSubscriptionMessage(message as ISubscriptionMessage)
				// Subscription is done in another method
				break
			}
			case SUBSCRIPTION_Message_Type.API_SUBSCRIPTION_DATA:
			case SUBSCRIPTION_Message_Type.SEARCH_ONE_SUBSCRIPTION_DATA:
			case SUBSCRIPTION_Message_Type.SEARCH_SUBSCRIPTION_DATA: {
				throw new Error(`
Unexpected *_SUBSCRIPTION_DATA message.type:

	${message.type}

Subscription data should be response messages.
				`)
			}
			default: {
				throw new Error(`Unexpected message.type ${message.type}`)
			}
		}

		return {
			isFrameworkApiCall,
			response
		}
	}

	private async handleApiCall(
		message: IApiCallRequestMessage | IObservableApiCallRequestMessage
	): Promise<{
		errorMessage?: string,
		isFrameworkApiCall: boolean,
		isObservableApiCall: boolean,
		response: IApiCallResponseMessage | IObservableApiCallResponseMessage | {
			errorMessage,
			replyToClient,
			returnedValue
		}
	}> {
		let isFrameworkApiCall = false
		let isObservableApiCall = this.airMessageUtils.isObservableMessage(message)
		let response = null

		const context: IContext = {
			isObservableApiCall,
			startedAt: new Date()
		}
		const startDescriptor = await this.nativeStartApiCall(message, context);
		if (!startDescriptor.isStarted) {
			console.error(context.errorMessage)
			return {
				errorMessage: context.errorMessage,
				isFrameworkApiCall,
				isObservableApiCall,
				response
			}
		}

		isFrameworkApiCall = startDescriptor.isFramework
		if (isFrameworkApiCall) {
			const apiCallResult = await this.callFrameworkApi(message, context)

			if (apiCallResult.errorMessage) {
				// TODO: send back error messages for (UN)SUBSCRIBE messages
				console.error(apiCallResult)
				return
			}
			response = apiCallResult
		} else {
			response = {
				...message,
				messageLeg: Message_Leg.FROM_HUB
			}
		}
		response.origin = message.destination
		response.destination = message.origin
		response.direction = Message_Direction.RESPONSE

		return {
			isFrameworkApiCall,
			isObservableApiCall,
			response
		}
	}

	private handleApiCallOrSubscription(
		message: IApiCallRequestMessage
			| IPortableQueryMessage
			| IReadQueryMessage
			| ISaveMessage<any>
			| ISubscriptionMessage,
		response: IApiCallResponseMessage,
		returnedValue: Observable<any>,
		application_FullName: Application_FullName,
		isFrameworkApiCall: boolean,
		webReciever: IWebReceiverState
	): void {
		switch (message.typeGroup) {
			case Message_Type_Group.SUBSCRIPTION: {
				switch ((message as ISubscriptionMessage).type) {
					case SUBSCRIPTION_Message_Type.API_SUBSCRIBE: {
						if (!isFrameworkApiCall) {
							this.webMessageGateway.sendMessageToApp(
								application_FullName, response)
							break
						}
						this.subscribeToFrameworkObservable(message as ISubscriptionMessage,
							SUBSCRIPTION_Message_Type.API_SUBSCRIPTION_DATA,
							response, returnedValue, application_FullName,
							webReciever)
						break
					}
					case SUBSCRIPTION_Message_Type.SEARCH_ONE_SUBSCRIBE: {
						this.subscribeToFrameworkObservable(message as ISubscriptionMessage,
							SUBSCRIPTION_Message_Type.SEARCH_ONE_SUBSCRIPTION_DATA,
							response, returnedValue, application_FullName,
							webReciever)
						break
					}
					case SUBSCRIPTION_Message_Type.SEARCH_SUBSCRIBE: {
						this.subscribeToFrameworkObservable(message as ISubscriptionMessage,
							SUBSCRIPTION_Message_Type.SEARCH_SUBSCRIPTION_DATA,
							response, returnedValue, application_FullName,
							webReciever)
						break
					}
					case SUBSCRIPTION_Message_Type.API_UNSUBSCRIBE: {
						if (!isFrameworkApiCall) {
							break
						}
						this.frameworkApiUnsubscribe(message as ISubscriptionMessage,
							application_FullName, webReciever
						)
						break
					}
					default: {
						this.webMessageGateway.sendMessageToApp(
							application_FullName, response)
						break
					}
				}
				break
			}
			default: {
				this.webMessageGateway.sendMessageToApp(
					application_FullName, response)
				break
			}
		}
	}

	private frameworkApiUnsubscribe(
		message: ISubscriptionMessage,
		application_FullName: Application_FullName,
		webReciever: IWebReceiverState
	): void {

		let clientSubscriptionMap = webReciever.subscriptionMap
			.get(application_FullName)
		if (!clientSubscriptionMap) {
			console.error(`		Did not find clientSubscriptionMap for Application:
${application_FullName}
		`)
			return
		}
		const subscriptionId = (message as ISubscriptionMessage)
			.subscriptionId
		clientSubscriptionMap.get(subscriptionId)?.unsubscribe()
		clientSubscriptionMap.delete(subscriptionId)
	}

	private subscribeToFrameworkObservable(
		message: ISubscriptionMessage,
		type: SUBSCRIPTION_Message_Type,
		messageFields: IApiCallResponseMessage,
		returnedValue: Observable<any>,
		application_FullName: Application_FullName,
		webReciever: IWebReceiverState,
	): void {
		const subscription = returnedValue.subscribe(
			returnedValue => {
				let responseMessage: IObservableApiCallResponseMessage = {
					...messageFields,
					destination: message.origin,
					direction: Message_Direction.RESPONSE,
					isAIRportMessage: true,
					messageLeg: Message_Leg.FROM_HUB,
					origin: message.destination,
					returnedValue,
					subscriptionId: message.subscriptionId,
					type,
					typeGroup: Message_Type_Group.SUBSCRIPTION
				}
				if (message.origin.type === Message_OriginOrDestination_Type.USER_INTERFACE) {
					this.webMessageGateway.sendMessageToClient(responseMessage)
				} else {
					this.webMessageGateway.sendMessageToApp(
						application_FullName, responseMessage)
				}
			})
		let clientSubscriptionMap = webReciever.subscriptionMap
			.get(application_FullName)
		if (!clientSubscriptionMap) {
			clientSubscriptionMap = new Map()
			webReciever.subscriptionMap.set(application_FullName, clientSubscriptionMap)
		}
		clientSubscriptionMap.set(message.subscriptionId, subscription)
	}

	private getMessageDestinationApplication(
		message: IMessage
	) {
		return this.applicationNameUtils.
			getApplication_FullNameFromDomainAndName(
				message.destination.domain, message.destination.app)

	}

	private getMessageOriginApplication(
		message: IMessage
	) {
		return this.applicationNameUtils.
			getApplication_FullNameFromDomainAndName(
				message.origin.domain, message.origin.app)
	}

}

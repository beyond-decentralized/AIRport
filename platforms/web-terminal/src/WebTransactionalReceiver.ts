import { JsonApplicationVersionWithApi } from '@airport/air-traffic-control'
import { Message_Direction, Message_Leg, Message_Type, IAirMessageUtils, IApiCallRequestMessage, IApiCallResponseMessage, IMessage } from '@airport/aviation-communication'
import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import { DbApplication, IDbApplicationUtils } from '@airport/ground-control'
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

interface IToClientMessageOptions {
	decrementPendingCounts: boolean
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
		messageOrigin: string,
		sourceWindow: Window
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
					messageOrigin, sourceWindow).then()
				break
			case Message_Direction.INTERNAL:
				this.handleInternalMessage(message as
					IGetLatestApplicationVersionByDbApplication_NameMessage
					| IInitializeConnectionMessage
					| IRetrieveDomainMessage,
					messageOrigin, sourceWindow).then()
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
			decrementPendingCounts,
			endApiCall,
			replyToClient
		} = this.getToClientMessageOptions(message)

		const interAppApiCallRequest = webReciever.pendingInterAppApiCallMessageMap
			.get(message.id)
		const context: IApiCallContext = {
			isObservableApiCall: this.airMessageUtils.isObservableMessage(message.type)
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
				messageOrigin,
				decrementPendingCounts
			)
		} else if (decrementPendingCounts) {
			this.decrementPendingCounts(message)
		}
	}

	private getToClientMessageOptions(
		message: IApiCallResponseMessage
			| IInitializeConnectionMessage
	): IToClientMessageOptions {
		let decrementPendingCounts = true
		let endApiCall = true
		let replyToClient = true
		switch (message.type) {
			case Message_Type.API_SUBSCRIBE: {
				decrementPendingCounts = true
				endApiCall = true
				break
			}
			case Message_Type.API_SUBSCRIBTION_DATA: {
				decrementPendingCounts = false
				endApiCall = false
				replyToClient = true
				break
			}
			case Message_Type.API_UNSUBSCRIBE: {
				decrementPendingCounts = false
				endApiCall = false
				replyToClient = false
				break
			}
		}

		return {
			decrementPendingCounts,
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
		messageOrigin,
		decrementPendingCounts: boolean
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
		this.replyToClientRequest(toClientRedirectedMessage, decrementPendingCounts)
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

			this.webMessageGateway.sendMessageToApp(messageCopy)
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
	): Promise<void> {
		const startDescriptor = await this.nativeStartApiCall(message, context);
		if (!startDescriptor.isStarted) {
			throw new Error(context.errorMessage)
		}

		if (startDescriptor.isFramework) {
			await this.callFrameworkApi(message, context)
		}
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
			const fullDbApplication_Name = this.dbApplicationUtils
				.getDbApplication_FullNameFromDomainAndName(
					message.serverDomain, message.serverApplication)
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

		let numPendingMessagesFromHost = webReciever.pendingHostCounts
			.get(message.serverDomain)
		if (!numPendingMessagesFromHost) {
			numPendingMessagesFromHost = 0
		}
		if (numPendingMessagesFromHost > 4) {
			// Prevent hosts from making local 'Denial of Service' attacks
			return
		}

		const fullDbApplication_Name = this.dbApplicationUtils.
			getDbApplication_FullNameFromDomainAndName(
				message.serverDomain, message.serverApplication)

		let numPendingMessagesForApplication = webReciever.pendingApplicationCounts.get(fullDbApplication_Name)
		if (!numPendingMessagesForApplication) {
			numPendingMessagesForApplication = 0
		}
		if (numPendingMessagesForApplication === -1) {
			// Already could not install the application, may be a DOS attack, return right away
			return
		}

		webReciever.pendingHostCounts.set(message.serverDomain, numPendingMessagesFromHost + 1)
		webReciever.pendingApplicationCounts.set(fullDbApplication_Name, numPendingMessagesForApplication + 1)

		if (!await this.applicationInitializer.isApplicationIsInstalled(
			message.serverDomain, fullDbApplication_Name)) {
			this.relyToClientWithError(message, `Application is not installed`)
			return
		}

		const context: IApiCallContext = {
			isObservableApiCall: this.airMessageUtils.isObservableMessage(message.type)
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
					null,
					true
				)
			} else {
				this.decrementPendingCounts(message)
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

		this.replyToClientRequest(toClientRedirectedMessage, true)
	}

	private replyToClientRequest(
		message: IApiCallResponseMessage
			| IInitializeConnectionMessage,
		decrementPendingCounts: boolean
	) {
		if (decrementPendingCounts) {
			this.decrementPendingCounts(message)
		}
		// Forward the request to the source client
		if (this.webMessageGateway.needMessageSerialization()) {
			// FIXME: serialize message
		}

		let sourceWindow
		if (message.subscriptionId && message.clientApplication !== 'UserInterface') {
			const fullDbApplication_Name = this.dbApplicationUtils.
				getDbApplication_FullNameFromDomainAndName(
					message.clientDomain, message.clientApplication)
			let isolateSubscriptionSourceWindowMap = this.terminalStore.getWebReceiver()
				.subscriptionSourceWindowMap.get(fullDbApplication_Name)
			if (!isolateSubscriptionSourceWindowMap) {
				console.error(
					`Message has a subscriptionId and isolateSubscriptionSourceWindowMap
could not be found for client Application:
	${fullDbApplication_Name}
`)
				return
			}
			sourceWindow = isolateSubscriptionSourceWindowMap.get(
				message.subscriptionId)
		}

		if (sourceWindow) {
			this.webMessageGateway.sendMessageToWindow(message, sourceWindow)
		} else {
			this.webMessageGateway.sendMessageToClient(message)
		}
	}

	private decrementPendingCounts(
		message: IApiCallRequestMessage
			| IApiCallResponseMessage
			| IInitializeConnectionMessage
	) {
		const fullDbApplication_Name = this.dbApplicationUtils.
			getDbApplication_FullNameFromDomainAndName(
				message.serverDomain, message.serverApplication)
		const webReciever = this.terminalStore.getWebReceiver()

		let numMessagesFromHost = webReciever.pendingHostCounts.get(message.clientDomain)
		if (numMessagesFromHost > 0) {
			webReciever.pendingHostCounts.set(message.clientDomain, numMessagesFromHost - 1)
		}
		let numMessagesForApplication = webReciever.pendingApplicationCounts
			.get(fullDbApplication_Name)
		if (numMessagesForApplication > 0) {
			webReciever.pendingApplicationCounts.set(message.serverDomain,
				numMessagesForApplication - 1)
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

		const fullDbApplication_Name = this.dbApplicationUtils.
			getDbApplication_FullNameFromDomainAndName(
				message.serverDomain, message.serverApplication)
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
		messageOrigin: string,
		sourceWindow: Window
	): Promise<void> {
		if (!await this.messageIsFromValidApp(message, messageOrigin)) {
			return
		}

		const result = await this.processInternalMessage(message)

		this.webMessageGateway.sendMessageToWindow({
			...message,
			returnedValue: result.theResult as any
		}, sourceWindow)
	}

	private async handleFromClientMessage(
		message: IApiCallRequestMessage
			| IPortableQueryMessage
			| IReadQueryMessage
			| ISaveMessage<any>,
		messageOrigin: string,
		sourceWindow: Window
	): Promise<void> {
		if (!await this.messageIsFromValidApp(message, messageOrigin)) {
			return
		}

		const webReciever = this.terminalStore.getWebReceiver()

		const fullDbApplication_Name = this.dbApplicationUtils.
			getDbApplication_FullNameFromDomainAndName(
				message.clientDomain, message.clientApplication)
		switch (message.type) {
			case Message_Type.SEARCH_UNSUBSCRIBE:
				let isolateSubscriptionMap = webReciever.subscriptionMap.get(fullDbApplication_Name)
				if (!isolateSubscriptionMap) {
					return
				}
				let subscription = isolateSubscriptionMap.get(message.subscriptionId)
				if (!subscription) {
					return
				}
				subscription.unsubscribe()
				isolateSubscriptionMap.delete(message.subscriptionId)
				return;
		}

		let response
		switch (message.type) {
			case Message_Type.API_CALL: {
				response = await this.nativeHandleApiCall(message as IApiCallRequestMessage, {
					isObservableApiCall: this.airMessageUtils.isObservableMessage(message.type),
					startedAt: new Date()
				})
				break;
			}
			case Message_Type.API_SUBSCRIBE: {
				let isolateSubscriptionSourceWindowMap = webReciever
					.subscriptionSourceWindowMap.get(fullDbApplication_Name)
				if (!isolateSubscriptionSourceWindowMap) {
					isolateSubscriptionSourceWindowMap = new Map()
					webReciever.subscriptionSourceWindowMap.set(
						fullDbApplication_Name, isolateSubscriptionSourceWindowMap)
				}
				isolateSubscriptionSourceWindowMap.set(
					message.subscriptionId, sourceWindow)
				await this.nativeHandleObservableApiCall(message as IApiCallRequestMessage, {
					isObservableApiCall: this.airMessageUtils.isObservableMessage(message.type),
					startedAt: new Date()
				})
				break;
			}
			case Message_Type.API_UNSUBSCRIBE: {
				let isolateSubscriptionSourceWindowMap = webReciever
					.subscriptionSourceWindowMap.get(fullDbApplication_Name)
				if (!isolateSubscriptionSourceWindowMap) {
					console.error(`During an API_UNSUBSCRIBE call,
did not found an entry in subscriptionSourceWindowMap for Application:
	${fullDbApplication_Name}
`)
				}
				isolateSubscriptionSourceWindowMap.delete(message.subscriptionId)
				await this.nativeHandleObservableApiCall(message as IApiCallRequestMessage, {
					isObservableApiCall: this.airMessageUtils.isObservableMessage(message.type),
					startedAt: new Date()
				})
				break;
			}
			default: {
				response = await this.processFromClientMessage(message as IPortableQueryMessage
					| IReadQueryMessage
					| ISaveMessage<any>)
				break;
			}
		}

		if (!response) {
			return
		}

		let type
		switch (message.type) {
			case Message_Type.SEARCH_ONE_SUBSCRIBE:
				type = Message_Type.SEARCH_ONE_SUBSCRIBTION_DATA
			case Message_Type.SEARCH_SUBSCRIBE: {
				type = Message_Type.SEARCH_SUBSCRIBTION_DATA
				const subscription = response.returnedValue.subscribe(returnedValue => {
					this.webMessageGateway.sendMessageToWindow({
						...response,
						returnedValue,
						type
					}, sourceWindow)
				})
				let isolateSubscriptionMap = webReciever.subscriptionMap.get(fullDbApplication_Name)
				if (!isolateSubscriptionMap) {
					isolateSubscriptionMap = new Map()
					webReciever.subscriptionMap.set(fullDbApplication_Name, isolateSubscriptionMap)
				}
				isolateSubscriptionMap.set(message.id, subscription)
				break
			}
			default: {
				this.webMessageGateway.sendMessageToWindow(response, sourceWindow)
				break
			}
		}
	}
}

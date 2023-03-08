import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	ILocalAPIRequest,
	ILocalAPIResponse,
	IObservableLocalAPIResponse
} from '@airport/aviation-communication'
import {
	TransactionalReceiver
} from '@airport/terminal'
import {
	ITransactionalReceiver,
	IApiCallContext,
	ITransactionContext,
	ITerminalStore,
	ILocalAPIServer,
	IIsolateMessage,
	IApiIMI,
	IsolateMessageType,
	ILocalAPIRequestIMI,
	IObservableDataIMO
} from '@airport/terminal-map'
import {
	map
} from 'rxjs/operators'
import { IWebApplicationInitializer } from './WebApplicationInitializer'
import { IWebMessageReceiver } from './WebMessageReceiver'
import { DbApplication, IDbApplicationUtils } from '@airport/ground-control'
import { JsonApplicationVersionWithApi } from '@airport/air-traffic-control'

@Injected()
export class WebTransactionalReceiver
	extends TransactionalReceiver
	implements ITransactionalReceiver {

	@Inject()
	applicationInitializer: IWebApplicationInitializer

	@Inject()
	dbApplicationUtils: IDbApplicationUtils

	@Inject()
	localApiServer: ILocalAPIServer

	@Inject()
	terminalStore: ITerminalStore

	@Inject()
	webMessageReceiver: IWebMessageReceiver

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
		message: ILocalAPIRequest
	): void {
		if (!(message instanceof Object) || message.__received__) {
			return
		}
		message.__received__ = true

		// All requests need to have a application signature
		// to know what application is being communicated to/from
		if (!this.hasValidApplicationInfo(message)) {
			return
		}

		if (this.webMessageReceiver.needMessageSerialization()) {
			throw new Error("Deserialization is not yet implemented.")
			// FIXME: deserialize message
		}

		const webReciever = this.terminalStore.getWebReceiver()

		if (webReciever.onClientMessageCallback) {
			const receivedDate = new Date()
			message.__receivedTime__ = receivedDate.getTime()
			webReciever.onClientMessageCallback(message)
		}

		switch (message.category) {
			case 'FromClient':
				const fromClientRedirectedMessage: ILocalAPIRequest = {
					...message,
					__received__: false,
					__receivedTime__: null,
					category: 'FromClientRedirected'
				}
				this.handleFromClientRequest(fromClientRedirectedMessage).then()
				break
			case 'IsConnectionReady':
				this.ensureConnectionIsReady(message).then()
				break
		}
	}

	handleAppRequest(
		message: (IIsolateMessage & IApiIMI) | ILocalAPIResponse,
		messageOrigin: string,
		source: any
	): void {
		if (message.__received__) {
			return
		}
		message.__received__ = true

		// All requests need to have a application signature
		// to know what application is being communicated to/from
		if (!this.hasValidApplicationInfo(message)) {
			return
		}

		const webReciever = this.terminalStore.getWebReceiver()

		if (webReciever.onClientMessageCallback) {
			const receivedDate = new Date()
			message.__receivedTime__ = receivedDate.getTime()
			webReciever.onClientMessageCallback(message)
		}

		switch (message.category) {
			case 'ToDb':
				this.handleIsolateMessage(message as (IIsolateMessage & IApiIMI), messageOrigin,
					source as Window).then()
				break
			case 'ToClient':
				const interAppApiCallRequest = webReciever.pendingInterAppApiCallMessageMap.get(message.id)

				const context: IApiCallContext = {}
				this.endApiCall({
					application: message.application,
					domain: message.domain,
					methodName: (message as ILocalAPIResponse).methodName,
					objectName: (message as ILocalAPIResponse).objectName,
					transactionId: (message as ILocalAPIResponse).transactionId
				}, message.errorMessage, context).then((success) => {
					if (interAppApiCallRequest) {
						interAppApiCallRequest.resolve(message)
					} else if (!(message as IObservableLocalAPIResponse).observableOperation) {
						this.replyToClient(
							message,
							message.args,
							success ? message.errorMessage : context.errorMessage,
							message.payload,
							message.protocol,
							success,
							messageOrigin
						).then()
					}
				})
				break
			default:
				break
		}
	}

	private async replyToClient(
		message: (IIsolateMessage & IApiIMI) | ILocalAPIRequest | ILocalAPIResponse,
		args,
		errorMessage,
		payload,
		protocol,
		success,
		messageOrigin
	): Promise<void> {
		const toClientRedirectedMessage: ILocalAPIResponse = {
			...message,
			__received__: false,
			__receivedTime__: null,
			application: message.application,
			args,
			category: 'ToClientRedirected',
			domain: message.domain,
			errorMessage: errorMessage,
			hostDomain: (message as ILocalAPIResponse).hostDomain,
			hostProtocol: (message as ILocalAPIResponse).hostProtocol,
			methodName: (message as ILocalAPIResponse).methodName,
			objectName: (message as ILocalAPIResponse).objectName,
			payload,
			protocol,
			transactionId: (message as ILocalAPIResponse).transactionId
		}
		if (!success) {
			toClientRedirectedMessage.errorMessage = errorMessage
			toClientRedirectedMessage.payload = null
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
		message: ILocalAPIRequest<'FromClientRedirected'>,
		context: IApiCallContext & ITransactionContext
	): Promise<{
		isFramework?: boolean
		isStarted: boolean,
	}> {
		const messageCopy = {
			...message
		}
		return await this.startApiCall(messageCopy, context, async () => {
			const fullDbApplication_Name = this.dbApplicationUtils.
				getDbApplication_FullNameFromDomainAndName(
					message.domain, message.application)
			const frameWindow = this.getFrameWindow(fullDbApplication_Name)
			if (frameWindow) {
				messageCopy.transactionId = context.transaction.id
				// Forward the request to the correct application iframe
				frameWindow.postMessage(messageCopy, '*')
			} else {
				throw new Error(`No Application IFrame found for: ${fullDbApplication_Name}`)
			}
		})
	}

	protected async nativeHandleApiCall(
		message: ILocalAPIRequest<'FromClientRedirected'>,
		context: IApiCallContext & ITransactionContext
	): Promise<ILocalAPIResponse> {
		const messageCopy: ILocalAPIRequest<'FromClientRedirected'> = {
			...message
		}
		delete messageCopy.__received__
		delete messageCopy.__receivedTime__
		messageCopy.category = 'FromClientRedirected'
		const startDescriptor = await this.nativeStartApiCall(messageCopy, context);
		if (!startDescriptor.isStarted) {
			throw new Error(context.errorMessage)
		}

		let args, errorMessage, payload, transactionId
		if (startDescriptor.isFramework) {
			const result = await this.callFrameworkApi(message, context)
			errorMessage = result.errorMessage
			payload = result.payload
			args = message.args
			transactionId = message.transactionId
		} else {
			const replyMessage: ILocalAPIResponse = await new Promise((resolve) => {
				this.terminalStore.getWebReceiver().pendingInterAppApiCallMessageMap.set(messageCopy.id, {
					message: {
						...messageCopy,
						category: 'FromDb',
						type: IsolateMessageType.CALL_API
					},
					resolve
				})
			})

			args = replyMessage.args
			errorMessage = replyMessage.errorMessage
			payload = replyMessage.payload
			transactionId = replyMessage.transactionId
		}

		const response: ILocalAPIResponse = {
			...messageCopy,
			category: 'FromDb',
			args,
			errorMessage,
			payload,
			transactionId
		}

		return response;
	}

	private async callFrameworkApi(
		message: ILocalAPIRequest<'FromClientRedirected'>,
		context: IApiCallContext & ITransactionContext,
	): Promise<{
		errorMessage,
		payload
	}> {
		let payload
		let errorMessage
		const messageCopy = {
			...message,
			transactionId: context.transaction.id
		}
		const internalCredentials = this.terminalStore.getInternalConnector().internalCredentials
		const priorTransactionId = internalCredentials.transactionId
		try {
			internalCredentials.transactionId = context.transaction.id
			const fullDbApplication_Name = this.dbApplicationUtils
				.getDbApplication_FullNameFromDomainAndName(
					message.domain, message.application)
			const application: DbApplication = this.terminalStore
				.getApplicationMapByFullName().get(fullDbApplication_Name)
			if (!application) {
				throw new Error(`Could not find AIRport Framework Application: ${fullDbApplication_Name}`)
			}
			payload = await this.localApiServer.coreHandleRequest(messageCopy,
				(application.currentVersion[0].applicationVersion.jsonApplication.versions[0] as JsonApplicationVersionWithApi).api, context)
		} catch (e) {
			errorMessage = e.message ? e.message : e
			console.error(e)
		} finally {
			try {
				await this.endApiCall({
					application: message.application,
					domain: message.domain,
					methodName: message.methodName,
					objectName: message.objectName,
					transactionId: messageCopy.transactionId
				}, errorMessage, context);
			} catch (e) {
				errorMessage = e.message ? e.message : e
				console.error(e)
			} finally {
				internalCredentials.transactionId = priorTransactionId
			}
		}

		return {
			errorMessage,
			payload
		}
	}

	private async ensureConnectionIsReady(
		message: ILocalAPIRequest
	): Promise<void> {
		const applicationIsInstalled = await this.applicationInitializer.ensureApplicationIsInstalled(message.domain, message.application)

		if (applicationIsInstalled) {
			this.sendConnectionReadyMessage(message)
		}
	}

	private sendConnectionReadyMessage(
		message: ILocalAPIRequest
	) {
		const connectionIsReadyMessage: ILocalAPIResponse = {
			application: message.application,
			args: message.args,
			category: 'ConnectionIsReady',
			domain: message.domain,
			errorMessage: null,
			id: message.id,
			hostDomain: message.hostDomain,
			hostProtocol: message.hostProtocol,
			methodName: message.methodName,
			objectName: message.objectName,
			protocol: window.location.protocol,
			payload: null,
			transactionId: message.transactionId
		};

		if (this.webMessageReceiver.needMessageSerialization()) {
			// FIXME: serialize message
		}
		this.webMessageReceiver.sendMessageToClient(connectionIsReadyMessage)
	}

	private hasValidApplicationInfo(
		message: (IIsolateMessage & IApiIMI) | ILocalAPIRequest | ILocalAPIResponse
	) {
		return typeof message.domain === 'string' && message.domain.length >= 3
			&& typeof message.application === 'string' && message.application.length >= 3
	}

	private async handleFromClientRequest(
		message: ILocalAPIRequest,
	): Promise<void> {
		const webReciever = this.terminalStore.getWebReceiver()

		let numPendingMessagesFromHost = webReciever.pendingHostCounts.get(message.domain)
		if (!numPendingMessagesFromHost) {
			numPendingMessagesFromHost = 0
		}
		if (numPendingMessagesFromHost > 4) {
			// Prevent hosts from making local 'Denial of Service' attacks
			return
		}

		const fullDbApplication_Name = this.dbApplicationUtils.
			getDbApplication_FullNameFromDomainAndName(
				message.domain, message.application)

		let numPendingMessagesForApplication = webReciever.pendingApplicationCounts.get(fullDbApplication_Name)
		if (!numPendingMessagesForApplication) {
			numPendingMessagesForApplication = 0
		}
		if (numPendingMessagesForApplication === -1) {
			// Already could not install the application, may be a DOS attack, return right away
			return
		}

		webReciever.pendingHostCounts.set(message.domain, numPendingMessagesFromHost + 1)
		webReciever.pendingApplicationCounts.set(fullDbApplication_Name, numPendingMessagesForApplication + 1)

		if (!await this.applicationInitializer.isApplicationIsInstalled(
			message.domain, fullDbApplication_Name)) {
			this.relyToClientWithError(message, `Application is not installed`)
			return
		}

		const context: IApiCallContext = {}
		const localApiRequest = message as ILocalAPIRequest<'FromClientRedirected'>
		const startDescriptor = await this.nativeStartApiCall(localApiRequest, context);
		if (!startDescriptor.isStarted) {
			this.relyToClientWithError(message, context.errorMessage)
		} else if (startDescriptor.isFramework) {
			const result = await this.callFrameworkApi(localApiRequest, context)
			await this.replyToClient(
				message,
				message.args,
				result.errorMessage,
				result.payload,
				message.protocol,
				!result.errorMessage,
				null
			)
		}
	}

	private relyToClientWithError(
		message: ILocalAPIRequest,
		errorMessage: string
	) {
		const toClientRedirectedMessage: ILocalAPIResponse = {
			__received__: false,
			__receivedTime__: null,
			application: message.application,
			args: message.args,
			category: 'ToClientRedirected',
			domain: message.domain,
			errorMessage,
			id: message.id,
			hostDomain: message.hostDomain,
			hostProtocol: message.hostProtocol,
			methodName: message.methodName,
			objectName: message.objectName,
			payload: null,
			protocol: message.protocol,
			transactionId: message.transactionId
		}

		this.replyToClientRequest(toClientRedirectedMessage)
	}

	private getFrameWindow(
		fullDbApplication_Name: string
	) {
		const iframe: HTMLIFrameElement = document
			.getElementsByName(fullDbApplication_Name) as any
		if (!iframe || !iframe[0]) {
			return null
		}
		return iframe[0].contentWindow
	}

	private replyToClientRequest(
		message: ILocalAPIResponse
	) {
		const fullDbApplication_Name = this.dbApplicationUtils.
			getDbApplication_FullNameFromDomainAndName(
				message.domain, message.application)
		const webReciever = this.terminalStore.getWebReceiver()

		let numMessagesFromHost = webReciever.pendingHostCounts.get(message.domain)
		if (numMessagesFromHost > 0) {
			webReciever.pendingHostCounts.set(message.domain, numMessagesFromHost - 1)
		}
		let numMessagesForApplication = webReciever.pendingApplicationCounts.get(fullDbApplication_Name)
		if (numMessagesForApplication > 0) {
			webReciever.pendingApplicationCounts.set(message.domain, numMessagesForApplication - 1)
		}

		// Forward the request to the source client
		if (this.webMessageReceiver.needMessageSerialization()) {
			// FIXME: serialize message
		}
		this.webMessageReceiver.sendMessageToClient(message)
	}

	private async messageIsFromValidApp(
		message: IIsolateMessage | ILocalAPIResponse,
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
				message.domain, message.application)
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

		// Make sure the application is installed
		return !!this.terminalStore.getApplicationInitializer()
			.applicationWindowMap.get(fullDbApplication_Name)
	}

	private async handleIsolateMessage(
		message: IIsolateMessage & IApiIMI,
		messageOrigin: string,
		source: Window
	): Promise<void> {
		if (!await this.messageIsFromValidApp(message, messageOrigin)) {
			return
		}

		const webReciever = this.terminalStore.getWebReceiver()

		const fullDbApplication_Name = this.dbApplicationUtils.
			getDbApplication_FullNameFromDomainAndName(
				message.domain, message.application)
		switch (message.type) {
			case IsolateMessageType.SEARCH_UNSUBSCRIBE:
				let isolateSubscriptionMap = webReciever.subsriptionMap.get(fullDbApplication_Name)
				if (!isolateSubscriptionMap) {
					return
				}
				let subscription = isolateSubscriptionMap.get(message.id)
				if (!subscription) {
					return
				}
				subscription.unsubscribe()
				isolateSubscriptionMap.delete(message.id)
				return;
		}
		let response
		if (message.type === IsolateMessageType.CALL_API) {
			response = await this.nativeHandleApiCall(message as any as ILocalAPIRequestIMI, {
				startedAt: new Date()
			})
		} else {
			response = await this.processMessage(message)
		}
		if (!response) {
			return
		}

		let shemaDomain_Name = fullDbApplication_Name + '.' + webReciever.localDomain
		switch (message.type) {
			case IsolateMessageType.SEARCH:
			case IsolateMessageType.SEARCH_ONE:
				const observableDataResult = <IObservableDataIMO<any>>response
				observableDataResult.result.pipe(
					map(value => {
						window.postMessage(value, shemaDomain_Name)
					})
				)
				const subscription = observableDataResult.result.subscribe()
				let isolateSubscriptionMap = webReciever.subsriptionMap.get(fullDbApplication_Name)
				if (!isolateSubscriptionMap) {
					isolateSubscriptionMap = new Map()
					webReciever.subsriptionMap.set(fullDbApplication_Name, isolateSubscriptionMap)
				}
				isolateSubscriptionMap.set(message.id, subscription)
				return
		}
		source.postMessage(response, '*')
	}
}
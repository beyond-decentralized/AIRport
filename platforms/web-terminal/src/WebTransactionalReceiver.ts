import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	ILocalAPIRequest,
	ILocalAPIResponse
} from '@airport/aviation-communication'
import {
	IApiIMI,
	IIsolateMessage,
	ILocalAPIRequestIMI,
	ILocalAPIServer,
	IObservableDataIMO,
	IsolateMessageType,
} from '@airport/apron'
import {
	TransactionalReceiver
} from '@airport/terminal'
import {
	ITransactionalReceiver,
	IApiCallContext,
	ITransactionContext,
	ITerminalStore
} from '@airport/terminal-map'
import {
	map
} from 'rxjs/operators'
import { IWebApplicationInitializer } from './WebApplicationInitializer'
import { IWebMessageReceiver } from './WebMessageReceiver'
import { IDbApplicationUtils } from '@airport/ground-control'
import { IApplication } from '@airport/airspace'

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
	webMessageReciever: IWebMessageReceiver

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

		if (message.__received__) {
			return
		}
		message.__received__ = true

		// All requests need to have a application signature
		// to know what application is being communicated to/from
		if (!this.hasValidApplicationInfo(message)) {
			return
		}

		if (this.webMessageReciever.needMessageSerialization()) {
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
					} else {
						const toClientRedirectedMessage: ILocalAPIResponse = {
							...message,
							__received__: false,
							__receivedTime__: null,
							application: message.application,
							args: message.args,
							category: 'ToClientRedirected',
							domain: message.domain,
							errorMessage: message.errorMessage,
							methodName: (message as ILocalAPIResponse).methodName,
							objectName: (message as ILocalAPIResponse).objectName,
							payload: message.payload,
							protocol: message.protocol,
							transactionId: (message as ILocalAPIResponse).transactionId
						}
						if (!success) {
							toClientRedirectedMessage.errorMessage = context.errorMessage
							toClientRedirectedMessage.payload = null
						}
						this.handleToClientRequest(toClientRedirectedMessage, messageOrigin)
							.then()
					}
				})
				break
			default:
				break
		}
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
		return await this.startApiCall(message, context, async () => {
			const fullApplication_Name = this.dbApplicationUtils.
				getFullApplication_NameFromDomainAndName(
					message.domain, message.application)
			const frameWindow = this.getFrameWindow(fullApplication_Name)
			if (frameWindow) {
				// Forward the request to the correct application iframe
				frameWindow.postMessage(message, '*')
			} else {
				throw new Error(`No Application IFrame found for: ${fullApplication_Name}`)
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
			try {
				const fullApplication_Name = this.dbApplicationUtils
					.getFullApplication_NameFromDomainAndName(
						message.domain, message.application)
				const application: IApplication = this.terminalStore
					.getApplicationMapByFullName().get(fullApplication_Name)
				if (!application) {
					throw new Error(`Could not find AIRport Framework Application: ${fullApplication_Name}`)
				}
				payload = await this.localApiServer.coreHandleRequest(message,
					application.currentVersion[0].applicationVersion.jsonApplication.versions[0].api, context)
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
					transactionId: message.transactionId
				}, errorMessage, context);
				} catch (e) {
					errorMessage = e.message ? e.message : e
					console.error(e)
				}
			}

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

	private async ensureConnectionIsReady(
		message: ILocalAPIRequest
	): Promise<void> {
		const fullApplication_Name = this.dbApplicationUtils.
			getFullApplication_NameFromDomainAndName(
				message.domain, message.application)

		const applicationInitializing = this.terminalStore.getApplicationInitializer()
			.initializingApplicationMap.get(fullApplication_Name)
		if (applicationInitializing) {
			return
		}

		const applicationWindow = this.terminalStore.getApplicationInitializer()
			.applicationWindowMap.get(fullApplication_Name)

		if (!applicationWindow) {
			this.terminalStore.getApplicationInitializer()
				.initializingApplicationMap.set(fullApplication_Name, true)
			await this.applicationInitializer.nativeInitializeApplication(message.domain,
				message.application, fullApplication_Name)
		}

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

		if (this.webMessageReciever.needMessageSerialization()) {
			// FIXME: serialize message
		}
		this.webMessageReciever.sendMessageToClient(connectionIsReadyMessage)
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

		const fullApplication_Name = this.dbApplicationUtils.
			getFullApplication_NameFromDomainAndName(
				message.domain, message.application)

		let numPendingMessagesForApplication = webReciever.pendingApplicationCounts.get(fullApplication_Name)
		if (!numPendingMessagesForApplication) {
			numPendingMessagesForApplication = 0
		}
		if (numPendingMessagesForApplication === -1) {
			// Already could not install the application, may be a DOS attack, return right away
			return
		}

		webReciever.pendingHostCounts.set(message.domain, numPendingMessagesFromHost + 1)
		webReciever.pendingApplicationCounts.set(fullApplication_Name, numPendingMessagesForApplication + 1)

		if (!await this.ensureApplicationIsInstalled(fullApplication_Name)) {
			this.relyToClientWithError(message, `Application is not installed`)
			return
		}

		const context: IApiCallContext = {}
		if (!await this.nativeStartApiCall(message as ILocalAPIRequest<'FromClientRedirected'>,
			context)) {
			this.relyToClientWithError(message, context.errorMessage)
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
		fullApplication_Name: string
	) {
		const iframe: HTMLIFrameElement = document
			.getElementsByName(fullApplication_Name) as any
		if (!iframe || !iframe[0]) {
			return null
		}
		return iframe[0].contentWindow
	}

	private async handleToClientRequest(
		message: ILocalAPIResponse,
		messageOrigin: string
	): Promise<void> {
		if (!await this.messageIsFromValidApp(message, messageOrigin)) {
			return
		}
		this.replyToClientRequest(message)
	}

	private replyToClientRequest(
		message: ILocalAPIResponse
	) {
		const fullApplication_Name = this.dbApplicationUtils.
			getFullApplication_NameFromDomainAndName(
				message.domain, message.application)
		const webReciever = this.terminalStore.getWebReceiver()

		let numMessagesFromHost = webReciever.pendingHostCounts.get(message.domain)
		if (numMessagesFromHost > 0) {
			webReciever.pendingHostCounts.set(message.domain, numMessagesFromHost - 1)
		}
		let numMessagesForApplication = webReciever.pendingApplicationCounts.get(fullApplication_Name)
		if (numMessagesForApplication > 0) {
			webReciever.pendingApplicationCounts.set(message.domain, numMessagesForApplication - 1)
		}

		// Forward the request to the source client
		if (this.webMessageReciever.needMessageSerialization()) {
			// FIXME: serialize message
		}
		this.webMessageReciever.sendMessageToClient(message)
	}

	private async ensureApplicationIsInstalled(
		fullApplication_Name: string
	): Promise<boolean> {
		if (!fullApplication_Name) {
			return false
		}

		return !!this.terminalStore.getApplicationInitializer()
			.applicationWindowMap.get(fullApplication_Name)
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

		const fullApplication_Name = this.dbApplicationUtils.
			getFullApplication_NameFromDomainAndName(
				message.domain, message.application)
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

		// Make sure the application is installed
		return !!this.terminalStore.getApplicationInitializer()
			.applicationWindowMap.get(fullApplication_Name)
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

		const fullApplication_Name = this.dbApplicationUtils.
			getFullApplication_NameFromDomainAndName(
				message.domain, message.application)
		switch (message.type) {
			case IsolateMessageType.SEARCH_UNSUBSCRIBE:
				let isolateSubscriptionMap = webReciever.subsriptionMap.get(fullApplication_Name)
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

		let shemaDomain_Name = fullApplication_Name + '.' + webReciever.localDomain
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
				let isolateSubscriptionMap = webReciever.subsriptionMap.get(fullApplication_Name)
				if (!isolateSubscriptionMap) {
					isolateSubscriptionMap = new Map()
					webReciever.subsriptionMap.set(fullApplication_Name, isolateSubscriptionMap)
				}
				isolateSubscriptionMap.set(message.id, subscription)
				return
		}
		source.postMessage(response, '*')
	}
}
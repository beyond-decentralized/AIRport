import {
	ILocalAPIRequest,
	ILocalAPIResponse
} from '@airport/aviation-communication'
import {
	container,
	DEPENDENCY_INJECTION,
} from '@airport/direction-indicator'
import { getFullApplicationNameFromDomainAndName } from '@airport/ground-control'
import {
	IApiIMI,
	IIsolateMessage,
	IObservableDataIMO,
	IsolateMessageType,
} from '@airport/security-check'
import {
	TransactionalReceiver
} from '@airport/terminal'
import {
	TRANSACTIONAL_RECEIVER,
	ITransactionalReceiver,
	APPLICATION_INITIALIZER,
	IApiCallContext,
	ITransactionContext,
	TERMINAL_STORE
} from '@airport/terminal-map'
import {
	map
} from 'rxjs/operators'
import { WEB_MESSAGE_RECEIVER } from './tokens'
import { IWebApplicationInitializer } from './WebApplicationInitializer'

export class WebTransactionalReceiver
	extends TransactionalReceiver
	implements ITransactionalReceiver {

	constructor() {
		super()
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

		const terminalStore = container(this).getSync(TERMINAL_STORE)
		const webReciever = terminalStore.getWebReceiver()
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

		const webMessageReciever = container(this).getSync(WEB_MESSAGE_RECEIVER)
		if (webMessageReciever.needMessageSerialization()) {
			// FIXME: deserialize message
		}

		const terminalStore = container(this).getSync(TERMINAL_STORE)
		const webReciever = terminalStore.getWebReceiver()

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

		const terminalStore = container(this).getSync(TERMINAL_STORE)
		const webReciever = terminalStore.getWebReceiver()

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
				}, message.errorMessage, context).then((success) => {
					if (interAppApiCallRequest) {
						if (!success) {
							interAppApiCallRequest.reject(message.errorMessage)
						} else if (message.errorMessage) {
							interAppApiCallRequest.reject(message.errorMessage)
						} else {
							interAppApiCallRequest.resolve(message.payload)
						}
					} else {
						const toClientRedirectedMessage: ILocalAPIResponse = {
							...message,
							__received__: false,
							__receivedTime__: null,
							application: message.application,
							category: 'ToClientRedirected',
							domain: message.domain,
							errorMessage: null,
							methodName: (message as ILocalAPIResponse).methodName,
							objectName: (message as ILocalAPIResponse).objectName,
							payload: null,
							protocol: null,
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
		const terminalStore = container(this).getSync(TERMINAL_STORE)
		const webReciever = terminalStore.getWebReceiver()
		webReciever.onClientMessageCallback = callback
	}

	protected async nativeStartApiCall(
		message: ILocalAPIRequest<'FromClientRedirected'>,
		context: IApiCallContext & ITransactionContext
	): Promise<boolean> {
		return await this.startApiCall(message, context, async () => {
			const fullApplicationName = getFullApplicationNameFromDomainAndName(
				message.domain, message.application)
			const frameWindow = this.getFrameWindow(fullApplicationName)
			if (frameWindow) {
				// Forward the request to the correct application iframe
				frameWindow.postMessage(message, '*')
			} else {
				throw new Error(`No Application IFrame found for: ${fullApplicationName}`)
			}
		})
	}

	protected async nativeHandleApiCall<Result>(
		message: ILocalAPIRequest<'FromClientRedirected'>,
		context: IApiCallContext & ITransactionContext
	): Promise<Result> {
		if (!await this.nativeStartApiCall(message, context)) {
			throw new Error(context.errorMessage)
		}

		const terminalStore = container(this).getSync(TERMINAL_STORE)
		const webReciever = terminalStore.getWebReceiver()

		return new Promise((resolve, reject) => {
			webReciever.pendingInterAppApiCallMessageMap.set(message.id, {
				message,
				reject,
				resolve
			})
		})
	}

	private async ensureConnectionIsReady(
		message: ILocalAPIRequest
	): Promise<void> {
		const fullApplicationName = getFullApplicationNameFromDomainAndName(
			message.domain, message.application)

		const webApplicationInitializer: IWebApplicationInitializer = await container(this)
			.get(APPLICATION_INITIALIZER) as IWebApplicationInitializer

		const applicationInitializing = webApplicationInitializer.initializingApplicationMap.get(fullApplicationName)
		if (applicationInitializing) {
			return
		}

		const applicationWindow = webApplicationInitializer.applicationWindowMap.get(fullApplicationName)

		if (!applicationWindow) {
			webApplicationInitializer.initializingApplicationMap.set(fullApplicationName, true)
			await webApplicationInitializer.nativeInitializeApplication(message.domain,
				message.application, fullApplicationName)
		}

		const connectionIsReadyMessage: ILocalAPIResponse = {
			application: message.application,
			category: 'ConnectionIsReady',
			domain: message.domain,
			errorMessage: null,
			id: message.id,
			methodName: message.methodName,
			objectName: message.objectName,
			protocol: window.location.protocol,
			payload: null,
		};

		const webMessageReciever = await container(this).get(WEB_MESSAGE_RECEIVER)
		if (webMessageReciever.needMessageSerialization()) {
			// FIXME: serialize message
		}
		webMessageReciever.sendMessageToClient(connectionIsReadyMessage)
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
		const terminalStore = container(this).getSync(TERMINAL_STORE)
		const webReciever = terminalStore.getWebReceiver()

		let numPendingMessagesFromHost = webReciever.pendingHostCounts.get(message.domain)
		if (!numPendingMessagesFromHost) {
			numPendingMessagesFromHost = 0
		}
		if (numPendingMessagesFromHost > 4) {
			// Prevent hosts from making local 'Denial of Service' attacks
			return
		}

		const fullApplicationName = getFullApplicationNameFromDomainAndName(
			message.domain, message.application)

		let numPendingMessagesForApplication = webReciever.pendingApplicationCounts.get(fullApplicationName)
		if (!numPendingMessagesForApplication) {
			numPendingMessagesForApplication = 0
		}
		if (numPendingMessagesForApplication === -1) {
			// Already could not install the application, may be a DOS attack, return right away
			return
		}

		webReciever.pendingHostCounts.set(message.domain, numPendingMessagesFromHost + 1)
		webReciever.pendingApplicationCounts.set(fullApplicationName, numPendingMessagesForApplication + 1)

		if (!await this.ensureApplicationIsInstalled(fullApplicationName)) {
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
			category: 'ToClientRedirected',
			domain: message.domain,
			errorMessage,
			id: message.id,
			methodName: message.methodName,
			objectName: message.objectName,
			payload: null,
			protocol: message.protocol,
		}

		this.replyToClientRequest(toClientRedirectedMessage)
	}

	private getFrameWindow(
		fullApplicationName: string
	) {
		const iframe: HTMLIFrameElement = document
			.getElementsByName(fullApplicationName) as any
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
		const fullApplicationName = getFullApplicationNameFromDomainAndName(
			message.domain, message.application)
		const terminalStore = container(this).getSync(TERMINAL_STORE)
		const webReciever = terminalStore.getWebReceiver()

		let numMessagesFromHost = webReciever.pendingHostCounts.get(message.domain)
		if (numMessagesFromHost > 0) {
			webReciever.pendingHostCounts.set(message.domain, numMessagesFromHost - 1)
		}
		let numMessagesForApplication = webReciever.pendingApplicationCounts.get(fullApplicationName)
		if (numMessagesForApplication > 0) {
			webReciever.pendingApplicationCounts.set(message.domain, numMessagesForApplication - 1)
		}

		// Forward the request to the source client
		const webMessageReciever = container(this).getSync(WEB_MESSAGE_RECEIVER)
		if (webMessageReciever.needMessageSerialization()) {
			// FIXME: serialize message
		}
		webMessageReciever.sendMessageToClient(message)
	}

	private async ensureApplicationIsInstalled(
		fullApplicationName: string
	): Promise<boolean> {
		if (!fullApplicationName) {
			return false
		}

		const webApplicationInitializer: IWebApplicationInitializer = await container(this)
			.get(APPLICATION_INITIALIZER) as IWebApplicationInitializer

		return !!webApplicationInitializer.applicationWindowMap.get(fullApplicationName)
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

		const terminalStore = container(this).getSync(TERMINAL_STORE)
		const webReciever = terminalStore.getWebReceiver()

		const fullApplicationName = getFullApplicationNameFromDomainAndName(
			message.domain, message.application)
		// Only accept requests from https protocol
		if (!messageOrigin.startsWith("https")
			// and from application domains that match the fullApplicationName
			|| applicationDomain !== fullApplicationName + webReciever.domainPrefix) {
			return false
		}
		// Only accept requests from '${applicationName}.${mainDomainName}'
		if (applicationDomainFragments.length !== webReciever.mainDomainFragments.length + 1) {
			return false
		}
		// Only accept requests from non-'www' domain (don't accept requests from self)
		if (applicationDomainFragments[0] === 'www') {
			return false
		}
		const applicationDomainFirstFragment = applicationDomainFragments[0]
		// check application domain-embedded signature and fullApplicationName in message
		// and make sure they result in a match
		if (applicationDomainFirstFragment !== fullApplicationName) {
			return false
		}

		// Make sure the application is installed
		const webApplicationInitializer: IWebApplicationInitializer = await container(this)
			.get(APPLICATION_INITIALIZER) as IWebApplicationInitializer

		return !!webApplicationInitializer.applicationWindowMap.get(fullApplicationName)
	}

	private async handleIsolateMessage(
		message: IIsolateMessage & IApiIMI,
		messageOrigin: string,
		source: Window
	): Promise<void> {
		if (!await this.messageIsFromValidApp(message, messageOrigin)) {
			return
		}

		const terminalStore = container(this).getSync(TERMINAL_STORE)
		const webReciever = terminalStore.getWebReceiver()

		const fullApplicationName = getFullApplicationNameFromDomainAndName(
			message.domain, message.application)
		switch (message.type) {
			case IsolateMessageType.SEARCH_UNSUBSCRIBE:
				let isolateSubscriptionMap = webReciever.subsriptionMap.get(fullApplicationName)
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

		this.processMessage(message).then(response => {
			if (!response) {
				return
			}

			const terminalStore = container(this).getSync(TERMINAL_STORE)
			const webReciever = terminalStore.getWebReceiver()

			let shemaDomainName = fullApplicationName + '.' + webReciever.localDomain
			switch (message.type) {
				case IsolateMessageType.SEARCH:
				case IsolateMessageType.SEARCH_ONE:
					const observableDataResult = <IObservableDataIMO<any>>response
					observableDataResult.result.pipe(
						map(value => {
							window.postMessage(value, shemaDomainName)
						})
					)
					const subscription = observableDataResult.result.subscribe()
					let isolateSubscriptionMap = webReciever.subsriptionMap.get(fullApplicationName)
					if (!isolateSubscriptionMap) {
						isolateSubscriptionMap = new Map()
						webReciever.subsriptionMap.set(fullApplicationName, isolateSubscriptionMap)
					}
					isolateSubscriptionMap.set(message.id, subscription)
					return
			}
			source.postMessage(response, '*')
		})
	}

}
DEPENDENCY_INJECTION.set(TRANSACTIONAL_RECEIVER, WebTransactionalReceiver);

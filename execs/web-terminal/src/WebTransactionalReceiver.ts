import {
	ILocalAPIRequest,
	ILocalAPIResponse
} from '@airport/aviation-communication'
import {
	container,
	DI,
} from '@airport/di'
import { getFullApplicationNameFromDomainAndName } from '@airport/ground-control'
import {
	IIsolateMessage,
	IObservableDataIMO,
	IsolateMessageType,
} from '@airport/security-check'
import {
	injectTransactionalConnector,
	injectTransactionalServer,
	TransactionalReceiver
} from '@airport/terminal'
import {
	TRANSACTIONAL_RECEIVER,
	ITransactionalReceiver,
	APPLICATION_INITIALIZER
} from '@airport/terminal-map'
import {
	injectAirportDatabase,
	injectEntityStateManager
} from '@airport/tower'
import {
	BroadcastChannel as SoftBroadcastChannel
} from 'broadcast-channel';
import {
	Subscription
} from 'rxjs'
import {
	map
} from 'rxjs/operators'
import { IWebApplicationInitializer } from './WebApplicationInitializer'

let _mainDomain = 'localhost:31717'

export class WebTransactionalReceiver
	extends TransactionalReceiver
	implements ITransactionalReceiver {

	communicationChannel: SoftBroadcastChannel
	dbName: string
	domainPrefix: string
	isNativeBroadcastChannel: boolean
	mainDomainFragments: string[]
	serverUrl: string;
	subsriptionMap: Map<string, Map<number, Subscription>> = new Map()

	pendingHostCounts: Map<string, number> = new Map()
	pendingApplicationCounts: Map<string, number> = new Map()

	installedApplicationFrames: Set<string> = new Set()

	messageCallback: (
		message: any
	) => void

	constructor() {
		super()
		const ownDomain = window.location.hostname
		this.mainDomainFragments = ownDomain.split('.')
		if (this.mainDomainFragments[0] === 'www') {
			this.mainDomainFragments.splice(0, 1)
		}
		this.domainPrefix = '.' + this.mainDomainFragments.join('.')

		this.installedApplicationFrames.add("featureDemo")

		// set domain to a random value so that an iframe cannot directly invoke logic in this domain
		if (document.domain !== 'localhost') {
			document.domain = Math.random() + '.' + Math.random() + this.domainPrefix
		}

		this.isNativeBroadcastChannel = typeof BroadcastChannel === 'function'
		const createChannel = () => {
			this.communicationChannel = new SoftBroadcastChannel('clientCommunication', {
				idb: {
					onclose: () => {
						// the onclose event is just the IndexedDB closing.
						// you should also close the channel before creating
						// a new one.
						this.communicationChannel.close();
						createChannel();
					},
				},
			});

			this.communicationChannel.onmessage = (
				message: ILocalAPIRequest
			) => {
				// FIXME: deserialize message if !this.isNativeBroadcastChannel

				if (message.__received__) {
					return
				}
				message.__received__ = true

				if (this.messageCallback) {
					const receivedDate = new Date()
					message.__receivedTime__ = receivedDate.getTime()
					this.messageCallback(message)
				}

				// All requests need to have a application signature
				// to know what application is being communicated to/from
				if (!this.hasValidApplicationInfo(message)) {
					return
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
			};
		}

		window.addEventListener("message", event => {
			const message: IIsolateMessage | ILocalAPIResponse = event.data
			if (message.__received__) {
				return
			}
			message.__received__ = true

			if (this.messageCallback) {
				const receivedDate = new Date()
				message.__receivedTime__ = receivedDate.getTime()
				this.messageCallback(message)
			}

			// All requests need to have a application signature
			// to know what application is being communicated to/from
			if (!this.hasValidApplicationInfo(message)) {
				return
			}

			const messageOrigin = event.origin;
			switch (message.category) {
				case 'ToDb':
					this.handleIsolateMessage(message as IIsolateMessage, messageOrigin,
						event.source as Window)
					break
				case 'ToClient':
					const toClientRedirectedMessage: ILocalAPIResponse = {
						...message,
						__received__: false,
						__receivedTime__: null,
						category: 'ToClientRedirected'
					}
					this.handleToClientRequest(toClientRedirectedMessage, messageOrigin)
					break
				default:
					break
			}
		}, false)
	}

	onMessage(callback: (
		message: any
	) => void) {
		this.messageCallback = callback
	}

	private async ensureConnectionIsReady(
		message: ILocalAPIRequest
	): Promise<void> {
		const fullApplicationName = getFullApplicationNameFromDomainAndName(
			message.domain, message.application)

		const webApplicationInitializer: IWebApplicationInitializer = await container(this)
			.get(APPLICATION_INITIALIZER) as IWebApplicationInitializer

		const applicationWindow = webApplicationInitializer.applicationWindowMap.get(fullApplicationName)
		if (!applicationWindow) {
			await webApplicationInitializer.nativeInitializeApplication(message.domain,
				message.application, fullApplicationName)
		}

		const connectionIsReadyMessage: ILocalAPIResponse = {
			application: message.application,
			category: 'ConnectionIsReady',
			domain: message.domain,
			errorMessage: null,
			id: message.id,
			protocol: window.location.protocol,
			payload: null,
		};
		// FIXME: serialize message if !this.isNativeBroadcastChannel
		this.communicationChannel.postMessage(connectionIsReadyMessage)
	}

	private hasValidApplicationInfo(
		message: IIsolateMessage | ILocalAPIRequest | ILocalAPIResponse
	) {
		return typeof message.domain === 'string' && message.domain.length >= 3
			&& typeof message.application === 'string' && message.application.length >= 3
	}

	private async handleFromClientRequest(
		message: ILocalAPIRequest,
	): Promise<void> {

		let numPendingMessagesFromHost = this.pendingHostCounts.get(message.domain)
		if (!numPendingMessagesFromHost) {
			numPendingMessagesFromHost = 0
		}
		if (numPendingMessagesFromHost > 4) {
			// Prevent hosts from making local 'Denial of Service' attacks
			return
		}

		const fullApplicationName = getFullApplicationNameFromDomainAndName(
			message.domain, message.application)

		let numPendingMessagesForApplication = this.pendingApplicationCounts.get(fullApplicationName)
		if (!numPendingMessagesForApplication) {
			numPendingMessagesForApplication = 0
		}
		if (numPendingMessagesForApplication === -1) {
			// Already could not install the application, may be a DOS attack, return right away
			return
		}

		this.pendingHostCounts.set(message.domain, numPendingMessagesFromHost + 1)
		this.pendingApplicationCounts.set(fullApplicationName, numPendingMessagesForApplication + 1)

		if (!await this.ensureApplicationIsInstalled(fullApplicationName, numPendingMessagesForApplication)) {
			this.pendingApplicationCounts.set(fullApplicationName, -1)
			return
		}

		const frameWindow = this.getFrameWindow(fullApplicationName)

		if (frameWindow) {
			// Forward the request to the correct application iframe
			frameWindow.postMessage(message, '*')
		} else {
			throw new Error(`No Application IFrame found for: ${fullApplicationName}`)
		}
	}

	private getFrameWindow(
		fullApplicationName: string
	) {
		const iframe: HTMLIFrameElement = document
			.getElementsByName(fullApplicationName) as any
		if (!iframe) {
			return null
		}
		return iframe.contentWindow
	}

	private async handleToClientRequest(
		message: ILocalAPIResponse,
		messageOrigin: string
	): Promise<void> {
		if (!this.messageIsFromValidApp(message, messageOrigin)) {
			return
		}

		const fullApplicationName = getFullApplicationNameFromDomainAndName(
			message.domain, message.application)

		let numMessagesFromHost = this.pendingHostCounts.get(message.domain)
		if (numMessagesFromHost > 0) {
			this.pendingHostCounts.set(message.domain, numMessagesFromHost - 1)
		}
		let numMessagesForApplication = this.pendingApplicationCounts.get(fullApplicationName)
		if (numMessagesForApplication > 0) {
			this.pendingHostCounts.set(message.domain, numMessagesForApplication - 1)
		}

		// Forward the request to the source client
		// FIXME: serialize message if !this.isNativeBroadcastChannel
		this.communicationChannel.postMessage(message)
	}

	private async ensureApplicationIsInstalled(
		fullApplicationName: string,
		numPendingMessagesForApplication: number
	): Promise<boolean> {
		if (!fullApplicationName) {
			return false
		}
		if (this.installedApplicationFrames.has(fullApplicationName)) {
			return true
		}

		// TODO: ensure that the application is installed
		if (numPendingMessagesForApplication == 0) {

		} else {
			// TODO: wait for application initialization
		}

		return true
	}

	private messageIsFromValidApp(
		message: IIsolateMessage | ILocalAPIResponse,
		messageOrigin: string
	): boolean {
		const applicationDomain = messageOrigin.split('//')[1]
		const applicationDomainFragments = applicationDomain.split('.')

		// Allow local debugging
		if (applicationDomain.split(':')[0] === 'localhost') {
			return true
		}

		const fullApplicationName = getFullApplicationNameFromDomainAndName(
			message.domain, message.application)
		// Only accept requests from https protocol
		if (!messageOrigin.startsWith("https")
			// and from application domains that match the fullApplicationName
			|| applicationDomain !== fullApplicationName + this.domainPrefix) {
			return false
		}
		// Only accept requests from '${applicationName}.${mainDomainName}'
		if (applicationDomainFragments.length !== this.mainDomainFragments.length + 1) {
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
		return this.installedApplicationFrames.has(applicationDomainFirstFragment)
	}

	private handleIsolateMessage(
		message: IIsolateMessage,
		messageOrigin: string,
		source: Window
	): void {
		if (!this.messageIsFromValidApp(message, messageOrigin)) {
			return
		}
		const fullApplicationName = getFullApplicationNameFromDomainAndName(
			message.domain, message.application)
		switch (message.type) {
			case IsolateMessageType.SEARCH_UNSUBSCRIBE:
				let isolateSubscriptionMap = this.subsriptionMap.get(fullApplicationName)
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
			let shemaDomainName = fullApplicationName + '.' + _mainDomain
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
					let isolateSubscriptionMap = this.subsriptionMap.get(fullApplicationName)
					if (!isolateSubscriptionMap) {
						isolateSubscriptionMap = new Map()
						this.subsriptionMap.set(fullApplicationName, isolateSubscriptionMap)
					}
					isolateSubscriptionMap.set(message.id, subscription)
					return
			}
			source.postMessage(response, '*')
		})
	}

}

DI.set(TRANSACTIONAL_RECEIVER, WebTransactionalReceiver);

export function injectTransactionalReceiver(): void {
	console.log('Injecting TransactionalReceiver')
	// injectMovingWalkway()
	injectTransactionalConnector()
	injectAirportDatabase()
	injectTransactionalServer()
	injectEntityStateManager()
}

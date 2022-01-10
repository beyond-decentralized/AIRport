import {
	ILocalAPIRequest,
	ILocalAPIResponse
} from '@airport/aviation-communication'
import {
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
	ITransactionalReceiver
} from '@airport/terminal-map'
import {
	injectAirportDatabase,
	injectEntityStateManager
} from '@airport/tower'
import {
	Subscription
} from 'rxjs'
import {
	map
} from 'rxjs/operators'

let _mainDomain = 'localhost:31717'

export class WebTransactionalReceiver
	extends TransactionalReceiver
	implements ITransactionalReceiver {

	dbName: string
	domainPrefix: string
	mainDomainFragments: string[]
	serverUrl: string;
	subsriptionMap: Map<string, Map<number, Subscription>> = new Map()

	pendingFromClientMessageIds: Map<string, Map<string, Map<string, Window>>> = new Map()
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

		window.addEventListener("message", event => {
			const message: IIsolateMessage | ILocalAPIRequest | ILocalAPIResponse = event.data
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
				case 'FromClient':
					const fromClientRedirectedMessage: ILocalAPIRequest = {
						...message,
						__received__: false,
						__receivedTime__: null,
						category: 'FromClientRedirected'
					}
					this.handleFromClientRequest(fromClientRedirectedMessage, messageOrigin, (event.source as Window)).then()
					break
				case 'IsConnectionReady':
					const connectionIsReadyMessage: ILocalAPIResponse = {
						application: (message as ILocalAPIRequest).application,
						category: 'ConnectionIsReady',
						domain: (message as ILocalAPIRequest).domain,
						errorMessage: null,
						id: (message as ILocalAPIRequest).id,
						host: document.domain,
						protocol: window.location.protocol,
						payload: null,
					};
					(event.source as Window).postMessage(connectionIsReadyMessage, messageOrigin)
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

	private hasValidApplicationInfo(
		message: IIsolateMessage | ILocalAPIRequest | ILocalAPIResponse
	) {
		return typeof message.domain === 'string' && message.domain.length >= 3
			&& typeof message.application === 'string' && message.application.length >= 3
	}

	private async handleFromClientRequest(
		message: ILocalAPIRequest,
		messageOrigin: string,
		sourceWindow: Window
	): Promise<void> {
		const appDomainAndPort = messageOrigin.split('//')[1]
		if (message.host !== appDomainAndPort) {
			return
		}

		let numPendingMessagesFromHost = this.pendingHostCounts.get(message.host)
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

		this.pendingHostCounts.set(message.host, numPendingMessagesFromHost + 1)
		this.pendingApplicationCounts.set(fullApplicationName, numPendingMessagesForApplication + 1)

		if (!await this.ensureApplicationIsInstalled(fullApplicationName, numPendingMessagesForApplication)) {
			this.pendingApplicationCounts.set(fullApplicationName, -1)
			return
		}

		let pendingMessageIdsFromHost = this.pendingFromClientMessageIds.get(message.host)
		if (!pendingMessageIdsFromHost) {
			pendingMessageIdsFromHost = new Map()
			this.pendingFromClientMessageIds.set(message.host, pendingMessageIdsFromHost)
		}
		let pendingMessageIdsFromHostForApplication = pendingMessageIdsFromHost.get(fullApplicationName)
		if (!pendingMessageIdsFromHostForApplication) {
			pendingMessageIdsFromHostForApplication = new Map()
			pendingMessageIdsFromHost.set(fullApplicationName, pendingMessageIdsFromHostForApplication)
		}
		pendingMessageIdsFromHostForApplication.set(message.id, sourceWindow)

		const frameWindow = this.getFrameWindow(fullApplicationName)

		if (frameWindow) {
			// Forward the request to the correct application iframe
			frameWindow.postMessage(message, '*')
		} else {
			throw new Error(`No Application IFrame found for signature: ${fullApplicationName}`)
		}
	}

	private getFrameWindow(
		fullApplicationName: string
	) {
		const iframes = document.getElementsByTagName("iframe")
		for (var i = 0; i < iframes.length; i++) {
			let iframe = iframes[i]
			if (iframe.name === fullApplicationName) {
				return iframe.contentWindow
			}
		}
		return null
	}

	private async handleToClientRequest(
		message: ILocalAPIResponse,
		messageOrigin: string
	): Promise<void> {
		if (!this.messageIsFromValidApp(message, messageOrigin)) {
			return
		}
		let pendingMessagesFromHost = this.pendingFromClientMessageIds.get(message.host)
		if (!pendingMessagesFromHost) {
			return
		}

		const fullApplicationName = getFullApplicationNameFromDomainAndName(
			message.domain, message.application)
		let pendingMessagesFromHostForApplication = pendingMessagesFromHost.get(fullApplicationName)
		if (!pendingMessagesFromHostForApplication) {
			return
		}

		let sourceWindow = pendingMessagesFromHostForApplication.get(message.id)

		if (!sourceWindow) {
			return
		}

		pendingMessagesFromHostForApplication.delete(message.id)

		let numMessagesFromHost = this.pendingHostCounts.get(message.host)
		if (numMessagesFromHost > 0) {
			this.pendingHostCounts.set(message.host, numMessagesFromHost - 1)
		}
		let numMessagesForApplication = this.pendingApplicationCounts.get(fullApplicationName)
		if (numMessagesForApplication > 0) {
			this.pendingHostCounts.set(message.host, numMessagesForApplication - 1)
		}

		// Forward the request to the source client
		sourceWindow.postMessage(message, message.protocol + '//' + message.host)
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

import {
	ILocalAPIRequest,
	ILocalAPIResponse
} from '@airport/autopilot'
import {
	DI,
} from '@airport/di'
import {
	IIsolateMessage,
	IObservableDataIMO,
	IsolateMessageType,
} from '@airport/security-check'
import { TransactionalReceiver } from '@airport/terminal'
import {
	TRANSACTIONAL_RECEIVER,
	ITransactionalReceiver
} from '@airport/terminal-map'
import {
	Subscription
} from 'rxjs'
import {
	map
} from 'rxjs/operators'
import {
	injectTransactionalConnector,
	injectTransactionalServer
} from '@airport/terminal'
import {
	injectAirportDatabase,
	injectEntityStateManager
} from '@airport/tower'

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
	pendingSchemaCounts: Map<string, number> = new Map()

	installedSchemaFrames: Set<string> = new Set()

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

		this.installedSchemaFrames.add("featureDemo")

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

			// All requests need to have a schema signature
			// to know what schema is being communicated to/from
			if (!this.hasValidSchemaSignature(message)) {
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
						category: 'ConnectionIsReady',
						errorMessage: null,
						id: (message as ILocalAPIRequest).id,
						host: document.domain,
						protocol: window.location.protocol,
						payload: null,
						schemaSignature: (message as ILocalAPIRequest).schemaSignature
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

	private hasValidSchemaSignature(
		message: IIsolateMessage | ILocalAPIRequest | ILocalAPIResponse
	) {
		return message.schemaSignature && message.schemaSignature.indexOf('.') === -1
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

		let numPendingMessagesForSchema = this.pendingSchemaCounts.get(message.schemaSignature)
		if (!numPendingMessagesForSchema) {
			numPendingMessagesForSchema = 0
		}
		if (numPendingMessagesForSchema === -1) {
			// Already could not install the schema, may be a DOS attack, return right away
			return
		}

		this.pendingHostCounts.set(message.host, numPendingMessagesFromHost + 1)
		this.pendingSchemaCounts.set(message.schemaSignature, numPendingMessagesForSchema + 1)

		if (!await this.ensureSchemaIsInstalled(message.schemaSignature, numPendingMessagesForSchema)) {
			this.pendingSchemaCounts.set(message.schemaSignature, -1)
			return
		}

		let pendingMessageIdsFromHost = this.pendingFromClientMessageIds.get(message.host)
		if (!pendingMessageIdsFromHost) {
			pendingMessageIdsFromHost = new Map()
			this.pendingFromClientMessageIds.set(message.host, pendingMessageIdsFromHost)
		}
		let pendingMessageIdsFromHostForSchema = pendingMessageIdsFromHost.get(message.schemaSignature)
		if (!pendingMessageIdsFromHostForSchema) {
			pendingMessageIdsFromHostForSchema = new Map()
			pendingMessageIdsFromHost.set(message.schemaSignature, pendingMessageIdsFromHostForSchema)
		}
		pendingMessageIdsFromHostForSchema.set(message.id, sourceWindow)

		const frameWindow = this.getFrameWindow(message.schemaSignature)

		if (frameWindow) {
			// Forward the request to the correct schema iframe
			frameWindow.postMessage(message, '*')
		} else {
			throw new Error(`No Application IFrame found for signature: ${message.schemaSignature}`)
		}
	}

	private getFrameWindow(
		schemaSignature: string
	) {
		const iframes = document.getElementsByTagName("iframe")
		for (var i = 0; i < iframes.length; i++) {
			let iframe = iframes[i]
			if (iframe.name === schemaSignature) {
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

		let pendingMessagesFromHostForSchema = pendingMessagesFromHost.get(message.schemaSignature)
		if (!pendingMessagesFromHostForSchema) {
			return
		}

		let sourceWindow = pendingMessagesFromHostForSchema.get(message.id)

		if (!sourceWindow) {
			return
		}

		pendingMessagesFromHostForSchema.delete(message.id)

		let numMessagesFromHost = this.pendingHostCounts.get(message.host)
		if (numMessagesFromHost > 0) {
			this.pendingHostCounts.set(message.host, numMessagesFromHost - 1)
		}
		let numMessagesForSchema = this.pendingSchemaCounts.get(message.schemaSignature)
		if (numMessagesForSchema > 0) {
			this.pendingHostCounts.set(message.host, numMessagesForSchema - 1)
		}

		// Forward the request to the source client
		sourceWindow.postMessage(message, message.protocol + '//' + message.host)
	}

	private async ensureSchemaIsInstalled(
		schemaSignature: string,
		numPendingMessagesForSchema: number
	): Promise<boolean> {
		if (!schemaSignature) {
			return false
		}
		if (this.installedSchemaFrames.has(schemaSignature)) {
			return true
		}

		// TODO: ensure that the schema is installed
		if (numPendingMessagesForSchema == 0) {

		} else {
			// TODO: wait for schema initialization
		}

		return true
	}

	private messageIsFromValidApp(
		message: IIsolateMessage | ILocalAPIResponse,
		messageOrigin: string
	): boolean {
		const schemaDomain = messageOrigin.split('//')[1]
		const schemaDomainFragments = schemaDomain.split('.')

		// Allow local debugging
		if (schemaDomain.split(':')[0] === 'localhost') {
			return true
		}

		// Only accept requests from https protocol
		if (!messageOrigin.startsWith("https")
			// and from schema domains that match the schemaSignature
			|| schemaDomain !== message.schemaSignature + this.domainPrefix) {
			return false
		}
		// Only accept requests from '${schemaName}.${mainDomainName}'
		if (schemaDomainFragments.length !== this.mainDomainFragments.length + 1) {
			return false
		}
		// Only accept requests from non-'www' domain (don't accept requests from self)
		if (schemaDomainFragments[0] === 'www') {
			return false
		}
		const schemaDomainSignature = schemaDomainFragments[0]
		// check schema domain-embedded signature and schemaSignature in message
		// and make sure they result in a match
		if (schemaDomainSignature !== message.schemaSignature) {
			return false
		}

		// Make sure the schema is installed
		return this.installedSchemaFrames.has(schemaDomainSignature)
	}

	private handleIsolateMessage(
		message: IIsolateMessage,
		messageOrigin: string,
		source: Window
	): void {
		if (!this.messageIsFromValidApp(message, messageOrigin)) {
			return
		}
		switch (message.type) {
			case IsolateMessageType.SEARCH_UNSUBSCRIBE:
				let isolateSubscriptionMap = this.subsriptionMap.get(message.schemaSignature)
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
			let shemaDomainName = message.schemaSignature + '.' + _mainDomain
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
					let isolateSubscriptionMap = this.subsriptionMap.get(message.schemaSignature)
					if (!isolateSubscriptionMap) {
						isolateSubscriptionMap = new Map()
						this.subsriptionMap.set(message.schemaSignature, isolateSubscriptionMap)
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
	injectTransactionalConnector()
	injectAirportDatabase()
	injectTransactionalServer()
	injectEntityStateManager()
}

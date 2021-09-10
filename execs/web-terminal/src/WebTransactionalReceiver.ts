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

	pendingFromAppMessageIds: Map<string, Map<string, Set<string>>> = new Map()
	pendingHostCounts: Map<string, number> = new Map()
	pendingSchemaCounts: Map<string, number> = new Map()

	installedSchemaFrames: Set<string> = new Set()

	public WebTransactionalReceiver() {
		const ownDomain = window.location.hostname
		this.mainDomainFragments = ownDomain.split('.')
		if (this.mainDomainFragments[0] === 'www') {
			this.mainDomainFragments.splice(0, 1)
		}
		this.domainPrefix = '.' + this.mainDomainFragments.join('.')

		this.installedSchemaFrames.add("featureDemo")

		// set domain to a random value so that an iframe cannot directly invoke logic in this domain
		document.domain = Math.random() + '.' + Math.random() + this.domainPrefix

		window.addEventListener("message", event => {
			const messageOrigin = event.origin;
			const message: IIsolateMessage | ILocalAPIRequest | ILocalAPIResponse = event.data
			if (message.schemaSignature.indexOf('.') > -1) {
				// Invalid schema signature - cannot have periods that would point to invalid subdomains
				return
			}
			switch (event.data.category) {
				case 'Db':
					this.handleIsolateMessage(message as IIsolateMessage, messageOrigin)
					break
				case 'FromApp':
					this.handleFromAppRequest(message as ILocalAPIRequest, messageOrigin).then()
					break
				case 'ToApp':
					this.handleToAppRequest(message as ILocalAPIResponse, messageOrigin)
					return
				default:
					return
			}
		}, false)
	}

	private async handleFromAppRequest(
		message: ILocalAPIRequest,
		messageOrigin: string
	): Promise<void> {
		const appDomain = messageOrigin.split('//')[1]
		if (message.host !== appDomain) {
			return
		}

		let numPendingMessagesFromHost = this.pendingHostCounts.get(message.host)
		if (numPendingMessagesFromHost > 4) {
			// Prevent hosts from making local 'Denial of Service' attacks
			return
		}

		let numPendingMessagesForSchema = this.pendingSchemaCounts.get(message.schemaSignature)
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

		let pendingMessageIdsFromHost = this.pendingFromAppMessageIds.get(message.host)
		if (!pendingMessageIdsFromHost) {
			pendingMessageIdsFromHost = new Map()
			this.pendingFromAppMessageIds.set(message.host, pendingMessageIdsFromHost)
		}
		let pendingMessageIdsFromHostForSchema = pendingMessageIdsFromHost.get(message.schemaSignature)
		if (!pendingMessageIdsFromHostForSchema) {
			pendingMessageIdsFromHostForSchema = new Set()
			pendingMessageIdsFromHost.set(message.schemaSignature, pendingMessageIdsFromHostForSchema)
		}
		pendingMessageIdsFromHostForSchema.add(message.id)

		// Forward the request to the correct schema iframe
		window.postMessage(message, message.schemaSignature + this.domainPrefix)
	}

	private async handleToAppRequest(
		message: ILocalAPIResponse,
		messageOrigin: string
	): Promise<void> {
		if (!this.messageIsFromValidSchema(message, messageOrigin)) {
			return
		}
		let pendingMessagesFromHost = this.pendingFromAppMessageIds.get(message.host)
		if (!pendingMessagesFromHost) {
			return
		}

		let pendingMessagesFromHostForSchema = pendingMessagesFromHost.get(message.schemaSignature)
		if (!pendingMessagesFromHostForSchema) {
			return
		}

		if (!pendingMessagesFromHostForSchema.has(message.id)) {
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

		// Forward the request to the correct app
		window.postMessage(message, message.host)

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

	private messageIsFromValidSchema(
		message: IIsolateMessage | ILocalAPIResponse,
		messageOrigin: string
	): boolean {
		const schemaDomain = messageOrigin.split('//')[1]
		const schemaDomainFragments = schemaDomain.split('.')
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
		messageOrigin: string
	): void {
		if (!this.messageIsFromValidSchema(message, messageOrigin)) {
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
			window.postMessage(response, shemaDomainName)
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

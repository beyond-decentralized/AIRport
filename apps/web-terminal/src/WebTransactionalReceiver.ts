import {
	DI,
} from '@airport/di';
import {
	IIsolateMessage,
	IObservableDataIMO,
	IsolateMessageType,
} from '@airport/security-check';
import { TransactionalReceiver } from '@airport/terminal';
import {
	TRANSACTIONAL_RECEIVER,
	ITransactionalReceiver
} from '@airport/terminal-map';
import {
	map
} from 'rxjs/operators'

export class WebTransactionalReceiver
	extends TransactionalReceiver
	implements ITransactionalReceiver {

	dbName: string;
	serverUrl: string;

	public WebTransactionalReceiver() {
		window.addEventListener("message", event => {
			const ownDomain = window.location.hostname
			const mainDomainFragments = ownDomain.split('.')
			if (mainDomainFragments[0] === 'www') {
				mainDomainFragments.splice(0, 1)
			}
			const domainPrefix = '.' + mainDomainFragments.join('.')
			const origin = event.origin;
			const message: IIsolateMessage = event.data
			// Only accept requests from https protocol
			if (!origin.startsWith("https")
				|| origin !== message.isolateId
				|| !origin.endsWith(domainPrefix)) {
				return
			}
			const sourceDomainNameFragments = origin.split('//')[1].split('.')
			// Only accept requests from '${schemaName}.${mainDomainName}'
			if (sourceDomainNameFragments.length !== mainDomainFragments.length + 1) {
				return
			}
			// Only accept requests from non-'www' domain (don't accept requests from self)
			if (sourceDomainNameFragments[0] === 'www') {
				return
			}
			const schemaHash = sourceDomainNameFragments[0]
			const isolateId = message.isolateId
			// FIXME: check schemaHash and isolateId and make sure they result in a match (isolate Id is passed in as a URL parameter)

			this.processMessage(message).then(response => {
				switch (response.type) {
					case IsolateMessageType.SEARCH:
					case IsolateMessageType.SEARCH_ONE:
						const observableDataResult = <IObservableDataIMO<any>>response
						observableDataResult.result.pipe(
							map(value => {
								window.postMessage(value, response.isolateId)
							})
						)
						return
				}
				window.postMessage(response, response.isolateId)
			})

		}, false)
	}

}

DI.set(TRANSACTIONAL_RECEIVER, WebTransactionalReceiver);

export function injectTransactionalConnector(): void {
	// console.log('Injecting TransactionalConnector')
}

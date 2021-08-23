import { DI, } from '@airport/di';
import { IsolateMessageType, } from '@airport/security-check';
import { TransactionalReceiver } from '@airport/terminal';
import { TRANSACTIONAL_RECEIVER } from '@airport/terminal-map';
import { map } from 'rxjs/operators';
export class WebTransactionalReceiver extends TransactionalReceiver {
    constructor() {
        super(...arguments);
        this.subsriptionMap = new Map();
    }
    WebTransactionalReceiver() {
        const ownDomain = window.location.hostname;
        const mainDomainFragments = ownDomain.split('.');
        if (mainDomainFragments[0] === 'www') {
            mainDomainFragments.splice(0, 1);
        }
        const domainPrefix = '.' + mainDomainFragments.join('.');
        // set domain to a random value so that an iframe cannot directly invoke logic in this domain
        document.domain = Math.random() + '.' + Math.random() + domainPrefix;
        window.addEventListener("message", event => {
            const origin = event.origin;
            const message = event.data;
            // Only accept requests from https protocol
            if (!origin.startsWith("https")
                || origin !== message.isolateId
                || !origin.endsWith(domainPrefix)) {
                return;
            }
            const sourceDomainNameFragments = origin.split('//')[1].split('.');
            // Only accept requests from '${schemaName}.${mainDomainName}'
            if (sourceDomainNameFragments.length !== mainDomainFragments.length + 1) {
                return;
            }
            // Only accept requests from non-'www' domain (don't accept requests from self)
            if (sourceDomainNameFragments[0] === 'www') {
                return;
            }
            const schemaHash = sourceDomainNameFragments[0];
            const isolateId = message.isolateId;
            // FIXME: check schemaHash and isolateId and make sure they result in a match (isolate Id is passed in as a URL parameter)
            switch (message.type) {
                case IsolateMessageType.SEARCH_UNSUBSCRIBE:
                    this.subsriptionMap.get(message.isolateId);
                    let isolateSubscriptionMap = this.subsriptionMap.get(message.isolateId);
                    if (!isolateSubscriptionMap) {
                        return;
                    }
                    let subscription = isolateSubscriptionMap.get(message.id);
                    if (!subscription) {
                        return;
                    }
                    subscription.unsubscribe();
                    isolateSubscriptionMap.delete(message.id);
                    return;
            }
            this.processMessage(message).then(response => {
                switch (message.type) {
                    case IsolateMessageType.SEARCH:
                    case IsolateMessageType.SEARCH_ONE:
                        const observableDataResult = response;
                        observableDataResult.result.pipe(map(value => {
                            window.postMessage(value, response.isolateId);
                        }));
                        const subscription = observableDataResult.result.subscribe();
                        let isolateSubscriptionMap = this.subsriptionMap.get(message.isolateId);
                        if (!isolateSubscriptionMap) {
                            isolateSubscriptionMap = new Map();
                            this.subsriptionMap.set(message.isolateId, isolateSubscriptionMap);
                        }
                        isolateSubscriptionMap.set(message.id, subscription);
                        return;
                }
                window.postMessage(response, response.isolateId);
            });
        }, false);
    }
}
DI.set(TRANSACTIONAL_RECEIVER, WebTransactionalReceiver);
export function injectTransactionalConnector() {
    // console.log('Injecting TransactionalConnector')
}
//# sourceMappingURL=WebTransactionalReceiver.js.map
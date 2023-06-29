import { AirMessageUtils, Message_Type, IAirMessageUtils, IApiCallRequestMessage, IApiCallResponseMessage, TimeStamp } from '@airport/aviation-communication';
import { BroadcastChannel as SoftBroadcastChannel } from '../node_modules/broadcast-channel/dist/lib/index.es5';

export interface ICrossTabCommunicator {

}

export class CrossTabCommunicator
    implements ICrossTabCommunicator {

    airMessageUtils: IAirMessageUtils = new AirMessageUtils()

    webListenerStarted = false;

    clientHost: string
    clientProtocol: string

    isNativeBroadcastChannel: boolean

    communicationChannel: SoftBroadcastChannel

    pendingMessageIdSet: Set<string> = new Set()
    activeSubscriptionIdMap: Map<string, TimeStamp> = new Map()

    constructor() {
        this.isNativeBroadcastChannel = typeof BroadcastChannel === 'function'

        setTimeout(() => {
            if (globalThis.repositoryAutoload !== false) {
                setInterval(() => {
                    let lastValidPingMillis = new Date().getTime() - 10000
                    let staleSubscriptionIds = []
                    for(const [subscriptionId, lastPingMillis] of this.activeSubscriptionIdMap) {
                        if(lastPingMillis < lastValidPingMillis) {
                            staleSubscriptionIds.push(subscriptionId)
                        }
                    }
                    for(const staleSubscriptionId of staleSubscriptionIds) {
                        this.activeSubscriptionIdMap.delete(staleSubscriptionId)
                    }
                }, 10000)
            }
        }, 2000)

        window.addEventListener("message", event => {
            const message: IApiCallRequestMessage = event.data

            if (this.airMessageUtils.isMessageAlreadyReceived(message)) {
                return
            }

            let messageCopy = {
                ...message
            }

            const messageOriginFragments = event.origin.split('//')

            // Limiting message domain to only the host:port of the
            // calling UI prevents that UI from calling apps of
            // a different publisher, removing
            // const appDomainAndPort = messageOriginFragments[1]
            // if (message.domain !== appDomainAndPort) {
            //     return
            // }
            switch (message.type) {
                case Message_Type.IS_CONNECTION_READY:
                    this.clientHost = messageOriginFragments[1]
                    this.clientProtocol = messageOriginFragments[0]
                    this.pendingMessageIdSet.add(message.id)
                    break
                case Message_Type.API_SUBSCRIBE:
                case Message_Type.SUBSCRIPTION_PING: {
                    this.activeSubscriptionIdMap.set(message.subscriptionId, new Date().getTime())
                    break
                }
                case Message_Type.API_UNSUBSCRIBE: {
                    this.activeSubscriptionIdMap.delete(message.subscriptionId)
                    break;
                }
                default: {
                    // Not an observable message
                    this.pendingMessageIdSet.add(message.id)
                    break;
                }
            }
            messageCopy.clientDomain = this.clientHost
            messageCopy.clientDomainProtocol = this.clientProtocol

            // FIXME: serialize message if !this.isNativeBroadcastChannel
            this.communicationChannel.postMessage(messageCopy)
        })

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

            this.communicationChannel.onmessage = (message: IApiCallResponseMessage) => {
                if (!this.clientHost || message.clientDomain !== this.clientHost
                    || message.clientDomainProtocol !== this.clientProtocol) {
                    return
                }

                if (this.airMessageUtils.isMessageAlreadyReceived(message)) {
                    return
                }

                switch (message.type) {
                    case Message_Type.API_SUBSCRIBE:
                    case Message_Type.API_UNSUBSCRIBE: {
                        break;
                    }
                    case Message_Type.API_SUBSCRIPTION_DATA: {
                        if (!this.activeSubscriptionIdMap.has(message
                            .subscriptionId)) {
                            return
                        }
                        break;
                    }
                    default: {
                        // Not an observable message
                        if (!this.pendingMessageIdSet.has(message.id)) {
                            console.log(`
Corresponding message request not found for Message:
    Id:      ${message.id}
    Content:
${JSON.stringify(message)}
`)
                            return
                        }
                        this.pendingMessageIdSet.delete(message.id)
                    }
                }

                const messageCopy: IApiCallResponseMessage = { ...message }

                // FIXME: deserialize message if !this.isNativeBroadcastChannel
                window.parent.postMessage(messageCopy, this.clientProtocol + '//' + this.clientHost)
            };
        }
        createChannel();
    }
}

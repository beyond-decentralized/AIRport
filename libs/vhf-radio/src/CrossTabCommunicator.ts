import {
    ILocalAPIRequest,
    ILocalAPIResponse
} from "@airport/aviation-communication";
import { BroadcastChannel as SoftBroadcastChannel } from '../node_modules/broadcast-channel/dist/lib/index.es5';

export interface ICrossTabCommunicator {

}

export class CrossTabCommunicator
    implements ICrossTabCommunicator {

    webListenerStarted = false;

    clientHost: string
    clientProtocol: string

    isNativeBroadcastChannel: boolean

    communicationChannel: SoftBroadcastChannel

    pendingMessageIdSet: Set<string> = new Set()

    constructor() {
        this.isNativeBroadcastChannel = typeof BroadcastChannel === 'function'


        window.addEventListener("message", event => {
            const message: ILocalAPIRequest = event.data
            if (message.__received__) {
                return
            }
            let messageCopy = {
                ...message
            }
            message.__received__ = true

            const messageOriginFragments = event.origin.split('//')

            // Limiting message domain to only the host:port of the
            // calling UI prevents that UI from calling apps of
            // a different publisher, removing
            // const appDomainAndPort = messageOriginFragments[1]
            // if (message.domain !== appDomainAndPort) {
            //     return
            // }

            if (message.category === 'IsConnectionReady') {
                this.clientHost = messageOriginFragments[1]
                this.clientProtocol = messageOriginFragments[0]
            }
            messageCopy.hostDomain = this.clientHost
            messageCopy.hostProtocol = this.clientProtocol
            this.pendingMessageIdSet.add(message.id)

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

            this.communicationChannel.onmessage = (message: ILocalAPIResponse) => {
                if (!this.clientHost || message.hostDomain !== this.clientHost
                    || message.hostProtocol !== this.clientProtocol) {
                    return
                }
                if (message.__received__) {
                    return
                }
                if (!this.pendingMessageIdSet.has(message.id)) {
                    return
                }

                this.pendingMessageIdSet.delete(message.id)

                const messageCopy: ILocalAPIResponse = { ...message }
                message.__received__ = true

                // FIXME: deserialize message if !this.isNativeBroadcastChannel
                window.parent.postMessage(messageCopy, this.clientProtocol + '//' + this.clientHost)
            };
        }
        createChannel();
    }
}

import {
    ILocalAPIRequest,
    ILocalAPIResponse
} from "@airport/aviation-communication";
import { DI } from "@airport/di";
import { BroadcastChannel as SoftBroadcastChannel } from '../node_modules/broadcast-channel/dist/lib/index.es5';
import { CROSS_TAB_COMMUNCATOR } from "./tokens";

export interface ICrossTabCommunicator {

}

export class CrossTabCommunicator
    implements ICrossTabCommunicator {

    demoListenerStarted = false;

    clientHost: string

    isNativeBroadcastChannel: boolean

    communicationChannel: SoftBroadcastChannel

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

            const messageOrigin = event.origin;
            const appDomainAndPort = messageOrigin.split('//')[1]
            if (message.domain !== appDomainAndPort) {
                return
            }

            if (message.category === 'IsConnectionReady') {
                this.clientHost = message.domain
            }
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
                if (!this.clientHost || message.domain !== this.clientHost) {
                    return
                }
                if (message.__received__) {
                    return
                }
                const messageCopy: ILocalAPIResponse = { ...message }
                message.__received__ = true

                // FIXME: deserialize message if !this.isNativeBroadcastChannel
                window.parent.postMessage(messageCopy, this.clientHost)
            };
        }
        createChannel();
    }
}
DI.set(CROSS_TAB_COMMUNCATOR, CrossTabCommunicator)

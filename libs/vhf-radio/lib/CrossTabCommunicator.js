import { DI } from "@airport/di";
import { BroadcastChannel as SoftBroadcastChannel } from 'broadcast-channel';
import { CROSS_TAB_COMMUNCATOR } from "./tokens";
export class CrossTabCommunicator {
    constructor() {
        this.demoListenerStarted = false;
        this.isNativeBroadcastChannel = typeof BroadcastChannel === 'function';
        window.addEventListener("message", event => {
            const message = event.data;
            if (message.__received__) {
                return;
            }
            let messageCopy = {
                ...message
            };
            message.__received__ = true;
            if (message.category === 'IsConnectionReady') {
                this.clientHost = message.host;
            }
            // FIXME: serialize message if !this.isNativeBroadcastChannel
            this.communicationChannel.postMessage(messageCopy);
        });
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
            this.communicationChannel.onmessage = (message) => {
                if (!this.clientHost || message.host !== this.clientHost) {
                    return;
                }
                if (message.__received__) {
                    return;
                }
                const messageCopy = { ...message };
                message.__received__ = true;
                // FIXME: deserialize message if !this.isNativeBroadcastChannel
                window.parent.postMessage(messageCopy, this.clientHost);
            };
        };
    }
}
DI.set(CROSS_TAB_COMMUNCATOR, CrossTabCommunicator);
//# sourceMappingURL=CrossTabCommunicator.js.map
import { IOC } from "@airport/direction-indicator";
import { TERMINAL_STORE } from "@airport/terminal-map";
import { BroadcastChannel as SoftBroadcastChannel } from '../node_modules/broadcast-channel/dist/lib/index.es5';
export class WebMesageReceiver {
    constructor() {
        this.isNativeBroadcastChannel = typeof BroadcastChannel === 'function';
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
                this.transactionalReceiver.handleClientRequest(message);
            };
        };
        createChannel();
        window.addEventListener("message", event => {
            const message = event.data;
            this.transactionalReceiver.handleAppRequest(message, event.origin, event.source);
        }, false);
    }
    needMessageSerialization() {
        return !this.isNativeBroadcastChannel;
    }
    sendMessageToClient(message) {
        this.communicationChannel.postMessage(message);
    }
    sendMessageToApp() {
    }
}
export function injectWebReceiver() {
    const terminalStore = IOC.getSync(TERMINAL_STORE);
    const webReciever = terminalStore.getWebReceiver();
    webReciever.localDomain = 'localhost:31717';
}
//# sourceMappingURL=WebMessageReceiver.js.map
import { container, DI } from "@airport/di";
import { TERMINAL_STORE, TRANSACTIONAL_RECEIVER } from "@airport/terminal-map";
import { BroadcastChannel as SoftBroadcastChannel } from '../node_modules/broadcast-channel/dist/lib/index.es5';
import { WEB_MESSAGE_RECEIVER } from './tokens';
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
                const transactionalReceiver = container(this).getSync(TRANSACTIONAL_RECEIVER);
                transactionalReceiver.handleClientRequest(message);
            };
        };
        createChannel();
        window.addEventListener("message", event => {
            const message = event.data;
            const transactionalReceiver = container(this).getSync(TRANSACTIONAL_RECEIVER);
            transactionalReceiver.handleAppRequest(message, event.origin, event.source);
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
DI.set(WEB_MESSAGE_RECEIVER, WebMesageReceiver);
export function injectWebReceiver() {
    const terminalStore = container(this).getSync(TERMINAL_STORE);
    const webReciever = terminalStore.getWebReceiver();
    webReciever.localDomain = 'localhost:31717';
}
//# sourceMappingURL=WebMessageReceiver.js.map
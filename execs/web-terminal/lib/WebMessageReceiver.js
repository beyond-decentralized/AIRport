var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
import { IOC } from "@airport/direction-indicator";
import { TERMINAL_STORE } from "@airport/terminal-map";
import { BroadcastChannel as SoftBroadcastChannel } from '../node_modules/broadcast-channel/dist/lib/index.es5';
let WebMesageReceiver = class WebMesageReceiver {
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
};
__decorate([
    Inject()
], WebMesageReceiver.prototype, "terminalStore", void 0);
__decorate([
    Inject()
], WebMesageReceiver.prototype, "transactionalReceiver", void 0);
WebMesageReceiver = __decorate([
    Injected()
], WebMesageReceiver);
export { WebMesageReceiver };
export function injectWebReceiver() {
    const terminalStore = IOC.getSync(TERMINAL_STORE);
    const webReciever = terminalStore.getWebReceiver();
    webReciever.localDomain = 'localhost:31717';
}
//# sourceMappingURL=WebMessageReceiver.js.map
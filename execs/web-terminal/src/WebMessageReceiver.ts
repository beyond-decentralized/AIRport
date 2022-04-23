import { ILocalAPIRequest, ILocalAPIResponse } from "@airport/aviation-communication";
import { container, DEPENDENCY_INJECTION } from "@airport/direction-indicator";
import { IApiIMI, IIsolateMessage } from "@airport/security-check";
import { TERMINAL_STORE, TRANSACTIONAL_RECEIVER } from "@airport/terminal-map";
import {
    BroadcastChannel as SoftBroadcastChannel
} from '../node_modules/broadcast-channel/dist/lib/index.es5';
import { WEB_MESSAGE_RECEIVER } from './tokens'

export interface IWebMessageReceiver {

    needMessageSerialization(): boolean

    sendMessageToClient(
        message: ILocalAPIResponse
    ): void

    sendMessageToApp(): void
}

export class WebMesageReceiver
    implements IWebMessageReceiver {

    communicationChannel: SoftBroadcastChannel
    isNativeBroadcastChannel: boolean

    constructor() {
        this.isNativeBroadcastChannel = typeof BroadcastChannel === 'function'
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

            this.communicationChannel.onmessage = (
                message: ILocalAPIRequest
            ) => {
                const transactionalReceiver = container(this).getSync(TRANSACTIONAL_RECEIVER)
                transactionalReceiver.handleClientRequest(message)
            };
        }

        createChannel()

        window.addEventListener("message", event => {
            const message: (IIsolateMessage & IApiIMI) | ILocalAPIResponse = event.data
            const transactionalReceiver = container(this).getSync(TRANSACTIONAL_RECEIVER)
            transactionalReceiver.handleAppRequest(message, event.origin, event.source)
        }, false)
    }

    needMessageSerialization(): boolean {
        return !this.isNativeBroadcastChannel
    }

    sendMessageToClient(
        message: ILocalAPIResponse
    ): void {
        this.communicationChannel.postMessage(message)
    }

    sendMessageToApp(): void {

    }

}
DEPENDENCY_INJECTION.set(WEB_MESSAGE_RECEIVER, WebMesageReceiver)

export function injectWebReceiver() {
    const terminalStore = container(this).getSync(TERMINAL_STORE)
    const webReciever = terminalStore.getWebReceiver()

    webReciever.localDomain = 'localhost:31717'
}

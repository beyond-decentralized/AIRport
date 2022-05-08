import {
    Inject,
    Injected
} from '@airport/direction-indicator'
import { ILocalAPIRequest, ILocalAPIResponse } from "@airport/aviation-communication";
import { IOC } from "@airport/direction-indicator";
import { IApiIMI, IIsolateMessage } from "@airport/apron";
import { ITransactionalReceiver, TERMINAL_STORE } from "@airport/terminal-map";
import {
    BroadcastChannel as SoftBroadcastChannel
} from '../node_modules/broadcast-channel/dist/lib/index.es5';

export interface IWebMessageReceiver {

    needMessageSerialization(): boolean

    sendMessageToClient(
        message: ILocalAPIResponse
    ): void

    sendMessageToApp(): void
}

@Injected()
export class WebMesageReceiver
    implements IWebMessageReceiver {

    @Inject()
    transactionalReceiver: ITransactionalReceiver

    communicationChannel: SoftBroadcastChannel
    isNativeBroadcastChannel: boolean

    init() {
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
                this.transactionalReceiver.handleClientRequest(message)
            };
        }

        createChannel()

        window.addEventListener("message", event => {
            const message: (IIsolateMessage & IApiIMI) | ILocalAPIResponse = event.data
            this.transactionalReceiver.handleAppRequest(
                message, event.origin, event.source)
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

export function injectWebReceiver() {
    const terminalStore = IOC.getSync(TERMINAL_STORE)
    const webReciever = terminalStore.getWebReceiver()

    webReciever.localDomain = 'localhost:31717'
}

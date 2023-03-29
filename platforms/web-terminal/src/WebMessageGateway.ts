import { IAirMessageUtils, IApiCallRequestMessage, IApiCallResponseMessage, IMessage } from '@airport/aviation-communication';
import {
    Inject,
    Injected,
    IOC
} from '@airport/direction-indicator'
import { IDbApplicationUtils } from '@airport/ground-control';
import {
    IGetLatestApplicationVersionByDbApplication_NameMessage,
    IInitializeConnectionMessage,
    IRetrieveDomainMessage,
    ITransactionalReceiver,
    TerminalStore
} from "@airport/terminal-map";
import {
    BroadcastChannel as SoftBroadcastChannel
} from 'broadcast-channel';

export interface IWebMessageGateway {

    needMessageSerialization(): boolean

    sendMessageToApp(
        message: IApiCallResponseMessage
    ): void

    sendMessageToClient(
        message: IApiCallRequestMessage
            | IInitializeConnectionMessage
    ): void

    sendMessageToWindow(
        message: IApiCallResponseMessage
            | IGetLatestApplicationVersionByDbApplication_NameMessage
            | IInitializeConnectionMessage
            | IRetrieveDomainMessage,
        window: Window
    ): void
}

@Injected()
export class WebMessageGateway
    implements IWebMessageGateway {

    @Inject()
    airMessageUtils: IAirMessageUtils

    @Inject()
    dbApplicationUtils: IDbApplicationUtils

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
                message: IApiCallRequestMessage
            ) => {
                if (!this.airMessageUtils.validateIncomingMessage(message)) {
                    return
                }
                this.transactionalReceiver.handleClientRequest(message)
            };
        }

        createChannel()

        window.addEventListener("message", event => {
            const message: IMessage | IApiCallRequestMessage = event.data
            if (!this.airMessageUtils.validateIncomingMessage(message)) {
                return
            }
            this.transactionalReceiver.handleAppRequest(
                message, event.origin, event.source)
        }, false)
    }

    needMessageSerialization(): boolean {
        return !this.isNativeBroadcastChannel
    }

    sendMessageToApp(
        message: IApiCallResponseMessage
    ): void {
        const fullDbApplication_Name = this.dbApplicationUtils.
            getDbApplication_FullNameFromDomainAndName(
                message.serverDomain, message.serverApplication)

        const window = this.getFrameWindow(fullDbApplication_Name)

        this.sendMessageToWindow(message, window)
    }

    sendMessageToClient(
        message: IApiCallRequestMessage
            | IInitializeConnectionMessage
    ): void {
        this.airMessageUtils.prepMessageToSend(message)

        this.communicationChannel.postMessage(message)
    }

    sendMessageToWindow(
        message: IApiCallResponseMessage
            | IGetLatestApplicationVersionByDbApplication_NameMessage
            | IInitializeConnectionMessage
            | IRetrieveDomainMessage,
        window: Window
    ): void {
        this.airMessageUtils.prepMessageToSend(message)

        window.postMessage(message, '*')
    }

    private getFrameWindow(
        fullDbApplication_Name: string
    ): Window {
        const iframe: HTMLIFrameElement = document
            .getElementsByName(fullDbApplication_Name) as any
        if (!iframe || !iframe[0]) {
            return null
        }
        const frameWindow = iframe[0].contentWindow

        if (!frameWindow) {
            throw new Error(`No Application IFrame found for: ${fullDbApplication_Name}`)
        }

        return frameWindow
    }

}

export function injectWebReceiver() {
    const terminalStore = IOC.getSync(TerminalStore)
    const webReciever = terminalStore.getWebReceiver()

    // webReciever.localDomain = 'localhost:31717'
}

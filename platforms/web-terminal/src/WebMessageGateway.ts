import { IAirMessageUtils, IApiCallRequestMessage, IApiCallResponseMessage, IInternalMessage, IMessage, IObservableApiCallResponseMessage, ISubscriptionMessage, Message_OriginOrDestination_Type } from '@airport/aviation-communication';
import {
    Inject,
    Injected,
    IOC
} from '@airport/direction-indicator'
import { DbApplication_FullName, IDbApplicationUtils } from '@airport/ground-control';
import {
    IGetLatestApplicationVersionByDbApplication_NameMessage,
    IInitializeConnectionMessage,
    IRetrieveDomainMessage,
    ITransactionalReceiver,
    TerminalStore
} from "@airport/terminal-map";

export interface IWebMessageGateway {

    needMessageSerialization(): boolean

    sendMessageToApp(
        application_FullName: DbApplication_FullName,
        message: IApiCallResponseMessage
            | IObservableApiCallResponseMessage
            | IGetLatestApplicationVersionByDbApplication_NameMessage
            | IInitializeConnectionMessage
            | IRetrieveDomainMessage
            | ISubscriptionMessage
    ): void

    sendMessageToClient(
        message: IApiCallRequestMessage
            | IInternalMessage
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

    init() {

        window.addEventListener("message", event => {
            const message: IMessage | IApiCallRequestMessage = event.data
            if (!this.airMessageUtils.validateIncomingMessage(message)) {
                return
            }

            switch (message.origin.type) {
                case Message_OriginOrDestination_Type.USER_INTERFACE: {
                    this.transactionalReceiver.handleClientRequest(message as IApiCallRequestMessage)
                    break
                }
                case Message_OriginOrDestination_Type.APPLICATION: {
                    this.transactionalReceiver.handleAppRequest(message, event.origin)
                    break
                }
                case Message_OriginOrDestination_Type.DATABASE:
                case Message_OriginOrDestination_Type.FRAMEWORK:
                default: {
                    console.error(`Unexpected message origin type: ${message.origin.type}`)
                    break
                }
            }
        }, false)
    }

    needMessageSerialization() {
        return false
    }

    sendMessageToApp(
        application_FullName: DbApplication_FullName,
        message: IApiCallResponseMessage
            | IObservableApiCallResponseMessage
            | IGetLatestApplicationVersionByDbApplication_NameMessage
            | IInitializeConnectionMessage
            | IRetrieveDomainMessage
            | ISubscriptionMessage
    ): void {
        const window = this.getFrameWindow(application_FullName)

        this.airMessageUtils.prepMessageToSend(message)

        window.postMessage(message, message.destination.domain)
    }

    sendMessageToClient(
        message: IApiCallRequestMessage
            | IInternalMessage
    ): void {
        this.airMessageUtils.prepMessageToSend(message)

        window.postMessage(message, message.destination.domain)
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

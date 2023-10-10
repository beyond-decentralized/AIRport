import { IAirMessageUtils, IApiCallRequestMessage, IApiCallResponseMessage, IInternalMessage, IMessage, IObservableApiCallResponseMessage, ISubscriptionMessage, Message_OriginOrDestination_Type } from '@airport/aviation-communication';
import {
    Inject,
    Injected,
    IOC
} from '@airport/direction-indicator'
import { Application_FullName, IApplicationNameUtils } from '@airport/ground-control';
import {
    IGetLatestApplicationVersionByApplication_NameMessage,
    IInitializeConnectionMessage,
    IRetrieveDomainMessage,
    ITerminalStore,
    ITransactionalReceiver,
    TerminalStore
} from "@airport/terminal-map";

export interface IWebMessageGateway {

    needMessageSerialization(): boolean

    sendMessageToApp(
        application_FullName: Application_FullName,
        message: IApiCallResponseMessage
            | IObservableApiCallResponseMessage
            | ISubscriptionMessage
            | IInternalMessage
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
    applicationNameUtils: IApplicationNameUtils

    @Inject()
    terminalStore: ITerminalStore

    @Inject()
    transactionalReceiver: ITransactionalReceiver

    init() {

        window.addEventListener("message", event => {
            const message = this.airMessageUtils.unpackageRecievedMessage(event.data)

            const escapeZoneJsCallback = this.terminalStore.getUI().escapeZoneJsCallback
            if (escapeZoneJsCallback) {
                escapeZoneJsCallback(() => {
                    this.processMessage(message, event.origin);
                })
            } else {
                this.processMessage(message, event.origin);
            }
        }, false)
    }

    private processMessage(
        message: IMessage | IApiCallRequestMessage,
        messageOrigin: string
    ): void {
        if (!message.isAIRportMessage
            || !this.airMessageUtils.validateIncomingMessage(message)) {
            return
        }

        switch (message.origin.type) {
            case Message_OriginOrDestination_Type.USER_INTERFACE: {
                this.transactionalReceiver.handleUIRequest(message as IApiCallRequestMessage)
                break
            }
            case Message_OriginOrDestination_Type.APPLICATION: {
                this.transactionalReceiver.handleAppRequest(message, messageOrigin)
                break
            }
            case Message_OriginOrDestination_Type.DATABASE:
            case Message_OriginOrDestination_Type.FRAMEWORK:
            default: {
                console.error(`Unexpected message origin type: ${message.origin.type}`)
                break
            }
        }
    }

    needMessageSerialization() {
        return false
    }

    sendMessageToApp(
        application_FullName: Application_FullName,
        message: IApiCallResponseMessage
            | IObservableApiCallResponseMessage
            | IGetLatestApplicationVersionByApplication_NameMessage
            | IInitializeConnectionMessage
            | IRetrieveDomainMessage
            | ISubscriptionMessage
    ): void {
        const window = this.getFrameWindow(application_FullName)

        const data = this.airMessageUtils.prepMessageToSend(message)

        try {
            window.postMessage(data,
                `${message.destination.protocol}//${message.destination.domain}`)
        } catch (e) {
            throw e
        }
    }

    setUiIframe(
        iframe: HTMLIFrameElement
    ): void {
        IOC.getSync(WebMessageGateway).setUiIframe(iframe)
    }

    sendMessageToClient(
        message: IApiCallRequestMessage
            | IInternalMessage
    ): void {
        const data = this.airMessageUtils.prepMessageToSend(message)

        try {
            this.terminalStore.getUI().uiIframe?.
                contentWindow.postMessage(data,
                    `${message.destination.protocol}//${message.destination.domain}`)
        } catch (e) {
            throw e
        }
    }

    private getFrameWindow(
        fullApplication_Name: string
    ): Window {
        const iframe: HTMLIFrameElement = document
            .getElementsByName(fullApplication_Name) as any
        if (!iframe || !iframe[0]) {
            return null
        }
        const frameWindow = iframe[0].contentWindow

        if (!frameWindow) {
            throw new Error(`No Application IFrame found for: ${fullApplication_Name}`)
        }

        return frameWindow
    }

}

export function injectWebReceiver() {
    const terminalStore = IOC.getSync(TerminalStore)
    const webReciever = terminalStore.getWebReceiver()

    // webReciever.localDomain = 'localhost:31717'
}

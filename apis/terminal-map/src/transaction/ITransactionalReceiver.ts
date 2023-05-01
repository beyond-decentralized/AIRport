import {
    IApiCallRequestMessage,
    IApiCallResponseMessage,
    IMessage
} from "@airport/aviation-communication"

export interface ITransactionalReceiver {

    handleClientRequest(
        message: IApiCallRequestMessage
    ): void

    handleAppRequest(
        message: IMessage | IApiCallResponseMessage,
        messageOrigin: string
    ): void

    onMessage(callback: (
        message: any
    ) => void)

}

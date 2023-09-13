import {
    IApiCallRequestMessage,
    IApiCallResponseMessage,
    IMessage
} from "@airport/aviation-communication"

export interface ITransactionalReceiver {

    handleUIRequest(
        message: IApiCallRequestMessage
    ): void

    handleAppRequest(
        message: IMessage | IApiCallResponseMessage,
        messageOrigin: string
    ): void

}

import {
    ILocalAPIRequest,
    ILocalAPIResponse
} from "@airport/aviation-communication"
import { IApiIMI, IIsolateMessage } from "../isolate/IIsolateMessage"

export interface ITransactionalReceiver {

    handleClientRequest(
        message: ILocalAPIRequest
    ): void

    handleAppRequest(
        message: (IIsolateMessage & IApiIMI) | ILocalAPIResponse,
        messageOrigin: string,
        source: any
    ): void

    onMessage(callback: (
        message: any
    ) => void)

}

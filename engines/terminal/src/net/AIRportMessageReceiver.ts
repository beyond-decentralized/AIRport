import { ILocalAPIRequest } from "@airport/aviation-communication";

export interface IAIRportMessageReceiver {

    handleMessage(
        message: ILocalAPIRequest,
        messageOrigin: string,
    ): void

}

// TODO: implement when there are Client to AIRport messages
export class AIRportMessageReceiver
    implements AIRportMessageReceiver {

    handleMessage(
        message: ILocalAPIRequest,
        messageOrigin: string,
    ): void {

    }
}

import { IApplicationApi } from "@airport/air-traffic-control";
import { IApiCallRequestMessageProperties, IApiCallResponseMessage, IMessage, IObservableApiCallResponseMessage } from "@airport/aviation-communication";
import { IContext } from "@airport/direction-indicator";
import { IActor } from "@airport/ground-control";

export interface ILocalAPIServer {

    handleRequest(
        message: IApiCallRequestMessageProperties<IActor> & IMessage
    ): Promise<IApiCallResponseMessage | IObservableApiCallResponseMessage>

    coreHandleRequest<ReturnType = any>(
        message: IApiCallRequestMessageProperties<IActor> & IMessage,
        api: IApplicationApi,
        context?: IContext
    ): Promise<{
        isAsync: boolean,
        result: ReturnType
    }>

}
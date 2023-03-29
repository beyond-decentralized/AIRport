
import { IApplicationApi } from "@airport/air-traffic-control";
import { IApiCallRequestMessage, IApiCallResponseMessage } from "@airport/aviation-communication";
import { IContext } from "@airport/direction-indicator";

export interface ILocalAPIServer {

    handleRequest(
        request: IApiCallRequestMessage
    ): Promise<IApiCallResponseMessage>

    coreHandleRequest<ReturnType = any>(
        request: IApiCallRequestMessage,
        api: IApplicationApi,
        context?: IContext
    ): Promise<{
        isAsync: boolean,
        result: ReturnType
    }>

}
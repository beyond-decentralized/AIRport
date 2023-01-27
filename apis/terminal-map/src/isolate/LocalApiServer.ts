
import { IApplicationApi } from "@airport/air-traffic-control";
import {
    ILocalAPIRequest,
    ILocalAPIResponse
} from "@airport/aviation-communication";
import { IContext } from "@airport/direction-indicator";

export interface ILocalAPIServer {

    handleRequest(
        request: ILocalAPIRequest
    ): Promise<ILocalAPIResponse>

    coreHandleRequest<ReturnType = any>(
        request: ILocalAPIRequest,
        api: IApplicationApi,
        context?: IContext
    ): Promise<ReturnType>

}
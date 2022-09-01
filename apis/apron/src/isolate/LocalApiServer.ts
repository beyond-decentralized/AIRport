
import {
    ILocalAPIRequest,
    ILocalAPIResponse
} from "@airport/aviation-communication";
import { IApplicationApi } from "@airport/check-in";

export interface ILocalAPIServer {

    handleRequest(
        request: ILocalAPIRequest
    ): Promise<ILocalAPIResponse>

    coreHandleRequest<ReturnType = any>(
        request: ILocalAPIRequest,
        api: IApplicationApi
    ): Promise<ReturnType>

}
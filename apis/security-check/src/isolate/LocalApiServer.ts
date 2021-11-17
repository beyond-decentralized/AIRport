
import {
    ILocalAPIRequest,
    ILocalAPIResponse
} from "@airport/autopilot";

export interface ILocalAPIServer {

    systemName: string

    handleRequest(
        request: ILocalAPIRequest
    ): Promise<ILocalAPIResponse>

}
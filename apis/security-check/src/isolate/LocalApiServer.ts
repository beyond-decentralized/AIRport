
import {
    ILocalAPIRequest,
    ILocalAPIResponse
} from "@airport/autopilot";

export interface ILocalAPIServer {

    domainName: string

    handleRequest(
        request: ILocalAPIRequest
    ): Promise<ILocalAPIResponse>

}
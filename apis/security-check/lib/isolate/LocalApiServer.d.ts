import { ILocalAPIRequest, ILocalAPIResponse } from "@airport/aviation-communication";
export interface ILocalAPIServer {
    handleRequest(request: ILocalAPIRequest): Promise<ILocalAPIResponse>;
}
//# sourceMappingURL=LocalApiServer.d.ts.map
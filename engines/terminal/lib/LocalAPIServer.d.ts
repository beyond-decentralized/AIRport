import { ILocalAPIRequest, ILocalAPIResponse } from "@airport/autopilot";
export interface ILocalAPIServer {
    handleRequest(request: ILocalAPIRequest): Promise<ILocalAPIResponse>;
}
export declare class LocalAPIServer implements ILocalAPIServer {
    handleRequest(request: ILocalAPIRequest): Promise<ILocalAPIResponse>;
    private handleQuery;
    private getPortableQuery;
}
//# sourceMappingURL=LocalAPIServer.d.ts.map
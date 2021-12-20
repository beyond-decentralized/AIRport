import { ILocalAPIRequest, ILocalAPIResponse } from "@airport/autopilot";
import { ILocalAPIServer } from "@airport/security-check";
export declare class LocalAPIServer implements ILocalAPIServer {
    domainName: string;
    handleRequest(request: ILocalAPIRequest): Promise<ILocalAPIResponse>;
}
//# sourceMappingURL=LocalApiServer.d.ts.map
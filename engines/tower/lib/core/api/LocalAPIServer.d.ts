import { ILocalAPIRequest, ILocalAPIResponse } from "@airport/autopilot";
import { ILocalAPIServer } from "@airport/security-check";
export declare class LocalAPIServer implements ILocalAPIServer {
    handleRequest(request: ILocalAPIRequest): Promise<ILocalAPIResponse>;
}
//# sourceMappingURL=LocalApiServer.d.ts.map
import { ILocalAPIRequest, ILocalAPIResponse } from "@airport/aviation-communication";
import { ILocalAPIServer } from "@airport/security-check";
export declare class LocalAPIServer implements ILocalAPIServer {
    handleRequest(request: ILocalAPIRequest): Promise<ILocalAPIResponse>;
}
//# sourceMappingURL=LocalApiServer.d.ts.map
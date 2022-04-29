import { ILocalAPIRequest, ILocalAPIResponse } from "@airport/aviation-communication";
import { IApiRegistry } from "@airport/check-in";
import { ILocalAPIServer } from "@airport/security-check";
export declare class LocalAPIServer implements ILocalAPIServer {
    apiRegistry: IApiRegistry;
    handleRequest(request: ILocalAPIRequest): Promise<ILocalAPIResponse>;
}
//# sourceMappingURL=LocalApiServer.d.ts.map
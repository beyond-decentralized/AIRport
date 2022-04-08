import { ILocalAPIRequest } from "@airport/aviation-communication";
import { IDiToken } from "@airport/di";
import { IInterAppAPIClient } from "@airport/ground-control";
export interface IRequestRecord {
    request: ILocalAPIRequest;
    reject: any;
    resolve: any;
}
export declare class IFrameInterAppPIClient implements IInterAppAPIClient {
    invokeApiMethod<ApiInterface, ReturnValue>(token: IDiToken<ApiInterface>, methodName: string, args: any[]): Promise<ReturnValue>;
}
//# sourceMappingURL=IFrameInterAppApiClient.d.ts.map
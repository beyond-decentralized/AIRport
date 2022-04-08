import { ILocalAPIRequest } from "@airport/aviation-communication";
import { IDiToken } from "@airport/di";
import { IInterAppAPIClient } from "@airport/tower";
export interface IRequestRecord {
    request: ILocalAPIRequest;
    reject: any;
    resolve: any;
}
export declare class IFrameInterAppPIClient implements IInterAppAPIClient {
    pendingMessageMap: Map<string, IRequestRecord>;
    invokeApiMethod<T>(token: IDiToken<T>, methodName: string, args: any[]): Promise<any>;
    returnApiMethodCall(id: string, result: any): void;
    private sendApiRequest;
}
//# sourceMappingURL=IFrameInterAppApiClient.d.ts.map
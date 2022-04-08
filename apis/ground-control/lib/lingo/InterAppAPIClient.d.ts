import { IDiToken } from "@airport/di";
export interface IInterAppAPIClient {
    invokeApiMethod<ApiInterface, ReturnValue>(token: IDiToken<ApiInterface>, methodName: string, args: any[]): Promise<ReturnValue>;
}
//# sourceMappingURL=InterAppAPIClient.d.ts.map
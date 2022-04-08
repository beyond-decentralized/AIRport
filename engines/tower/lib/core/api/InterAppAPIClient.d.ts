import { IDiToken } from "@airport/di";
export interface IInterAppAPIClient {
    invokeApiMethod<T = any>(token: IDiToken<T>, methodName: string, args: any[]): Promise<void>;
}
//# sourceMappingURL=InterAppAPIClient.d.ts.map
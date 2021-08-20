import { IApiOperation, IApiRegistry, InstalledApi } from "@airport/security-check";
export declare class ApiRegistry implements IApiRegistry {
    installedApi: InstalledApi;
    findOperation(apiObjectName: string, methodName: string): IApiOperation;
}
//# sourceMappingURL=ApiRegistry.d.ts.map
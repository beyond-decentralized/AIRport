import { IApiOperation, IApiRegistry, InstalledApi } from "@airport/security-check";
export declare class ApiRegistry implements IApiRegistry {
    installedApi: InstalledApi;
    init(installedApi: InstalledApi): void;
    findApiObjectAndOperation(schemaSignature: string, apiObjectName: string, methodName: string): Promise<{
        apiObject: any;
        apiOperation: IApiOperation;
    }>;
}
//# sourceMappingURL=ApiRegistry.d.ts.map
import { IApiOperation, IApiRegistry, IApplicationApi } from "@airport/check-in";
export declare class ApiRegistry implements IApiRegistry {
    applicationApi: IApplicationApi;
    initialize(applicationApi: IApplicationApi): void;
    findApiObjectAndOperation(domainName: string, applicationSignature: string, apiObjectName: string, methodName: string): Promise<{
        apiObject: any;
        apiOperation: IApiOperation;
    }>;
}
//# sourceMappingURL=ApiRegistry.d.ts.map
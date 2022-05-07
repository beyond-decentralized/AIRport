import { IContainerAccessor } from "@airport/direction-indicator";
import { IApiOperation, IApiRegistry, IApplicationApi } from "@airport/check-in";
export declare class ApiRegistry implements IApiRegistry {
    containerAccessor: IContainerAccessor;
    applicationApi: IApplicationApi;
    initialize(applicationApi: IApplicationApi): void;
    findApiObjectAndOperation(domainName: string, applicationName: string, apiObjectName: string, methodName: string): Promise<{
        apiObject: any;
        apiOperation: IApiOperation;
    }>;
}
//# sourceMappingURL=ApiRegistry.d.ts.map
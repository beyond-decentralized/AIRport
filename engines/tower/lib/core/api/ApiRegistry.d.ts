import { IContainerAccessor } from "@airport/direction-indicator";
import { IApiOperation, IApiRegistry, IApplicationApi } from "@airport/check-in";
import { IApplicationStore } from "@airport/apron";
export declare class ApiRegistry implements IApiRegistry {
    containerAccessor: IContainerAccessor;
    applicationStore: IApplicationStore;
    initialize(applicationApi: IApplicationApi): void;
    findApiObjectAndOperation(domainName: string, applicationName: string, apiObjectName: string, methodName: string): Promise<{
        apiObject: any;
        apiOperation: IApiOperation;
    }>;
}
//# sourceMappingURL=ApiRegistry.d.ts.map
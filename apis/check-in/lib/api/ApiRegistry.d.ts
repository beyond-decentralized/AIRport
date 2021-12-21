import { IApiOperation } from "./ApiOperation";
export interface IApiRegistry {
    initialize(applicationApi: IApplicationApi): void;
    findApiObjectAndOperation(domainName: string, applicationName: string, apiObjectName: string, methodName: string): Promise<{
        apiObject: any;
        apiOperation: IApiOperation;
    }>;
}
export interface InstalledApi {
    domainApiMap: {
        [domainName: string]: IDomainApi;
    };
}
export interface IDomainApi {
    applicationApiMap: {
        [applicationName: string]: IApplicationApi;
    };
}
export interface IApplicationApi {
    apiObjectMap: {
        [tokenName: string]: IApiObject;
    };
}
export interface IApiObject {
    operationMap: {
        [operationKey: string]: IApiOperation;
    };
}
//# sourceMappingURL=ApiRegistry.d.ts.map
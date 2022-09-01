import { IApiOperation } from "./ApiOperation";
export interface IApiRegistry {
    initialize(applicationApi: IApplicationApi): void;
    findApiObjectAndOperation(domainName: string, applicationName: string, apiInterfaceName: string, methodName: string): Promise<{
        apiObject: any;
        apiOperation: IApiOperation;
    }>;
    findObjectAndOperationForApi(api: IApplicationApi, domainName: string, applicationName: string, apiInterfaceName: string, methodName: string): Promise<{
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
        [interfaceName: string]: IApiObject;
    };
}
export interface IApiObject {
    operationMap: {
        [operationKey: string]: IApiOperation;
    };
}
//# sourceMappingURL=ApiRegistry.d.ts.map
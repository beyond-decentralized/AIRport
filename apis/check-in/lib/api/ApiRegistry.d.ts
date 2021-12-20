import { IApiOperation } from "./ApiOperation";
export interface IApiRegistry {
    initialize(applicationApi: IApplicationApi): void;
    findApiObjectAndOperation(domainName: string, applicationName: string, apiObjectName: string, methodName: string): Promise<{
        apiObject: any;
        apiOperation: IApiOperation;
    }>;
}
export interface InstalledApi {
    /**
     * TODO: Can a given application be keyed by multiple hashes?  For example,
     * a hash can be generated of each version of the same application.
     */
    applicationApiMap: {
        [applicationApplicationApi: string]: IApplicationApi;
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
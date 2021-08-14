import { IApiOperation } from "./ApiOperation";
export interface IApiRegistry {
    installedApi: InstalledApi;
    findOperation(daoName: string, methodName: string): IApiOperation;
}
export interface InstalledApi {
    schemaApiMap: {
        [schemaHash: string]: ISchemaApi;
    };
}
export interface ISchemaApi {
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
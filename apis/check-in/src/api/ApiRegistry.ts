import { IApiOperation } from "./ApiOperation";

export interface IApiRegistry {

    initialize(
        // installedApi: InstalledApi
        // schemaSignature: string,
        schemaApi: ISchemaApi
    ): void

    findApiObjectAndOperation(
        schemaSignature: string,
        apiObjectName: string,
        methodName: string
    ): Promise<{
        apiObject: any,
        apiOperation: IApiOperation
    }>

}

export interface InstalledApi {
    /**
     * TODO: Can a given schema be keyed by multiple hashes?  For example,
     * a hash can be generated of each version of the same schema.
     */
    schemaApiMap: { [schemaSchemaApi: string]: ISchemaApi }
}

export interface ISchemaApi {
    apiObjectMap: { [tokenName: string]: IApiObject }
}

export interface IApiObject {
    operationMap: { [operationKey: string]: IApiOperation }
}

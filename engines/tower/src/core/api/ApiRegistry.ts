import { container, DI } from "@airport/di";
import {
    API_REGISTRY,
    IApiOperation,
    IApiRegistry,
    InstalledApi,
    ISchemaApi
} from "@airport/check-in";

export class ApiRegistry
    implements IApiRegistry {

    // installedApi: InstalledApi
    schemaApi: ISchemaApi

    initialize(
        // installedApi: InstalledApi
        schemaApi: ISchemaApi
    ): void {
        // this.installedApi = installedApi
        this.schemaApi = schemaApi
    }

    async findApiObjectAndOperation(
        schemaSignature: string,
        apiObjectName: string,
        methodName: string
    ): Promise<{
        apiObject: any,
        apiOperation: IApiOperation
    }> {
        // const schemaApi = this.installedApi.schemaApiMap[schemaSignature]
        // if (!schemaApi) {
        //     throw new Error(`Could not find SchemaAPI for signature:
        //     ${schemaSignature}`)
        // }
        // const apiObjectDefinition = schemaApi.apiObjectMap[apiObjectName]
        const apiObjectDefinition = this.schemaApi.apiObjectMap[apiObjectName]
        if (!apiObjectDefinition) {
            throw new Error(`Could not find API object for 
        Schema signature:
            ${schemaSignature}
        Object name:
            ${apiObjectName}`)
        }
        const apiOperation = apiObjectDefinition.operationMap[methodName]
        if (!apiOperation) {
            throw new Error(`Could not find API object method for 
        Schema signature:
            ${schemaSignature}
        Object name:
            ${apiObjectName}
        Method name:
            ${methodName}`)
        }

        const apiObject = await container(this)
            .getBySchemaSignatureAndName(schemaSignature, apiObjectName);

        return {
            apiObject,
            apiOperation
        }
    }
}
DI.set(API_REGISTRY, ApiRegistry)

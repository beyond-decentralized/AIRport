import { container, DI } from "@airport/di";
import { API_REGISTRY } from "@airport/check-in";
export class ApiRegistry {
    initialize(
    // installedApi: InstalledApi
    applicationApi) {
        // this.installedApi = installedApi
        this.applicationApi = applicationApi;
    }
    async findApiObjectAndOperation(systemName, applicationSignature, apiObjectName, methodName) {
        // const applicationApi = this.installedApi.applicationApiMap[applicationSignature]
        // if (!applicationApi) {
        //     throw new Error(`Could not find ApplicationAPI for signature:
        //     ${applicationSignature}`)
        // }
        // const apiObjectDefinition = applicationApi.apiObjectMap[apiObjectName]
        const apiObjectDefinition = this.applicationApi.apiObjectMap[apiObjectName];
        if (!apiObjectDefinition) {
            throw new Error(`Could not find API object for 
        Application signature:
            ${applicationSignature}
        Token:
            ${apiObjectName}`);
        }
        const apiOperation = apiObjectDefinition.operationMap[methodName];
        if (!apiOperation) {
            throw new Error(`Could not find API object method for 
        Application signature:
            ${applicationSignature}
        Token:
            ${apiObjectName}
        Method name:
            ${methodName}`);
        }
        const apiObject = await container(this)
            .getByApplicationSignatureAndName(systemName, applicationSignature, apiObjectName);
        return {
            apiObject,
            apiOperation
        };
    }
}
DI.set(API_REGISTRY, ApiRegistry);
//# sourceMappingURL=ApiRegistry.js.map
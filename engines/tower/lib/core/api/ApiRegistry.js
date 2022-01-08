import { container, DI } from "@airport/di";
import { API_REGISTRY } from "@airport/check-in";
export class ApiRegistry {
    initialize(
    // installedApi: InstalledApi
    applicationApi) {
        // this.installedApi = installedApi
        this.applicationApi = applicationApi;
    }
    async findApiObjectAndOperation(domainName, applicationName, apiObjectName, methodName) {
        const apiObjectDefinition = this.applicationApi.apiObjectMap[apiObjectName];
        if (!apiObjectDefinition) {
            throw new Error(`Could not find API object for
        Domain:
            ${domainName}
        Application:
            ${applicationName}
        Token:
            ${apiObjectName}`);
        }
        const apiOperation = apiObjectDefinition.operationMap[methodName];
        if (!apiOperation) {
            throw new Error(`Could not find API object method for 
        Domain:
            ${domainName}
        Application:
            ${applicationName}
        Token:
            ${apiObjectName}
        Method name:
            ${methodName}`);
        }
        const apiObject = await container(this)
            .getByNames(domainName, applicationName, apiObjectName);
        return {
            apiObject,
            apiOperation
        };
    }
}
DI.set(API_REGISTRY, ApiRegistry);
//# sourceMappingURL=ApiRegistry.js.map
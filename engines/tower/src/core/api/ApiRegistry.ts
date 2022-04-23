import { container, DEPENDENCY_INJECTION } from "@airport/direction-indicator";
import {
    API_REGISTRY,
    IApiOperation,
    IApiRegistry,
    InstalledApi,
    IApplicationApi
} from "@airport/check-in";

export class ApiRegistry
    implements IApiRegistry {

    // installedApi: InstalledApi
    applicationApi: IApplicationApi

    initialize(
        // installedApi: InstalledApi
        applicationApi: IApplicationApi
    ): void {
        // this.installedApi = installedApi
        this.applicationApi = applicationApi
    }

    async findApiObjectAndOperation(
        domainName: string,
        applicationName: string,
        apiObjectName: string,
        methodName: string
    ): Promise<{
        apiObject: any,
        apiOperation: IApiOperation
    }> {
        const apiObjectDefinition = this.applicationApi.apiObjectMap[apiObjectName]
        if (!apiObjectDefinition) {
            throw new Error(`Could not find API object for
        Domain:
            ${domainName}
        Application:
            ${applicationName}
        Token:
            ${apiObjectName}`)
        }
        const apiOperation = apiObjectDefinition.operationMap[methodName]
        if (!apiOperation) {
            throw new Error(`Could not find API object method for 
        Domain:
            ${domainName}
        Application:
            ${applicationName}
        Token:
            ${apiObjectName}
        Method name:
            ${methodName}`)
        }

        const apiObject = await container(this)
            .getByNames(domainName, applicationName, apiObjectName);

        return {
            apiObject,
            apiOperation
        }
    }
}
DEPENDENCY_INJECTION.set(API_REGISTRY, ApiRegistry)

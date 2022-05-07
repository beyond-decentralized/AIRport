import { IContainerAccessor, Inject } from "@airport/direction-indicator";
import {
    IApiOperation,
    IApiRegistry,
    IApplicationApi
} from "@airport/check-in";
import {
    Injected
} from '@airport/direction-indicator'

@Injected()
export class ApiRegistry
    implements IApiRegistry {

    @Inject()
    containerAccessor: IContainerAccessor

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

        const apiObject = await this.containerAccessor.getContainer(this)
            .getByNames(domainName, applicationName, apiObjectName);

        return {
            apiObject,
            apiOperation
        }
    }
}

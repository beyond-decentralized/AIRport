import { IContainerAccessor, Inject } from "@airport/direction-indicator";
import {
    IApiOperation,
    IApiRegistry,
    IApplicationApi
} from "@airport/check-in";
import {
    Injected
} from '@airport/direction-indicator'
import { IApplicationStore } from "@airport/apron";

@Injected()
export class ApiRegistry
    implements IApiRegistry {

    @Inject()
    containerAccessor: IContainerAccessor

    @Inject()
    applicationStore: IApplicationStore

    initialize(
        applicationApi: IApplicationApi
    ): void {
        this.applicationStore.state.api = applicationApi
    }

    async findApiObjectAndOperation(
        domainName: string,
        applicationName: string,
        apiInterfaceName: string,
        methodName: string
    ): Promise<{
        apiObject: any,
        apiOperation: IApiOperation
    }> {
        const apiObjectDefinition = this.applicationStore.state.api
            .apiObjectMap[apiInterfaceName]
        if (!apiObjectDefinition) {
            throw new Error(`Could not find API object for
        Domain:
            ${domainName}
        Application:
            ${applicationName}
        Interface:
            ${apiInterfaceName}`)
        }
        const apiOperation = apiObjectDefinition.operationMap[methodName]
        if (!apiOperation) {
            throw new Error(`Could not find API object method for 
        Domain:
            ${domainName}
        Application:
            ${applicationName}
        Interface:
            ${apiInterfaceName}
        Method name:
            ${methodName}`)
        }

        const apiObject = await this.containerAccessor.getContainer(this)
            .getByNames(domainName, applicationName, apiInterfaceName);

        return {
            apiObject,
            apiOperation
        }
    }
}

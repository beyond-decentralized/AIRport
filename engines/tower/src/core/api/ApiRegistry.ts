import { IApiOperation, IApiRegistry, IApplicationApi } from "@airport/air-traffic-control";
import { IContainerAccessor, Inject } from "@airport/direction-indicator";
import {
    Injected
} from '@airport/direction-indicator'
import { IApplicationStore } from "../../state/ApplicationStore";

@Injected()
export class ApiRegistry
    implements IApiRegistry {

    @Inject()
    applicationStore: IApplicationStore

    @Inject()
    containerAccessor: IContainerAccessor

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
        return await this.findObjectAndOperationForApi(
            this.applicationStore.state.api,
            domainName,
            applicationName,
            apiInterfaceName,
            methodName
        )
    }

    async findObjectAndOperationForApi(
        api: IApplicationApi,
        domainName: string,
        applicationName: string,
        apiInterfaceName: string,
        methodName: string
    ): Promise<{
        apiObject: any,
        apiOperation: IApiOperation
    }> {
        const apiObjectDefinition = api.apiObjectMap[apiInterfaceName]
        if (!apiObjectDefinition) {
            throw new Error(`Could not find API object for
        Domain:
            ${domainName}
        Application:
            ${applicationName}
        Interface:
            ${apiInterfaceName}
            
            ---===<<<((( Please remember, generator must be run after API modifications )))>>>===---

            `)
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
            ${methodName}
            
            ---===<<<((( Please remember, generator must be run after API modifications )))>>>===---

            `)
        }

        const apiObject = await this.containerAccessor.getContainer(this)
            .getByNames(domainName, applicationName, apiInterfaceName);

        return {
            apiObject,
            apiOperation
        }
    }
}

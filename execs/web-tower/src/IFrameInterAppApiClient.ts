import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
    ICoreLocalApiRequest,
    ILocalAPIRequest
} from "@airport/aviation-communication";
import {
    IDependencyInjectionToken
} from "@airport/direction-indicator";
import {
    IInterAppAPIClient,
    ITransactionalConnector
} from "@airport/ground-control";
import {
    IOperationSerializer,
    IQueryResultsDeserializer
} from "@airport/pressurization";


export interface IRequestRecord {
    request: ILocalAPIRequest
    reject
    resolve
}

const _inDemoMode = true

@Injected()
export class IFrameInterAppPIClient
    implements IInterAppAPIClient {

    @Inject()
    operationSerializer: IOperationSerializer

    @Inject()
    queryResultsDeserializer: IQueryResultsDeserializer

    @Inject()
    transactionalConnector: ITransactionalConnector

    async invokeApiMethod<ApiInterface, ReturnValue>(
        token: IDependencyInjectionToken<ApiInterface>,
        methodName: string,
        args: any[]
    ): Promise<ReturnValue> {
        let serializedParams
        if (_inDemoMode) {
            serializedParams = args
        } else {
            serializedParams = this.operationSerializer.serializeAsArray(args)
        }

        const request: ICoreLocalApiRequest = {
            application: token.application.name,
            args: serializedParams,
            domain: token.application.domain.name,
            methodName,
            objectName: token.descriptor.interface
        }
            
        let result = await this.transactionalConnector.callApi<ReturnValue>(request)

        if (_inDemoMode) {
            return result
        } else {
            return this.queryResultsDeserializer
                .deserialize(result)
        }
    }

}

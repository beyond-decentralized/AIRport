import { Inject, Injected } from "@airport/air-control";
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
            args: serializedParams,
            methodName,
            objectName: token.descriptor.interface
        }

        let response = await this.transactionalConnector.callApi(request)

        if (response.errorMessage) {
            throw new Error(response.errorMessage)
        }

        if (_inDemoMode) {
            return response.payload
        } else {
            return this.queryResultsDeserializer
                .deserialize(response.payload)
        }
    }

}

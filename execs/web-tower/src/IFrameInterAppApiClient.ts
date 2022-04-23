import {
    ICoreLocalApiRequest,
    ILocalAPIRequest
} from "@airport/aviation-communication";
import {
    container,
    DEPENDENCY_INJECTION,
    IDependencyInjectionToken
} from "@airport/direction-indicator";
import {
    IInterAppAPIClient,
    INTER_APP_API_CLIENT,
    ITransactionalConnector
} from "@airport/ground-control";
import {
    OPERATION_SERIALIZER,
    QUERY_RESULTS_DESERIALIZER
} from "@airport/pressurization";


export interface IRequestRecord {
    request: ILocalAPIRequest
    reject
    resolve
}

const _inDemoMode = true

export class IFrameInterAppPIClient
    implements IInterAppAPIClient {

    transactionalConnector: ITransactionalConnector

    async invokeApiMethod<ApiInterface, ReturnValue>(
        token: IDependencyInjectionToken<ApiInterface>,
        methodName: string,
        args: any[]
    ): Promise<ReturnValue> {
        const [operationSerializer, queryResultsDeserializer]
            = await container(this).get(OPERATION_SERIALIZER,
                QUERY_RESULTS_DESERIALIZER)

        let serializedParams
        if (_inDemoMode) {
            serializedParams = args
        } else {
            serializedParams = operationSerializer.serializeAsArray(args)
        }

        const request: ICoreLocalApiRequest = {
            args: serializedParams,
            methodName,
            objectName: token.name
        }

        let response = await this.transactionalConnector.callApi(request)

        if (response.errorMessage) {
            throw new Error(response.errorMessage)
        }

        if (_inDemoMode) {
            return response.payload
        } else {
            return queryResultsDeserializer
                .deserialize(response.payload)
        }
    }

}
DEPENDENCY_INJECTION.set(INTER_APP_API_CLIENT, IFrameInterAppPIClient)

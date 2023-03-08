import {
    IInterAppAPIClient,
    Inject,
    Injected
} from '@airport/direction-indicator'
import {
    ICoreLocalApiRequest,
    ILocalAPIRequest
} from "@airport/aviation-communication";
import {
    IFullDITokenDescriptor
} from "@airport/direction-indicator";
import {
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

const _inWebMode = true

@Injected()
export class IFrameInterAppAPIClient
    implements IInterAppAPIClient {

    @Inject()
    operationSerializer: IOperationSerializer

    @Inject()
    queryResultsDeserializer: IQueryResultsDeserializer

    @Inject()
    transactionalConnector: ITransactionalConnector

    async invokeApiMethod<ApiInterface, ReturnValue>(
        fullDiDescriptor: IFullDITokenDescriptor,
        methodName: string,
        args: any[]
    ): Promise<ReturnValue> {
        let serializedParams
        if (_inWebMode) {
            serializedParams = args
        } else {
            serializedParams = this.operationSerializer.serializeAsArray(args)
        }

        const request: ICoreLocalApiRequest = {
            application: fullDiDescriptor.application.name,
            args: serializedParams,
            domain: fullDiDescriptor.application.domain.name,
            methodName,
            objectName: fullDiDescriptor.descriptor.interface
        }

        let response = await this.transactionalConnector.callApi(request)

        let payload
        if (_inWebMode) {
            payload = response.payload
        } else {
            if (response.payload) {
                payload = this.queryResultsDeserializer
                    .deserialize(response.payload)
            }
        }

        const processedEntities = new Set()

        if (payload) {
            this.queryResultsDeserializer.setPropertyDescriptors(payload, processedEntities)
        }

        for (let i = 0; i < args.length; i++) {
            this.queryResultsDeserializer
                .deepCopyProperties(response.args[i], args[i], new Map(), processedEntities)
        }

        return payload
    }

}

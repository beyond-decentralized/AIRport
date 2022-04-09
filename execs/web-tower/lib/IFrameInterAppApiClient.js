import { container, DI } from "@airport/di";
import { INTER_APP_API_CLIENT, TRANSACTIONAL_CONNECTOR } from "@airport/ground-control";
import { OPERATION_SERIALIZER, QUERY_RESULTS_DESERIALIZER } from "@airport/pressurization";
const _inDemoMode = true;
export class IFrameInterAppPIClient {
    async invokeApiMethod(token, methodName, args) {
        const [operationSerializer, queryResultsDeserializer, transactionalConnector] = await container(this).get(OPERATION_SERIALIZER, QUERY_RESULTS_DESERIALIZER, TRANSACTIONAL_CONNECTOR);
        let serializedParams;
        if (_inDemoMode) {
            serializedParams = args;
        }
        else {
            serializedParams = operationSerializer.serializeAsArray(args);
        }
        const request = {
            args: serializedParams,
            methodName,
            objectName: token.name
        };
        let response = await transactionalConnector.callApi(request);
        if (response.errorMessage) {
            throw new Error(response.errorMessage);
        }
        if (_inDemoMode) {
            return response.payload;
        }
        else {
            return queryResultsDeserializer
                .deserialize(response.payload);
        }
    }
}
DI.set(INTER_APP_API_CLIENT, IFrameInterAppPIClient);
//# sourceMappingURL=IFrameInterAppApiClient.js.map
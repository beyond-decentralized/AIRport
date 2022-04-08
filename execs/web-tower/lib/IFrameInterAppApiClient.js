import { container, DI } from "@airport/di";
import { TRANSACTIONAL_CONNECTOR } from "@airport/ground-control";
import { OPERATION_SERIALIZER, QUERY_RESULTS_DESERIALIZER } from "@airport/pressurization";
import { INTER_APP_API_CLIENT } from "@airport/tower";
import { v4 as uuidv4 } from "uuid";
export class IFrameInterAppPIClient {
    constructor() {
        this.pendingMessageMap = new Map();
    }
    async invokeApiMethod(token, methodName, args) {
        const [operationSerializer, queryResultsDeserializer] = await container(this).get(OPERATION_SERIALIZER, QUERY_RESULTS_DESERIALIZER);
        let serializedParams;
        if (_inDemoMode) {
            serializedParams = args;
        }
        else {
            serializedParams = operationSerializer.serializeAsArray(args);
            if (args) {
                if (args.length) {
                    serializedParams = args
                        .map(arg => operationSerializer.serialize(arg));
                }
                else {
                    serializedParams = [operationSerializer.serialize(args)];
                }
            }
            else {
                serializedParams = [];
            }
        }
        const request = {
            application: token.application.name,
            args: serializedParams,
            category: 'FromClient',
            domain: token.application.domain.name,
            id: uuidv4(),
            methodName,
            objectName: token.name,
            protocol: window.location.protocol,
        };
        let response;
        response = await this.sendApiRequest(request);
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
    returnApiMethodCall(id, result) {
    }
    async sendApiRequest(request) {
        const returnValue = new Promise((resolve, reject) => {
            this.pendingMessageMap.set(request.id, {
                request,
                resolve,
                reject
            });
        });
        const transactionalConnector = await container(this).get(TRANSACTIONAL_CONNECTOR);
        transactionalConnector.sendApiRequest(request);
        return returnValue;
    }
}
DI.set(INTER_APP_API_CLIENT, IFrameInterAppPIClient);
//# sourceMappingURL=IFrameInterAppApiClient.js.map
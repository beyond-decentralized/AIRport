import { container, DI } from "@airport/di";
import { OPERATION_SERIALIZER, QUERY_RESULTS_DESERIALIZER, SERIALIZATION_STATE_MANAGER } from "@airport/pressurization";
import { LOCAL_API_CLIENT } from "../tokens";
import { LocalAPIResponseType } from "./LocalAPIResponse";
export class LocalAPIClient {
    async invokeApiMethod(schemaName, daoName, methodName, args) {
        const [serializationStateManager, operationSerializer, queryResultsDeserializer] = await container(this).get(SERIALIZATION_STATE_MANAGER, OPERATION_SERIALIZER, QUERY_RESULTS_DESERIALIZER);
        let serializedParams;
        if (args) {
            if (args.length) {
                serializedParams = args
                    .map(arg => operationSerializer.serialize(arg, serializationStateManager));
            }
            else {
                serializedParams = [operationSerializer.serialize(args, serializationStateManager)];
            }
        }
        else {
            serializedParams = [];
        }
        const request = {
            args: serializedParams,
            daoName,
            methodName,
            schemaName
        };
        const httpResponse = await fetch('http://localhost:31817', {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'omit',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            // redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'origin',
            body: JSON.stringify(request) // body data type must match "Content-Type" header
        });
        const response = await httpResponse.json();
        if (response.errorMessage) {
            throw new Error(response.errorMessage);
        }
        switch (response.type) {
            case LocalAPIResponseType.QUERY:
                const value = queryResultsDeserializer
                    .deserialize(response.payload, serializationStateManager);
                return value;
            case LocalAPIResponseType.SAVE:
                // Return ISaveRecord as specified in Dao spec
                return response.payload;
            default:
                throw new Error('Unexpected LocalAPIResponseType');
        }
    }
}
DI.set(LOCAL_API_CLIENT, LocalAPIClient);
//# sourceMappingURL=LocalAPIClient.js.map
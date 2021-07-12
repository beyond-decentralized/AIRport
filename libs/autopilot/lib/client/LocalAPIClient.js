import { container, DI } from "@airport/di";
import { ENTITY_STATE_MANAGER, OPERATION_SERIALIZER, QUERY_RESULTS_DESERIALIZER } from "@airport/pressurization";
import { LOCAL_API_CLIENT } from "../tokens";
import { LocalAPIResponseType } from "./LocalAPIResponse";
export class LocalAPIClient {
    async invokeDaoMethod(daoName, methodName, args) {
        const [entityStateManager, operationSerializer, queryResultsDeserializer] = await container(this)
            .get(ENTITY_STATE_MANAGER, OPERATION_SERIALIZER, QUERY_RESULTS_DESERIALIZER);
        let serializedParams;
        if (args) {
            if (args.length) {
                serializedParams = args
                    .map(arg => operationSerializer.serialize(args, entityStateManager));
            }
            else {
                serializedParams = [operationSerializer.serialize(args, entityStateManager)];
            }
        }
        else {
            serializedParams = [];
        }
        const request = {
            args: serializedParams,
            daoName,
            methodName,
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
        switch (response.type) {
            case LocalAPIResponseType.QUERY:
                return queryResultsDeserializer.deserialize(response.payload, entityStateManager);
            case LocalAPIResponseType.SAVE:
                return response.payload;
        }
    }
}
DI.set(LOCAL_API_CLIENT, LocalAPIClient);
//# sourceMappingURL=LocalAPIClient.js.map
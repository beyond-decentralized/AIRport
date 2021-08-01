import { container, DI } from "@airport/di";
import { ENTITY_STATE_MANAGER, OPERATION_SERIALIZER, QUERY_RESULTS_DESERIALIZER } from "@airport/pressurization";
import { LOCAL_API_CLIENT, UPDATE_CACHE_MANAGER } from "../tokens";
import { LocalAPIResponseType } from "./LocalAPIResponse";
export class LocalAPIClient {
    async invokeDaoMethod(schemaName, daoName, methodName, args) {
        const [entityStateManager, operationSerializer, queryResultsDeserializer, updateCacheManager] = await container(this).get(ENTITY_STATE_MANAGER, OPERATION_SERIALIZER, QUERY_RESULTS_DESERIALIZER, UPDATE_CACHE_MANAGER);
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
        updateCacheManager.setOperationState(serializedParams, args, entityStateManager);
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
                    .deserialize(response.payload, entityStateManager);
                updateCacheManager
                    .saveOriginalValues(response.payload, value, entityStateManager);
                return value;
            case LocalAPIResponseType.SAVE:
                updateCacheManager.updateOriginalValuesAfterSave(serializedParams, value, response.payload, entityStateManager);
                // Return ISaveRecord as specified in Dao spec
                return response.payload;
        }
    }
}
DI.set(LOCAL_API_CLIENT, LocalAPIClient);
//# sourceMappingURL=LocalAPIClient.js.map
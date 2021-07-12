import { container, DI } from "@airport/di";
import {
    ENTITY_STATE_MANAGER,
    OPERATION_SERIALIZER,
    QUERY_RESULTS_DESERIALIZER
} from "@airport/pressurization";
import { LOCAL_API_CLIENT } from "../tokens";
import { ILocalAPIRequest } from "./LocalAPIRequest";
import { ILocalAPIResponse, LocalAPIResponseType } from "./LocalAPIResponse";


export interface ILocalAPIClient {

    invokeDaoMethod(
        daoName: string,
        methodName: string,
        args: any[]
    ): Promise<void>;

}

export class LocalAPIClient
    implements ILocalAPIClient {

    async invokeDaoMethod(
        daoName: string,
        methodName: string,
        args: any[]
    ): Promise<any> {
        const [entityStateManager, operationSerializer, queryResultsDeserializer] = await container(this)
            .get(ENTITY_STATE_MANAGER, OPERATION_SERIALIZER, QUERY_RESULTS_DESERIALIZER)
        let serializedParams
        if (args) {
            if (args.length) {
                serializedParams = args
                    .map(arg => operationSerializer.serialize(args, entityStateManager));
            } else {
                serializedParams = [operationSerializer.serialize(args, entityStateManager)];
            }
        } else {
            serializedParams = [];
        }

        const request: ILocalAPIRequest = {
            args: serializedParams,
            daoName,
            methodName,
        }

        const httpResponse = await fetch('http://localhost:31817', {
            method: 'PUT',
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            // redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'origin', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(request) // body data type must match "Content-Type" header
        });
        const response: ILocalAPIResponse = await httpResponse.json();

        switch (response.type) {
            case LocalAPIResponseType.QUERY:
                return queryResultsDeserializer.deserialize(response.payload, entityStateManager);
            case LocalAPIResponseType.SAVE:
                return response.payload;
        }
    }

}
DI.set(LOCAL_API_CLIENT, LocalAPIClient)

import {
    ILocalAPIRequest,
    ILocalAPIResponse
} from "@airport/autopilot";
import {
    OPERATION_DESERIALIZER,
    QUERY_RESULTS_SERIALIZER
} from "@airport/check-in";
import {
    container,
    DI
} from "@airport/di";
import { LOCAL_API_SERVER } from "./tokens";

export interface ILocalAPIServer {

    handleRequest(
        request: ILocalAPIRequest
    ): Promise<ILocalAPIResponse>

}

export class LocalAPIServer
    implements ILocalAPIServer {

    async handleRequest(
        request: ILocalAPIRequest
    ): Promise<ILocalAPIResponse> {
        const result = {};
        const [queryResultsSerializer, operationDeserializer] = await container(this)
            .get(QUERY_RESULTS_SERIALIZER, OPERATION_DESERIALIZER)
        const payload = queryResultsSerializer.serialize(result)

        const response: ILocalAPIResponse = {
            type: null,
            payload
        }

        return response
    }
}
DI.set(LOCAL_API_SERVER, LocalAPIServer)

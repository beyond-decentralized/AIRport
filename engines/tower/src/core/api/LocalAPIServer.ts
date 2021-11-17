import {
    ILocalAPIRequest,
    ILocalAPIResponse
} from "@airport/autopilot";
import { API_REGISTRY } from "@airport/check-in";
import {
    container,
    DI
} from "@airport/di";
import {
    LOCAL_API_SERVER
} from "../../tokens";

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
        const apiRegistry = await container(this).get(API_REGISTRY)

        let payload
        let errorMessage: string
        try {
            const {
                apiObject,
                apiOperation
            } = await apiRegistry.findApiObjectAndOperation(
                request.schemaSignature, request.objectName, request.methodName)
            const result = apiObject[request.methodName].apply(apiObject, request.args)
            if (apiOperation.isAsync) {
                payload = await result
            } else {
                payload = result
            }
        } catch (e) {
            errorMessage = e.message
            console.error(e)
        }

        const response: ILocalAPIResponse = {
            category: 'ToClient',
            errorMessage,
            id: request.id,
            host: request.host,
            protocol: request.protocol,
            payload,
            schemaSignature: request.schemaSignature
        }

        return response
    }


}
DI.set(LOCAL_API_SERVER, LocalAPIServer)

import { API_REGISTRY } from "@airport/check-in";
import { container, DI } from "@airport/di";
import { LOCAL_API_SERVER } from "../../tokens";
export class LocalAPIServer {
    async handleRequest(request) {
        const apiRegistry = await container(this).get(API_REGISTRY);
        let payload;
        let errorMessage;
        try {
            const { apiObject, apiOperation } = await apiRegistry.findApiObjectAndOperation(request.schemaSignature, request.objectName, request.methodName);
            const result = apiObject[request.methodName].apply(apiObject, request.args);
            if (apiOperation.isAsync) {
                payload = await result;
            }
            else {
                payload = result;
            }
        }
        catch (e) {
            errorMessage = e.message;
            console.error(e);
        }
        const response = {
            category: 'ToClient',
            errorMessage,
            id: request.id,
            host: request.host,
            protocol: request.protocol,
            payload,
            schemaSignature: request.schemaSignature
        };
        return response;
    }
}
DI.set(LOCAL_API_SERVER, LocalAPIServer);
//# sourceMappingURL=LocalApiServer.js.map
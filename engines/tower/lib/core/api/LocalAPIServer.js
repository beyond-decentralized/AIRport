export class LocalAPIServer {
    async handleRequest(request) {
        let payload;
        let errorMessage;
        try {
            const { apiObject, apiOperation } = await this.apiRegistry.findApiObjectAndOperation(request.domain, request.application, request.objectName, request.methodName);
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
            application: request.application,
            category: 'ToClient',
            domain: request.domain,
            errorMessage,
            id: request.id,
            methodName: request.methodName,
            objectName: request.objectName,
            protocol: request.protocol,
            payload,
        };
        return response;
    }
}
//# sourceMappingURL=LocalApiServer.js.map
const _inDemoMode = true;
export class IFrameInterAppPIClient {
    async invokeApiMethod(token, methodName, args) {
        let serializedParams;
        if (_inDemoMode) {
            serializedParams = args;
        }
        else {
            serializedParams = this.operationSerializer.serializeAsArray(args);
        }
        const request = {
            args: serializedParams,
            methodName,
            objectName: token.descriptor.interface
        };
        let response = await this.transactionalConnector.callApi(request);
        if (response.errorMessage) {
            throw new Error(response.errorMessage);
        }
        if (_inDemoMode) {
            return response.payload;
        }
        else {
            return this.queryResultsDeserializer
                .deserialize(response.payload);
        }
    }
}
//# sourceMappingURL=IFrameInterAppApiClient.js.map
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
const _inDemoMode = true;
let IFrameInterAppPIClient = class IFrameInterAppPIClient {
    async invokeApiMethod(token, methodName, args) {
        let serializedParams;
        if (_inDemoMode) {
            serializedParams = args;
        }
        else {
            serializedParams = this.operationSerializer.serializeAsArray(args);
        }
        const request = {
            application: token.application.name,
            args: serializedParams,
            domain: token.application.domain.name,
            methodName,
            objectName: token.descriptor.interface
        };
        let response = await this.transactionalConnector.callApi(request);
        let payload;
        if (_inDemoMode) {
            payload = response.payload;
        }
        else {
            if (response.payload) {
                payload = this.queryResultsDeserializer
                    .deserialize(response.payload);
            }
        }
        if (payload) {
            this.queryResultsDeserializer.setPropertyDescriptors(payload);
        }
        for (let i = 0; i < args.length; i++) {
            this.queryResultsDeserializer
                .deepCopyProperties(response.args[i], args[i]);
        }
        return payload;
    }
};
__decorate([
    Inject()
], IFrameInterAppPIClient.prototype, "operationSerializer", void 0);
__decorate([
    Inject()
], IFrameInterAppPIClient.prototype, "queryResultsDeserializer", void 0);
__decorate([
    Inject()
], IFrameInterAppPIClient.prototype, "transactionalConnector", void 0);
IFrameInterAppPIClient = __decorate([
    Injected()
], IFrameInterAppPIClient);
export { IFrameInterAppPIClient };
//# sourceMappingURL=IFrameInterAppApiClient.js.map
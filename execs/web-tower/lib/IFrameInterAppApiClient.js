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
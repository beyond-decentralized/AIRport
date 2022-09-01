var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
let LocalAPIServer = class LocalAPIServer {
    async handleRequest(request) {
        let payload;
        let errorMessage;
        try {
            // TODO: this should be inside coreHandleRequest after retrieval
            // of apiOperation.  For that requestManager must be supported
            // by the main @airport/terminal. It works in App VMs since
            // a new requestManager object is created per request but
            // currently does not work in @airport/terminal (since there is
            // no per-request creating of injected objects).
            this.requestManager.actor = request.actor;
            this.requestManager.userAccount = request.actor.userAccount;
            payload = await this.coreHandleRequest(request, this.applicationStore.state.api);
        }
        catch (e) {
            errorMessage = e.message ? e.message : e;
            console.error(e);
        }
        const response = {
            application: request.application,
            args: request.args,
            category: 'ToClient',
            domain: request.domain,
            errorMessage,
            id: request.id,
            hostDomain: request.hostDomain,
            hostProtocol: request.hostProtocol,
            methodName: request.methodName,
            objectName: request.objectName,
            protocol: request.protocol,
            payload,
            transactionId: request.transactionId
        };
        return response;
    }
    async coreHandleRequest(request, api) {
        const { apiObject, apiOperation } = await this.apiRegistry.findObjectAndOperationForApi(api, request.domain, request.application, request.objectName, request.methodName);
        const result = apiObject[request.methodName].apply(apiObject, request.args);
        if (apiOperation.isAsync) {
            return await result;
        }
        else {
            return result;
        }
    }
};
__decorate([
    Inject()
], LocalAPIServer.prototype, "apiRegistry", void 0);
__decorate([
    Inject()
], LocalAPIServer.prototype, "applicationStore", void 0);
__decorate([
    Inject()
], LocalAPIServer.prototype, "requestManager", void 0);
LocalAPIServer = __decorate([
    Injected()
], LocalAPIServer);
export { LocalAPIServer };
//# sourceMappingURL=LocalApiServer.js.map
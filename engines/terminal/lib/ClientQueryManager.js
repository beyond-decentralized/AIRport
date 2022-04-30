var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injected } from "@airport/air-control";
/**
 * TODO: probably not-needed - queries no longer come from
 * the client directly.  They can come from the client but
 * are considered generic API calls. DaoRegistry is now
 * replaced with API registry.
 */
let ClientQueryManager = class ClientQueryManager {
    async getClientQuery(applicationName, daoName, methodName) {
        // const daoRegistry = await container(this).get(DAO_REGISTRY)
        throw new Error('TODO: implement');
    }
};
ClientQueryManager = __decorate([
    Injected()
], ClientQueryManager);
export { ClientQueryManager };
//# sourceMappingURL=ClientQueryManager.js.map
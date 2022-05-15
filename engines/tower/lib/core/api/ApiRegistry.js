var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject } from "@airport/direction-indicator";
import { Injected } from '@airport/direction-indicator';
let ApiRegistry = class ApiRegistry {
    initialize(applicationApi) {
        this.applicationStore.state.api = applicationApi;
    }
    async findApiObjectAndOperation(domainName, applicationName, apiInterfaceName, methodName) {
        const apiObjectDefinition = this.applicationStore.state.api
            .apiObjectMap[apiInterfaceName];
        if (!apiObjectDefinition) {
            throw new Error(`Could not find API object for
        Domain:
            ${domainName}
        Application:
            ${applicationName}
        Interface:
            ${apiInterfaceName}
            
            ---===<<<((( Please remember, generator must be run after API modifications )))>>>===---

            `);
        }
        const apiOperation = apiObjectDefinition.operationMap[methodName];
        if (!apiOperation) {
            throw new Error(`Could not find API object method for 
        Domain:
            ${domainName}
        Application:
            ${applicationName}
        Interface:
            ${apiInterfaceName}
        Method name:
            ${methodName}
            
            ---===<<<((( Please remember, generator must be run after API modifications )))>>>===---

            `);
        }
        const apiObject = await this.containerAccessor.getContainer(this)
            .getByNames(domainName, applicationName, apiInterfaceName);
        return {
            apiObject,
            apiOperation
        };
    }
};
__decorate([
    Inject()
], ApiRegistry.prototype, "containerAccessor", void 0);
__decorate([
    Inject()
], ApiRegistry.prototype, "applicationStore", void 0);
ApiRegistry = __decorate([
    Injected()
], ApiRegistry);
export { ApiRegistry };
//# sourceMappingURL=ApiRegistry.js.map
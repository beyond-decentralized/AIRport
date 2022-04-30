var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { container } from "@airport/direction-indicator";
import { Injected } from "@airport/air-control";
let ApiRegistry = class ApiRegistry {
    initialize(
    // installedApi: InstalledApi
    applicationApi) {
        // this.installedApi = installedApi
        this.applicationApi = applicationApi;
    }
    async findApiObjectAndOperation(domainName, applicationName, apiObjectName, methodName) {
        const apiObjectDefinition = this.applicationApi.apiObjectMap[apiObjectName];
        if (!apiObjectDefinition) {
            throw new Error(`Could not find API object for
        Domain:
            ${domainName}
        Application:
            ${applicationName}
        Token:
            ${apiObjectName}`);
        }
        const apiOperation = apiObjectDefinition.operationMap[methodName];
        if (!apiOperation) {
            throw new Error(`Could not find API object method for 
        Domain:
            ${domainName}
        Application:
            ${applicationName}
        Token:
            ${apiObjectName}
        Method name:
            ${methodName}`);
        }
        const apiObject = await container(this)
            .getByNames(domainName, applicationName, apiObjectName);
        return {
            apiObject,
            apiOperation
        };
    }
};
ApiRegistry = __decorate([
    Injected()
], ApiRegistry);
export { ApiRegistry };
//# sourceMappingURL=ApiRegistry.js.map
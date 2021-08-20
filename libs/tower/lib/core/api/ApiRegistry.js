import { DI } from "@airport/di";
import { API_REGISTRY } from "@airport/security-check";
export class ApiRegistry {
    findOperation(apiObjectName, methodName) {
        throw new Error('TODO: implement');
    }
}
DI.set(API_REGISTRY, ApiRegistry);
//# sourceMappingURL=ApiRegistry.js.map
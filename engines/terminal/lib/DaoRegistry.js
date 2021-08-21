import { DI } from "@airport/di";
import { DAO_REGISTRY } from "./tokens";
export var DaoOperationType;
(function (DaoOperationType) {
    DaoOperationType[DaoOperationType["ADD_REPOSITORY"] = 0] = "ADD_REPOSITORY";
    DaoOperationType[DaoOperationType["FIND"] = 1] = "FIND";
    DaoOperationType[DaoOperationType["FIND_ONE"] = 2] = "FIND_ONE";
    DaoOperationType[DaoOperationType["SAVE"] = 3] = "SAVE";
    DaoOperationType[DaoOperationType["SEARCH"] = 4] = "SEARCH";
    DaoOperationType[DaoOperationType["SEARCH_ONE"] = 5] = "SEARCH_ONE";
})(DaoOperationType || (DaoOperationType = {}));
export class DaoRegistry {
    findOperation(daoName, methodName) {
        throw new Error('TODO: implement');
    }
}
DI.set(DAO_REGISTRY, DaoRegistry);
//# sourceMappingURL=DaoRegistry.js.map
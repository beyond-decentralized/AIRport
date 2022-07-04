var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UiStateManager_1;
import { Injected } from "@airport/direction-indicator";
export var EntityState;
(function (EntityState) {
    EntityState["CREATE"] = "CREATE";
    EntityState["DATE"] = "DATE";
    EntityState["DELETE"] = "DELETE";
    EntityState["PARENT_SCHEMA_ID"] = "PARENT_SCHEMA_LID";
    EntityState["STUB"] = "STUB";
    EntityState["UPDATE"] = "UPDATE";
})(EntityState || (EntityState = {}));
let UiStateManager = UiStateManager_1 = class UiStateManager {
    isStub(entity) {
        return this.getEntityState(entity) === EntityState.STUB;
    }
    isParentSchemaId(entity) {
        return this.getEntityState(entity) === EntityState.PARENT_SCHEMA_ID;
    }
    markForDeletion(entity, arrayToRemoveFrom) {
        entity[UiStateManager_1.STATE_FIELD] = EntityState.DELETE;
        if (!arrayToRemoveFrom) {
            return;
        }
        for (let i = arrayToRemoveFrom.length - 1; i >= 0; i--) {
            if (arrayToRemoveFrom[i] === entity) {
                arrayToRemoveFrom.splice(i, 1);
                break;
            }
        }
    }
    isDeleted(entity) {
        return entity[UiStateManager_1.STATE_FIELD] === EntityState.DELETE;
    }
    markAsStub(entity) {
        entity[UiStateManager_1.STATE_FIELD] = EntityState.STUB;
    }
    getEntityState(entity) {
        return entity[UiStateManager_1.STATE_FIELD];
    }
};
UiStateManager.STATE_FIELD = '__state__';
UiStateManager = UiStateManager_1 = __decorate([
    Injected()
], UiStateManager);
export { UiStateManager };
//# sourceMappingURL=UiStateManager.js.map
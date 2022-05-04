var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SerializationStateManager_1;
import { Injected } from "@airport/direction-indicator";
export var SerializationState;
(function (SerializationState) {
    SerializationState["DATE"] = "DATE";
    SerializationState["STUB"] = "STUB";
})(SerializationState || (SerializationState = {}));
let SerializationStateManager = SerializationStateManager_1 = class SerializationStateManager {
    getSerializationUniqueId(entity, throwIfNotFound = true) {
        const serializationUniqueId = entity[SerializationStateManager_1.SERIALIZATION_UNIQUE_ID_FIELD];
        if (!serializationUniqueId || typeof serializationUniqueId !== 'number' || serializationUniqueId < 1) {
            if (throwIfNotFound) {
                throw new Error(`Could not find "${SerializationStateManager_1.SERIALIZATION_UNIQUE_ID_FIELD}" property on DTO:
        
        ${JSON.stringify(entity)}`);
            }
        }
        return serializationUniqueId;
    }
    getEntityState(entity) {
        return entity[SerializationStateManager_1.SERIALIZATION_STATE_FIELD];
    }
    markAsStub(entity) {
        this.markAs(entity, SerializationState.STUB);
    }
    isStub(entity) {
        return this.is(entity, SerializationState.STUB);
    }
    serializeAsDate(value) {
        return {
            __serializationState__: SerializationState.DATE,
            value: value.toISOString()
        };
    }
    isDate(entity) {
        return this.is(entity, SerializationState.DATE);
    }
    getUniqueIdFieldName() {
        return SerializationStateManager_1.SERIALIZATION_UNIQUE_ID_FIELD;
    }
    // getStateFieldName(): string {
    //     return SerializationStateManager.SERIALIZATION_STATE_FIELD
    // }
    is(entity, serializationState) {
        return entity[SerializationStateManager_1.SERIALIZATION_STATE_FIELD] == serializationState;
    }
    markAs(entity, serializationState) {
        entity[SerializationStateManager_1.SERIALIZATION_STATE_FIELD] = serializationState;
    }
};
SerializationStateManager.SERIALIZATION_UNIQUE_ID_FIELD = '__SUID__';
SerializationStateManager.SERIALIZATION_STATE_FIELD = '__serializationState__';
SerializationStateManager = SerializationStateManager_1 = __decorate([
    Injected()
], SerializationStateManager);
export { SerializationStateManager };
//# sourceMappingURL=SerializationStateManager.js.map
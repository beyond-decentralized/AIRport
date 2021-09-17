import { DI } from "@airport/di";
import { SERIALIZATION_STATE_MANAGER } from "./tokens";
export var SerializationState;
(function (SerializationState) {
    SerializationState["DATE"] = "DATE";
    SerializationState["STUB"] = "STUB";
})(SerializationState || (SerializationState = {}));
export class SerializationStateManager {
    getSerializationUniqueId(entity, throwIfNotFound = true) {
        const serializationUniqueId = entity[SerializationStateManager.SERIALIZATION_UNIQUE_ID_FIELD];
        if (!serializationUniqueId || typeof serializationUniqueId !== 'number' || serializationUniqueId < 1) {
            if (throwIfNotFound) {
                throw new Error(`Could not find "${SerializationStateManager.SERIALIZATION_UNIQUE_ID_FIELD}" property on DTO:
        
        ${JSON.stringify(entity)}`);
            }
        }
        return serializationUniqueId;
    }
    getEntityState(entity) {
        return entity[SerializationStateManager.SERIALIZATION_STATE_FIELD];
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
        return SerializationStateManager.SERIALIZATION_UNIQUE_ID_FIELD;
    }
    // getStateFieldName(): string {
    //     return SerializationStateManager.SERIALIZATION_STATE_FIELD
    // }
    is(entity, serializationState) {
        return entity[SerializationStateManager.SERIALIZATION_STATE_FIELD] == serializationState;
    }
    markAs(entity, serializationState) {
        entity[SerializationStateManager.SERIALIZATION_STATE_FIELD] = serializationState;
    }
}
SerializationStateManager.SERIALIZATION_UNIQUE_ID_FIELD = '__SUID__';
SerializationStateManager.SERIALIZATION_STATE_FIELD = '__serializationState__';
DI.set(SERIALIZATION_STATE_MANAGER, SerializationStateManager);
//# sourceMappingURL=SerializationStateManager.js.map
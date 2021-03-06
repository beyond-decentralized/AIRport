var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
let OperationSerializer = class OperationSerializer {
    serializeAsArray(entity) {
        let serializedEntity = [];
        if (!entity) {
            return serializedEntity;
        }
        if (entity instanceof Array) {
            serializedEntity = entity
                .map(anEntity => this.serialize(anEntity));
        }
        else {
            serializedEntity = [this.serialize(entity)];
        }
        return serializedEntity;
    }
    serialize(entity) {
        const operation = {
            namePath: ['root'],
            processedEntityMap: new Map(),
            sequence: 0,
            stubLookupTable: [],
        };
        return this.doSerialize(entity, operation);
    }
    doSerialize(entity, operation) {
        if (entity instanceof Object) {
            if (entity instanceof Array) {
                return entity.map(anEntity => this.doSerialize(anEntity, operation));
            }
            else if (entity instanceof Date) {
                return this.serializationStateManager.serializeAsDate(entity);
            }
        }
        else {
            return entity;
        }
        let operationUniqueId = operation.processedEntityMap.get(entity);
        if (operationUniqueId) {
            return operation.stubLookupTable[operationUniqueId];
        }
        operationUniqueId = ++operation.sequence;
        operation.processedEntityMap.set(entity, operationUniqueId);
        let entityStub = {};
        this.serializationStateManager.markAsStub(entity);
        entityStub[this.serializationStateManager.getUniqueIdFieldName()] = operationUniqueId;
        operation.stubLookupTable[operationUniqueId] = entityStub;
        let serializedEntity = {};
        serializedEntity[this.serializationStateManager.getUniqueIdFieldName()] = operationUniqueId;
        var isFirstProperty = true;
        for (const propertyName in entity) {
            const property = entity[propertyName];
            // const propertyState = property[serializationStateManager.getStateFieldName()]
            let propertyCopy;
            if (!isFirstProperty) {
                operation.namePath.pop();
            }
            isFirstProperty = false;
            operation.namePath.push(propertyName);
            if (property instanceof Object) {
                if (property instanceof Array) {
                    // if (propertyState === EntityState.RESULT_JSON_ARRAY) {
                    // 	propertyCopy = {
                    // 		value: JSON.stringify(property)
                    // 	}
                    // 	propertyCopy[entityStateManager.getStateFieldName()] = propertyState
                    // } else {
                    propertyCopy = property.map(aProperty => this.doSerialize(aProperty, operation));
                    // }
                }
                else if (property instanceof Date) {
                    propertyCopy = this.serializationStateManager.serializeAsDate(property);
                }
                else {
                    // if (propertyState === EntityState.RESULT_JSON) {
                    // 	propertyCopy = {
                    // 		value: JSON.stringify(property)
                    // 	}
                    // 	propertyCopy[entityStateManager.getStateFieldName()] = propertyState
                    // } else {
                    propertyCopy = this.doSerialize(property, operation);
                    // }
                }
            }
            else {
                // switch (propertyState) {
                // 	// case EntityState.RESULT_JSON_ARRAY:
                // 	// 	if (property) {
                // 	// 		throw new Error(`Expecting an Array for "${operation.namePath.join('.')}", got: ${property}`)
                // 	// 	}
                // 	// 	break
                // 	// case EntityState.RESULT_JSON:
                // 	// 	if (property) {
                // 	// 		throw new Error(`Expecting an Object for "${operation.namePath.join('.')}", got: ${property}`)
                // 	// 	}
                // 	// 	break
                // 	case SerializationState.DATE:
                // 		if (property) {
                // 			throw new Error(`Expecting a Date for "${operation.namePath.join('.')}", got: ${property}`)
                // 		}
                // 		break
                // 	default:
                propertyCopy = property;
                // break
                // }
            }
            serializedEntity[propertyName] = propertyCopy;
        }
        if (!isFirstProperty) {
            operation.namePath.pop();
        }
        return serializedEntity;
    }
};
__decorate([
    Inject()
], OperationSerializer.prototype, "serializationStateManager", void 0);
OperationSerializer = __decorate([
    Injected()
], OperationSerializer);
export { OperationSerializer };
//# sourceMappingURL=OperationSerializer.js.map
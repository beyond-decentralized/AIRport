import { DI } from '@airport/di';
import { SerializationState } from './SerializationStateManager';
import { OPERATION_SERIALIZER } from './tokens';
export class OperationSerializer {
    serialize(entity, serializationStateManager) {
        const operation = {
            namePath: ['root'],
            processedEntityMap: new Map(),
            sequence: 0,
            stubLookupTable: [],
        };
        return this.doSerialize(entity, operation, serializationStateManager);
    }
    doSerialize(entity, operation, serializationStateManager) {
        if (entity instanceof Object) {
            if (entity instanceof Array) {
                return entity.map(anEntity => this.doSerialize(anEntity, operation, serializationStateManager));
            }
            else if (entity instanceof Date) {
                return serializationStateManager.serializeAsDate(entity);
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
        serializationStateManager.markAsStub(entity);
        entityStub[serializationStateManager.getUniqueIdFieldName()] = operationUniqueId;
        operation.stubLookupTable[operationUniqueId] = entityStub;
        let serializedEntity = {};
        serializedEntity[serializationStateManager.getUniqueIdFieldName()] = operationUniqueId;
        var isFirstProperty = true;
        for (const propertyName in entity) {
            const property = entity[propertyName];
            const propertyState = property[serializationStateManager.getStateFieldName()];
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
                    propertyCopy = property.map(aProperty => this.doSerialize(aProperty, operation, serializationStateManager));
                    // }
                }
                else if (property instanceof Date) {
                    propertyCopy = serializationStateManager.serializeAsDate(property);
                }
                else {
                    // if (propertyState === EntityState.RESULT_JSON) {
                    // 	propertyCopy = {
                    // 		value: JSON.stringify(property)
                    // 	}
                    // 	propertyCopy[entityStateManager.getStateFieldName()] = propertyState
                    // } else {
                    propertyCopy = this.doSerialize(property, operation, serializationStateManager);
                    // }
                }
            }
            else {
                switch (propertyState) {
                    // case EntityState.RESULT_JSON_ARRAY:
                    // 	if (property) {
                    // 		throw new Error(`Expecting an Array for "${operation.namePath.join('.')}", got: ${property}`)
                    // 	}
                    // 	break
                    // case EntityState.RESULT_JSON:
                    // 	if (property) {
                    // 		throw new Error(`Expecting an Object for "${operation.namePath.join('.')}", got: ${property}`)
                    // 	}
                    // 	break
                    case SerializationState.DATE:
                        if (property) {
                            throw new Error(`Expecting a Date for "${operation.namePath.join('.')}", got: ${property}`);
                        }
                        break;
                    default:
                        propertyCopy = property;
                        break;
                }
            }
            serializedEntity[propertyName] = propertyCopy;
        }
        if (!isFirstProperty) {
            operation.namePath.pop();
        }
        return serializedEntity;
    }
}
DI.set(OPERATION_SERIALIZER, OperationSerializer);
//# sourceMappingURL=OperationSerializer.js.map
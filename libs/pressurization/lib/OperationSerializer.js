import { DI } from '@airport/di';
import { EntityState } from '@airport/ground-control';
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
                var copy = {
                    value: entity.toISOString()
                };
                copy[serializationStateManager.getStateFieldName()] = EntityState.RESULT_DATE;
                return copy;
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
        entityStub[entityStateManager.getUniqueIdFieldName()] = operationUniqueId;
        entityStub[entityStateManager.getStateFieldName()] = EntityState.STUB;
        operation.stubLookupTable[operationUniqueId] = entityStub;
        let serializedEntity = {};
        serializedEntity[entityStateManager.getUniqueIdFieldName()] = operationUniqueId;
        var isFirstProperty = true;
        for (const propertyName in entity) {
            const property = entity[propertyName];
            const propertyState = property[entityStateManager.getStateFieldName()];
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
                    propertyCopy = property.map(aProperty => this.doSerialize(aProperty, operation, entityStateManager));
                    // }
                }
                else if (property instanceof Date) {
                    propertyCopy = {
                        value: property.toISOString()
                    };
                    propertyCopy[entityStateManager.getStateFieldName()] = EntityState.RESULT_DATE;
                }
                else {
                    // if (propertyState === EntityState.RESULT_JSON) {
                    // 	propertyCopy = {
                    // 		value: JSON.stringify(property)
                    // 	}
                    // 	propertyCopy[entityStateManager.getStateFieldName()] = propertyState
                    // } else {
                    propertyCopy = this.doSerialize(property, operation, entityStateManager);
                    // }
                }
            }
            else {
                propertyCopy = {
                    value: null
                };
                propertyCopy[entityStateManager.getStateFieldName()] = propertyState;
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
                    case EntityState.RESULT_DATE:
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
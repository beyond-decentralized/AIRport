import { EntityState } from '@airport/air-control';
import { DI } from '@airport/di';
import { OPERATION_SERIALIZER } from '../tokens';
export class OperationSerializer {
    serialize(entity, entityStateManager) {
        const operation = {
            lookupTable: [],
            sequence: 0,
            stubLookupTable: []
        };
        let serializedEntity;
        if (entity instanceof Array) {
            serializedEntity = entity.map(anEntity => this.doSerialize(anEntity, operation, entityStateManager));
        }
        else {
            serializedEntity = this.doSerialize(entity, operation, entityStateManager);
        }
        for (let i = 1; i < operation.lookupTable.length; i++) {
            delete operation.lookupTable[i][entityStateManager.getUniqueIdFieldName()];
        }
        return serializedEntity;
    }
    doSerialize(entity, operation, entityStateManager) {
        // TODO: add support for non-create operations
        let operationUniqueId = entityStateManager.getOperationUniqueId(entity);
        if (operationUniqueId) {
            return operation.stubLookupTable[operationUniqueId];
        }
        operationUniqueId = ++operation.sequence;
        let entityStub = {};
        entityStub[entityStateManager.getUniqueIdFieldName()] = operationUniqueId;
        entityStub[entityStateManager.getStateFieldName()] = EntityState.STUB;
        operation.stubLookupTable[operationUniqueId] = entityStub;
        let entityCopy = {};
        operation.lookupTable[operationUniqueId] = entity;
        entityCopy[entityStateManager.getUniqueIdFieldName()] = operationUniqueId;
        let isCreate = true;
        let entityState = EntityState.STUB;
        if (entity['id']) {
            isCreate = false;
            entityState = EntityState.CREATE;
        }
        entityStub[entityStateManager.getStateFieldName()] = entityState;
        for (const propertyName in entity) {
            const property = entity[propertyName];
            let propertyCopy;
            if (property instanceof Object) {
                if (property instanceof Array) {
                    propertyCopy = property.map(aProperty => this.doSerialize(aProperty, operation, entityStateManager));
                }
                else if (property instanceof Date) {
                    propertyCopy = property.toISOString();
                }
                else {
                    propertyCopy = this.doSerialize(property, operation, entityStateManager);
                }
            }
            else {
                propertyCopy = property;
            }
            entityCopy[propertyName] = propertyCopy;
        }
        return entityCopy;
    }
}
DI.set(OPERATION_SERIALIZER, OperationSerializer);
//# sourceMappingURL=OperationSerializer.js.map
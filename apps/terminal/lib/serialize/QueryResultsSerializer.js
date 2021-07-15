import { DI } from '@airport/di';
import { EntityState } from '@airport/pressurization';
import { QUERY_RESULTS_SERIALIZER } from '@airport/check-in';
export class QueryResultsSerializer {
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
        entityCopy[entityStateManager.getStateFieldName()] = EntityState.RESULT;
        for (const propertyName in entity) {
            const property = entity[propertyName];
            let propertyCopy;
            if (property instanceof Object) {
                if (property instanceof Array) {
                    propertyCopy = property.map(aProperty => this.doSerialize(aProperty, operation, entityStateManager));
                }
                else if (property instanceof Date) {
                    propertyCopy = {
                        value: property.toISOString()
                    };
                    propertyCopy[entityStateManager.getStateFieldName()] = EntityState.RESULT_DATE;
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
DI.set(QUERY_RESULTS_SERIALIZER, QueryResultsSerializer);
//# sourceMappingURL=QueryResultsSerializer.js.map
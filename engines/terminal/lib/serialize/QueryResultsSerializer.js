import { QUERY_RESULTS_SERIALIZER } from '@airport/check-in';
import { DI } from '@airport/di';
import { EntityState, SQLDataType } from '@airport/ground-control';
// TODO: figure out if this is needed - originally written for serializing
// query resuts returned to the client.  Since then moved to Isolates and
// generic API calls.  Probably should be used in go-tower to serialize
// the values returned (and won't be tied to a query of any kind, API
// interface is generic, unless already known to contain entity objects.)
export class QueryResultsSerializer {
    serialize(entity, dbEntity, entityStateManager, schemaUtils) {
        const operation = {
            lookupTable: [],
            sequence: 0,
            stubLookupTable: []
        };
        let serializedEntity;
        if (entity instanceof Array) {
            serializedEntity = entity.map(anEntity => this.doSerialize(anEntity, dbEntity, operation, entityStateManager, schemaUtils));
        }
        else {
            serializedEntity = this.doSerialize(entity, dbEntity, operation, entityStateManager, schemaUtils);
        }
        for (let i = 1; i < operation.lookupTable.length; i++) {
            delete operation.lookupTable[i][entityStateManager.getUniqueIdFieldName()];
        }
        return serializedEntity;
    }
    doSerialize(entity, dbEntity, operation, entityStateManager, schemaUtils) {
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
        for (const dbProperty of dbEntity.properties) {
            let property = entity[dbProperty.name];
            if (schemaUtils.isEmpty(property)) {
                continue;
            }
            let propertyCopy;
            if (dbProperty.relation) {
                const dbRelation = dbProperty.relation[0];
                if (property instanceof Array) {
                    propertyCopy = property.map(manyObject => {
                        this.doSerialize(manyObject, dbRelation.relationEntity, operation, entityStateManager, schemaUtils);
                    });
                }
                else {
                    propertyCopy = this.doSerialize(property, dbRelation.relationEntity, operation, entityStateManager, schemaUtils);
                }
            }
            else {
                switch (dbProperty.propertyColumns[0].column.type) {
                    case SQLDataType.JSON:
                        // 	if (property instanceof Array) {
                        // 		propertyCopy = {
                        // 			value: property
                        // 		}
                        // 		propertyCopy[entityStateManager.getStateFieldName()]
                        // 			= EntityState.RESULT_JSON_ARRAY
                        // 	} else {
                        // 		propertyCopy = property
                        // 		propertyCopy[entityStateManager.getStateFieldName()]
                        // 			= EntityState.RESULT_JSON
                        // 	}
                        throw new Error(`@Json() properties cannot be serialized.`);
                        break;
                    case SQLDataType.DATE:
                        propertyCopy = {
                            value: property.toISOString()
                        };
                        propertyCopy[entityStateManager.getStateFieldName()]
                            = EntityState.DATE;
                        break;
                    case SQLDataType.ANY:
                    case SQLDataType.BOOLEAN:
                    case SQLDataType.NUMBER:
                    case SQLDataType.STRING:
                        propertyCopy = property;
                        break;
                    default:
                        throw new Error(`Unsupported data type for property ${dbEntity.schemaVersion.schema.name}.${dbEntity.name}.${dbProperty.name}`);
                }
            }
            entityCopy[dbProperty.name] = propertyCopy;
        }
        return entityCopy;
    }
}
DI.set(QUERY_RESULTS_SERIALIZER, QueryResultsSerializer);
//# sourceMappingURL=QueryResultsSerializer.js.map
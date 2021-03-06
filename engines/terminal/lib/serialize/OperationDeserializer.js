import { OPERATION_DESERIALIZER } from "@airport/check-in";
import { DI } from "@airport/di";
import { EntityRelationType, SQLDataType } from "@airport/ground-control";
export class OperationDeserializer {
    deserialize(entity, dbEntity, entityStateManager, schemaUtils) {
        const operation = {
            lookupTable: [],
        };
        let deserializedEntity;
        if (entity instanceof Array) {
            deserializedEntity = entity.map(anEntity => this.doDeserialize(anEntity, dbEntity, operation, entityStateManager, schemaUtils));
        }
        else {
            deserializedEntity = this.doDeserialize(entity, dbEntity, operation, entityStateManager, schemaUtils);
        }
        return deserializedEntity;
    }
    doDeserialize(entity, dbEntity, operation, entityStateManager, schemaUtils) {
        let state = entityStateManager.getEntityState(entity);
        let operationUniqueId = entityStateManager.getOperationUniqueId(entity);
        if (!operationUniqueId || typeof operationUniqueId !== 'number'
            || operationUniqueId < 1 || operationUniqueId % 1 === 0) {
            throw new Error(`Invalid or missing ${entityStateManager.getUniqueIdFieldName()} field.`);
        }
        let alreadyDeserializedEntity = operation.lookupTable[operationUniqueId];
        switch (state) {
            case EntityState.STUB: {
                let alreadyDeserializedEntity = operation.lookupTable[operationUniqueId];
                if (!alreadyDeserializedEntity) {
                    throw new Error(`Could not find an already present entity for
					${entityStateManager.getUniqueIdFieldName()} of ${operationUniqueId}`);
                }
                return alreadyDeserializedEntity;
            }
            default:
                if (alreadyDeserializedEntity) {
                    throw new Error(`Entity appears more than once for
					${entityStateManager.getUniqueIdFieldName()} of ${operationUniqueId}`);
                }
        }
        let deserializedEntity = {};
        operation.lookupTable[operationUniqueId] = deserializedEntity;
        deserializedEntity[entityStateManager.getStateFieldName()] = state;
        for (const dbProperty of dbEntity.properties) {
            let value = entity[dbProperty.name];
            if (schemaUtils.isEmpty(value)) {
                continue;
            }
            let propertyCopy;
            if (dbProperty.relation) {
                const dbRelation = dbProperty.relation[0];
                switch (dbRelation.relationType) {
                    case EntityRelationType.ONE_TO_MANY:
                        if (!(value instanceof Array)) {
                            throw new Error(`Expecting @OneToMany for an array entity relation`);
                        }
                        propertyCopy = value.map(aProperty => this.doDeserialize(aProperty, dbRelation.entity, operation, entityStateManager, schemaUtils));
                        break;
                    case EntityRelationType.MANY_TO_ONE:
                        if (!(value instanceof Object) || value instanceof Array) {
                            throw new Error(`Expecting @ManyToOne for a non-array entity relation`);
                        }
                        propertyCopy = this.doDeserialize(value, dbRelation.entity, operation, entityStateManager, schemaUtils);
                        break;
                    default:
                        throw new Error(`Unknown relation type: ${dbRelation.relationType}`);
                }
            }
            else {
                const dbColumn = dbProperty.propertyColumns[0].column;
                switch (dbColumn.type) {
                    // case SQLDataType.JSON:
                    //     propertyCopy = this.cleanJsonObject(value, dbProperty, entityStateManager)
                    //     break
                    case SQLDataType.DATE:
                        if (!(value instanceof Object)
                            || value[entityStateManager.getStateFieldName()] !== EntityState.RESULT_DATE
                            || !value.value) {
                            throw new Error(`Invalid Serialized Date format for ${dbEntity.name}.${dbProperty.name}`);
                        }
                        try {
                            propertyCopy = new Date(value);
                        }
                        catch (e) {
                            throw new Error(`Invalid Serialized Date format for ${dbEntity.name}.${dbProperty.name}`);
                        }
                        break;
                    case SQLDataType.BOOLEAN:
                    case SQLDataType.NUMBER:
                    case SQLDataType.STRING:
                        propertyCopy = value;
                        break;
                    default:
                        throw new Error(`Unexpected data type for ${dbEntity.name}.${dbProperty.name}`);
                }
            }
            deserializedEntity[dbProperty.name] = propertyCopy;
        }
        return deserializedEntity;
    }
    cleanJsonObject(value, dbProperty, entityStateManager) {
        let valueCopy;
        if (value instanceof Object) {
            if (value instanceof Array) {
                valueCopy = value.map(aValue => this.cleanJsonObject(aValue, dbProperty, entityStateManager));
            }
            else {
                valueCopy = {};
                if (value[entityStateManager.getStateFieldName()] === EntityState.STUB) {
                    throw new Error(`Interlinked object graphs are not supported in @Json() columns 
                    ${dbProperty.entity.name}.${dbProperty.name}`);
                }
                delete value[entityStateManager.getStateFieldName()];
                delete value[entityStateManager.getUniqueIdFieldName()];
                for (const propertyName in value) {
                    const property = value[propertyName];
                    valueCopy[propertyName] = this.
                        cleanJsonObject(property, dbProperty, entityStateManager);
                }
            }
        }
        else {
            valueCopy = value;
        }
        return valueCopy;
    }
}
DI.set(OPERATION_DESERIALIZER, OperationDeserializer);
//# sourceMappingURL=OperationDeserializer.js.map
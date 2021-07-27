import { ISchemaUtils } from "@airport/air-control";
import {
    IOperationDeserializer,
    OPERATION_DESERIALIZER
} from "@airport/check-in";
import { DI } from "@airport/di";
import {
    DbColumn,
    DbEntity,
    EntityRelationType
} from "@airport/ground-control";
import {
    EntityState,
    IEntityStateManager
} from "@airport/pressurization";

interface IDeserializableOperation {
    lookupTable: any[]
}

export class OperationDeserializer
    implements IOperationDeserializer {

    deserialize<E, T = E | E[]>(
        entity: T,
        dbEntity: DbEntity,
        entityStateManager: IEntityStateManager,
        schemaUtils: ISchemaUtils
    ): T {
        const operation: IDeserializableOperation = {
            lookupTable: [],
        }
        let deserializedEntity
        if (entity instanceof Array) {
            deserializedEntity = <any><E[]>entity.map(anEntity => this.doDeserialize(
                anEntity, dbEntity, operation, entityStateManager, schemaUtils))
        } else {
            deserializedEntity = this.doDeserialize(
                entity, dbEntity, operation, entityStateManager, schemaUtils)
        }

        return deserializedEntity
    }

    doDeserialize<E>(
        entity: E,
        dbEntity: DbEntity,
        operation: IDeserializableOperation,
        entityStateManager: IEntityStateManager,
        schemaUtils: ISchemaUtils
    ): E {
        let state = entityStateManager.getEntityState(entity)
        switch (state) {
            case EntityState.RESULT_DATE:
                return <any>new Date(entity['value'])
        }

        let operationUniqueId = entityStateManager.getOperationUniqueId(entity)
        if (!operationUniqueId || typeof operationUniqueId !== 'number'
            || operationUniqueId < 1 || operationUniqueId % 1 === 0) {
            throw new Error(`Invalid or missing ${entityStateManager.getUniqueIdFieldName()} field.`)
        }

        let alreadyDeserializedEntity = operation.lookupTable[operationUniqueId]
        switch (state) {
            case EntityState.STUB: {
                let alreadyDeserializedEntity = operation.lookupTable[operationUniqueId]
                if (!alreadyDeserializedEntity) {
                    throw new Error(`Could not find an already present entity for
					${entityStateManager.getUniqueIdFieldName()} of ${operationUniqueId}`)
                }
                return alreadyDeserializedEntity
            }
            default:
                if (alreadyDeserializedEntity) {
                    throw new Error(`Entity appears more than once for
					${entityStateManager.getUniqueIdFieldName()} of ${operationUniqueId}`)
                }
        }

        let deserializedEntity: any = {}
        operation.lookupTable[operationUniqueId] = deserializedEntity
        deserializedEntity[entityStateManager.getStateFieldName()] = state

        
		for (const dbProperty of dbEntity.properties) {
			let value = entity[dbProperty.name]
			if (schemaUtils.isEmpty(value)) {
				continue
			}
			if (dbProperty.relation) {
				const dbRelation = dbProperty.relation[0]
				switch (dbRelation.relationType) {
					case EntityRelationType.ONE_TO_MANY:
						if (!(value instanceof Array)) {
							throw new Error(
								`Expecting @OneToMany for an array entity relation`)
						}

                        
						break
					case EntityRelationType.MANY_TO_ONE:
						if (!(value instanceof Object) || value instanceof Array) {
							throw new Error(
								`Expecting @ManyToOne for a non-array entity relation`)
						}
						schemaUtils.forEachColumnOfRelation(
							dbRelation,
							entity,
							(
								dbColumn: DbColumn,
								value: any,
								propertyNameChains: string[][]
							) => {
								this.copyColumn(schemaUtils, dbColumn, entityCopy, value)
							}, false)
						if (cacheForUpdate !== UpdateCacheType.ALL_QUERY_ENTITIES) {
							continue
						}
						this.saveToUpdateCacheInternal(schemaUtils, cacheForUpdate,
							dbRelation.relationEntity, value)
						break
					default:
						throw new Error(
							`Unknown relation type: ${dbRelation.relationType}`)
				}
			} else {
				const dbColumn = dbProperty.propertyColumns[0].column
				this.copyColumn(schemaUtils, dbColumn, entityCopy, value)
			}
		}

        for (const propertyName in entity) {
            const property = entity[propertyName]
            let propertyCopy
            if (property instanceof Object) {
                if (property instanceof Array) {
                    propertyCopy = property.map(aProperty => this.doDeserialize(
                        aProperty, operation, entityStateManager))
                } else {
                    propertyCopy = this.doDeserialize(property, operation, entityStateManager)
                }
            } else {
                propertyCopy = property
            }
            deserializedEntity[propertyName] = propertyCopy
        }

        return deserializedEntity
    }

}
DI.set(OPERATION_DESERIALIZER, OperationDeserializer);

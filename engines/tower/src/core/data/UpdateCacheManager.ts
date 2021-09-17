import {
    ISchemaUtils,
    IUpdateCacheManager,
    UPDATE_CACHE_MANAGER
} from "@airport/air-control";
import { DI } from "@airport/di"
import {
    DbEntity,
    EntityRelationType,
    EntityState,
    IEntityStateManager,
    ISaveResult,
    SQLDataType,
    DbColumn
} from "@airport/ground-control"

export class UpdateCacheManager
    implements IUpdateCacheManager {

    saveOriginalValues<E, T = E | E[]>(
        entity: T,
        dbEntity: DbEntity,
        entityStateManager: IEntityStateManager,
        schemaUtils: ISchemaUtils
    ): any {
        if (entity instanceof Array) {
            for (let i = 0; i < entity.length; i++) {
                this.saveOriginalValues(
                    entity[i], dbEntity, entityStateManager, schemaUtils)
            }
            return
        }
        const originalValuesObject: any = {}
        entityStateManager.setOriginalValues(originalValuesObject, entity);
        for (let dbProperty of dbEntity.properties) {
            const property = entity[dbProperty.name]
            if (property && dbProperty.relation && dbProperty.relation.length) {
                if (dbProperty.relation[0].relationType === EntityRelationType.MANY_TO_ONE) {
                    // Save the nested child object Ids in the original values of this object
                    // in case the object behind this relation is changed
                    schemaUtils.forEachColumnTypeOfRelation(dbProperty.relation[0], (
                        _dbColumn: DbColumn,
                        propertyNameChains: string[][],
                    ) => {
                        for (let propertyNameChain of propertyNameChains) {
                            let nestedProperty = entity
                            let currentPropertyOriginalValue = originalValuesObject
                            for (let i = 0; i < propertyNameChain.length; i++) {
                                const propertyName = propertyNameChain[i]
                                if (nestedProperty instanceof Object) {
                                    nestedProperty = nestedProperty[propertyName]
                                    let originalValue
                                    // Nested object continues
                                    if (i === propertyNameChain.length - 1) {
                                        originalValue = nestedProperty
                                    } else {
                                        originalValue = {}
                                    }
                                    currentPropertyOriginalValue[propertyName] = originalValue
                                    currentPropertyOriginalValue = currentPropertyOriginalValue[propertyName]
                                } else {
                                    // This is the actual value
                                    currentPropertyOriginalValue[propertyName] = nestedProperty
                                }
                            }
                        }
                    });
                }
                this.saveOriginalValues(property, dbProperty.relation[0].relationEntity,
                    entityStateManager, schemaUtils)
            } else {
                originalValuesObject[dbProperty.name] = entity[dbProperty.name]
            }
        }
    }

    setOperationState<E, T = E | E[]>(
        entityCopy: T,
        dbEntity: DbEntity,
        entityStateManager: IEntityStateManager,
        schemaUtils: ISchemaUtils,
        processedEntities: Set<any>
    ): void {
        if (entityCopy instanceof Array) {
            for (var i = 0; i < entityCopy.length; i++) {
                this.setOperationState(entityCopy[i], dbEntity,
                    entityStateManager, schemaUtils, processedEntities)
            }
            return
        }
        if (processedEntities.has(entityCopy)) {
            return
        }
        processedEntities.add(entityCopy)
        const originalValuesObject: any = entityStateManager
            .getOriginalValues(entityCopy)

        let entityState: EntityState = entityCopy[entityStateManager.getStateFieldName()]
        let hasId = true
        let hasGeneratedIds = false
        for (const dbProperty of dbEntity.properties) {
            if (!dbProperty.isId) {
                continue
            }
            for (const propertyColumn of dbProperty.propertyColumns) {
                if (propertyColumn.column.isGenerated) {
                    hasGeneratedIds = true
                }
            }
            if (dbProperty.relation && dbProperty.relation.length) {
                schemaUtils.forEachColumnTypeOfRelation(dbProperty.relation[0], (
                    _dbColumn: DbColumn,
                    propertyNameChains: string[][],
                ) => {
                    for (let propertyNameChain of propertyNameChains) {
                        let nestedProperty = entityCopy
                        for (let i = 0; i < propertyNameChain.length; i++) {
                            const propertyName = propertyNameChain[i]
                            if (nestedProperty) {
                                nestedProperty = nestedProperty[propertyName]
                            }
                        }
                        if (!nestedProperty) {
                            if (entityState === EntityState.DELETE) {
                                throw new Error(
                                    `Entity is marked for deletion but does not have an @Id() property:
            ${propertyNameChain.join('.')}
                                    `)
                            } else {
                                entityState = EntityState.CREATE
                                hasId = false
                                return true
                            }
                        }
                    }
                })
            } else if (!entityCopy[dbProperty.name] && entityCopy[dbProperty.name] !== 0) {
                hasId = false
            }
        }
        if (originalValuesObject) {
            for (const dbProperty of dbEntity.properties) {
                const property = entityCopy[dbProperty.name]
                if (property && dbProperty.relation && dbProperty.relation.length) {
                    const dbRelation = dbProperty.relation[0];
                    schemaUtils.forEachColumnTypeOfRelation(dbRelation, (
                        _dbColumn: DbColumn,
                        propertyNameChains: string[][],
                    ) => {
                        // const firstPropertyNameChain = propertyNameChains[0];
                        for (const propertyNameChain of propertyNameChains) {
                            let value = entityCopy
                            let originalValue = originalValuesObject
                            for (let i = 0; i < propertyNameChain.length; i++) {
                                const propertyName = propertyNameChain[i]
                                value = value[propertyName]
                                originalValue = originalValue[propertyName]
                                let noValue = value === null || value === undefined
                                let noOriginalValue = originalValue === null
                                    || originalValue === undefined
                                if (noValue) {
                                    if (originalValue) {
                                        entityState = EntityState.UPDATE
                                        return true
                                    }
                                    break
                                }
                                if (noOriginalValue) {
                                    if (value) {
                                        entityState = EntityState.UPDATE
                                        return true
                                    }
                                    break
                                }
                                // If it's a nested object
                                if (typeof value === 'object') {
                                    // If original isn't a nested object
                                    if (typeof originalValue !== 'object') {
                                        entityState = EntityState.UPDATE
                                        return true
                                    }
                                    // Values should not be dates or json objects, only
                                    // nested object references to eventual Ids
                                } else if (typeof originalValue === 'object') {
                                    // value is not a nested object but originalValue is
                                    entityState = EntityState.UPDATE
                                    return true
                                } else {
                                    // Both values are primitives (nested ids)
                                    if (value !== originalValue) {
                                        entityState = EntityState.UPDATE
                                        return true
                                    }
                                }
                            }
                        }
                    });
                } else {
                    if (entityState) {
                        continue
                    }
                    let originalValue = originalValuesObject[dbProperty.name]
                    let propertyValue
                    if (originalValue) {
                        switch (dbProperty.propertyColumns[0].column.type) {
                            case SQLDataType.DATE:
                                originalValue = (originalValue as Date).getTime()
                                propertyValue = (property as Date).getTime()
                                break;
                            case SQLDataType.JSON:
                                originalValue = JSON.stringify(originalValue)
                                propertyValue = JSON.stringify(property)
                                break;
                            default:
                                break;
                        }
                    }
                    if (propertyValue != originalValue) {
                        entityState = EntityState.UPDATE
                    }
                }
            }
        }

        for (const dbProperty of dbEntity.properties) {
            const property = entityCopy[dbProperty.name]
            if (property && dbProperty.relation && dbProperty.relation.length) {
                this.setOperationState(property, dbProperty.relation[0].relationEntity,
                    entityStateManager, schemaUtils, processedEntities);
            }
        }
        if (!entityState) {
            if (hasId && hasGeneratedIds) {
                entityState = EntityState.PARENT_ID
            } else {
                entityState = EntityState.CREATE
            }
        }
        entityCopy[entityStateManager.getStateFieldName()] = entityState
    }

    afterSaveModifications<E, T = E | E[]>(
        entity: T,
        dbEntity: DbEntity,
        saveResult: ISaveResult,
        entityStateManager: IEntityStateManager,
        schemaUtils: ISchemaUtils,
        processedEntities: Set<any>
    ): void {
        this.updateOriginalValuesAfterSave(entity, dbEntity,
            saveResult, entityStateManager, schemaUtils, new Set())
        this.removeDeletedEntities(entity, dbEntity,
            saveResult, entityStateManager, processedEntities)
    }

    private updateOriginalValuesAfterSave<E, T = E | E[]>(
        entity: T,
        dbEntity: DbEntity,
        saveResult: ISaveResult,
        entityStateManager: IEntityStateManager,
        schemaUtils: ISchemaUtils,
        processedEntities: Set<any>
    ): void {
        if (entity instanceof Array) {
            for (let i = 0; i < entity.length; i++) {
                this.updateOriginalValuesAfterSave(entity[i], dbEntity,
                    saveResult, entityStateManager, schemaUtils, processedEntities)
            }
        } else {
            if (processedEntities.has(entity)) {
                return
            }
            processedEntities.add(entity)

            let operationUniqueId = entityStateManager.getOperationUniqueId(entity, true, dbEntity)
            let createdRecord = saveResult.created[operationUniqueId]
            if (createdRecord) {
                if (createdRecord !== true) {
                    for (const generatedPropertyName in createdRecord) {
                        entity[generatedPropertyName] = createdRecord[generatedPropertyName]
                    }
                }
            } else if (saveResult.deleted[operationUniqueId]) {
                entityStateManager.setIsDeleted(true, entity)
                entityStateManager.setOriginalValues(null, entity);
                return
            }
            let originalValuesObject = {}
            for (const dbProperty of dbEntity.properties) {
                const property = entity[dbProperty.name]
                if (property && dbProperty.relation && dbProperty.relation.length) {
                    if (dbProperty.relation[0].relationType === EntityRelationType.MANY_TO_ONE) {
                        // Save the nested child object Ids in the original values of this object
                        // in case the object behind this relation is changed
                        schemaUtils.forEachColumnTypeOfRelation(dbProperty.relation[0], (
                            _dbColumn: DbColumn,
                            propertyNameChains: string[][],
                        ) => {
                            for (let propertyNameChain of propertyNameChains) {
                                let nestedProperty = entity
                                let currentPropertyOriginalValue = originalValuesObject
                                for (let i = 0; i < propertyNameChain.length; i++) {
                                    const propertyName = propertyNameChain[i]
                                    if (nestedProperty instanceof Object) {
                                        nestedProperty = nestedProperty[propertyName]
                                        let originalValue
                                        // Nested object continues
                                        if (i === propertyNameChain.length - 1) {
                                            originalValue = nestedProperty
                                        } else {
                                            originalValue = {}
                                        }
                                        currentPropertyOriginalValue[propertyName] = originalValue
                                        currentPropertyOriginalValue = currentPropertyOriginalValue[propertyName]
                                    } else {
                                        // This is the actual value
                                        currentPropertyOriginalValue[propertyName] = nestedProperty
                                    }
                                }
                            }
                        });
                    }
                    this.updateOriginalValuesAfterSave(
                        property, dbProperty.relation[0].relationEntity,
                        saveResult, entityStateManager, schemaUtils, processedEntities)
                } else {
                    originalValuesObject[dbProperty.name] = property
                }
            }
            entityStateManager.setOriginalValues(originalValuesObject, entity);
        }
    }

    private removeDeletedEntities<E, T = E | E[]>(
        entity: T,
        dbEntity: DbEntity,
        saveResult: ISaveResult,
        entityStateManager: IEntityStateManager,
        processedEntities: Set<any>
    ): boolean {
        if (entity instanceof Array) {
            for (let i = entity.length - 1; i >= 0; i--) {
                if (this.removeDeletedEntities(
                    entity[i], dbEntity, saveResult, entityStateManager, processedEntities)) {
                    (entity as unknown as E[]).splice(i, 1)
                }
            }
            return !(entity as unknown as E[]).length
        } else {
            if (processedEntities.has(entity)) {
                return entityStateManager.isDeleted(entity)
            }
            processedEntities.add(entity)
            for (const dbRelation of dbEntity.relations) {
                const dbRelationProperty = dbRelation.property
                const property = entity[dbRelationProperty.name];
                if (!property) {
                    continue
                }
                switch (dbRelation.relationType) {
                    case EntityRelationType.MANY_TO_ONE:
                        if (this.removeDeletedEntities(property, dbRelation.relationEntity,
                            saveResult, entityStateManager, processedEntities)) {
                            entity[dbRelationProperty.name] = null
                        }
                        break;
                    case EntityRelationType.ONE_TO_MANY:
                        this.removeDeletedEntities(property, dbRelation.relationEntity,
                            saveResult, entityStateManager, processedEntities)
                        break;
                }
            }
            return entityStateManager.isDeleted(entity)
        }
    }
}
DI.set(UPDATE_CACHE_MANAGER, UpdateCacheManager)
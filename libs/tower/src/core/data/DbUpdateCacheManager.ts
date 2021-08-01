import { DI } from "@airport/di"
import {
    DbEntity,
    EntityRelationType,
    ISaveResult,
    SQLDataType
} from "@airport/ground-control"
import {
    EntityState,
    IEntityStateManager
} from "@airport/pressurization"
import { DB_UPDATE_CACHE_MANAGER } from "../../tokens"

export interface IDbUpdateCacheManager {

    saveOriginalValues<E, T = E | E[]>(
        dbEntity: DbEntity,
        entity: T,
        entityStateManager: IEntityStateManager,
    ): any

    setOperationState<E, T = E | E[]>(
        entityCopy: T,
        dbEntity: DbEntity,
        entityStateManager: IEntityStateManager,
        processedEntities: Set<any>
    ): void

    afterSaveModifications<E, T = E | E[]>(
        entity: T,
        dbEntity: DbEntity,
        saveResult: ISaveResult,
        entityStateManager: IEntityStateManager,
        processedEntities: Set<any>
    ): void

}

export class DbUpdateCacheManager
    implements IDbUpdateCacheManager {

    saveOriginalValues<E, T = E | E[]>(
        dbEntity: DbEntity,
        entity: T,
        entityStateManager: IEntityStateManager,
    ): any {
        if (entity instanceof Array) {
            for (let i = 0; i < entity.length; i++) {
                this.saveOriginalValues(
                    dbEntity, entity[i], entityStateManager)
            }
        } else {
            const entityState = entity[entityStateManager.getStateFieldName()]
            switch (entityState) {
                case EntityState.RESULT_DATE:
                case EntityState.RESULT_JSON:
                case EntityState.RESULT_JSON_ARRAY:
                    return serializedEntity
                case EntityState.STUB:
                    break;
                case EntityState.RESULT:
                    const originalValuesObject: any = {}
                    entityStateManager.setOriginalValues(
                        originalValuesObject, entity);
                    for (const propertyName in entity) {
                        const serializedProperty = serializedEntity[propertyName]
                        if (!(serializedProperty instanceof Object)) {
                            originalValuesObject[propertyName] = serializedProperty
                        } else {
                            const property = entity[propertyName]
                            const originalValue = this.saveOriginalValues(
                                serializedProperty, property, entityStateManager)
                            if (originalValue) {
                                originalValuesObject[propertyName] = originalValue
                            }
                        }
                    }
                    break;
            }
        }
    }

    setOperationState<E, T = E | E[]>(
        entityCopy: T,
        dbEntity: DbEntity,
        entityStateManager: IEntityStateManager,
        processedEntities: Set<any>
    ): void {
        if (entityCopy instanceof Array) {
            for (var i = 0; i < entityCopy.length; i++) {
                this.setOperationState(entityCopy[i], dbEntity,
                    entityStateManager, processedEntities)
            }
        } else {
            if (processedEntities.has(entityCopy)) {
                return
            }
            processedEntities.add(entityCopy)
            const originalValuesObject: any = entityStateManager
                .getOriginalValues(entityCopy)

            let entityState: EntityState = entityCopy[entityStateManager.getStateFieldName()]
            if (!entityCopy['id']) {
                if (entityState === EntityState.DELETE) {
                    throw new Error(
                        'Entity is marked for deletion but does not have an "id" property')
                } else {
                    entityState = EntityState.CREATE
                }
            }
            for (const dbProperty of dbEntity.properties) {
                const property = entityCopy[dbProperty.name]
                if (dbProperty.relation && dbProperty.relation.length) {
                    this.setOperationState(property, dbProperty.relation[0].relationEntity,
                        entityStateManager, processedEntities);
                } else {
                    if (entityState) {
                        continue
                    }
                    const originalValue = originalValuesObject[dbProperty.name]
                    let propertyValue
                    switch (dbProperty.propertyColumns[0].column.type) {
                        case SQLDataType.DATE:
                            propertyValue = (property as Date).toISOString()
                            break;
                        case SQLDataType.JSON:
                            propertyValue = JSON.stringify(property)
                            break;
                        default:
                            break;
                    }
                    if (propertyValue != originalValue) {
                        entityState = EntityState.UPDATE
                    }
                }
            }
            if (!entityState || entityStateManager.isDeleted(entityCopy)) {
                entityState = EntityState.PARENT_ID
            }
            entityCopy[entityStateManager.getStateFieldName()] = entityState
        }
    }

    afterSaveModifications<E, T = E | E[]>(
        entity: T,
        dbEntity: DbEntity,
        saveResult: ISaveResult,
        entityStateManager: IEntityStateManager,
        processedEntities: Set<any>
    ): void {
        this.updateOriginalValuesAfterSave(entity, dbEntity,
            saveResult, entityStateManager)
        this.removeDeletedEntities(entity, dbEntity,
            saveResult, entityStateManager, processedEntities)
    }

    private updateOriginalValuesAfterSave<E, T = E | E[]>(
        entity: T,
        dbEntity: DbEntity,
        saveResult: ISaveResult,
        entityStateManager: IEntityStateManager,
    ): void {
        if (entity instanceof Array) {
            for (let i = 0; i < entity.length; i++) {
                this.updateOriginalValuesAfterSave(entity[i], dbEntity,
                    saveResult, entityStateManager)
            }
        } else {
            let operationUniqueId = entityStateManager.getOperationUniqueId(entity, true, dbEntity)
            let createdRecordId = saveResult.created[operationUniqueId]
            if (createdRecordId) {
                entity['id'] = createdRecordId
            } else {
                let isDeleted = !!saveResult.deleted[operationUniqueId]
                if (isDeleted) {
                    entityStateManager.setIsDeleted(true, entity)
                }
            }
            let originalValue = {}
            for (const dbProperty of dbEntity.properties) {
                const property = entity[dbProperty.name]
                if (dbProperty.relation && dbProperty.relation.length) {
                    this.updateOriginalValuesAfterSave(
                        property, dbProperty.relation[0].relationEntity, saveResult, entityStateManager)
                } else {
                    switch (dbProperty.propertyColumns[0].column.type) {
                        case SQLDataType.DATE:
                            originalValue[dbProperty.name] = (property as Date).toISOString()
                            break;
                        case SQLDataType.JSON:
                            originalValue[dbProperty.name] = JSON.stringify(property)
                            break;
                        default:
                            originalValue[dbProperty.name] = property
                            break;
                    }
                }
            }
            entityStateManager.setOriginalValues(originalValue, entity);
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
        return false
    }
}
DI.set(DB_UPDATE_CACHE_MANAGER, DbUpdateCacheManager)
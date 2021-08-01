import { DI } from "@airport/di";
import { ISaveResult } from "@airport/ground-control";
import { EntityState, IEntityStateManager } from "@airport/pressurization";
import { UPDATE_CACHE_MANAGER } from "../tokens";


export interface IUpdateCacheManager {

    saveOriginalValues<T>(
        serializedEntity: any,
        entity: T,
        entityStateManager: IEntityStateManager,
    ): any

    setOperationState<E, T = E | E[]>(
        serializedEntity: any,
        entity: T,
        entityStateManager: IEntityStateManager,
    ): void

    updateOriginalValuesAfterSave<E, T = E | E[]>(
        serializedEntity: any,
        entity: T,
        saveResult: ISaveResult,
        entityStateManager: IEntityStateManager,
    ): any

}

export class UpdateCacheManager
    implements IUpdateCacheManager {

    saveOriginalValues<E, T = E | E[]>(
        serializedEntity: any,
        entity: E,
        entityStateManager: IEntityStateManager,
    ): any {
        if (serializedEntity instanceof Array) {
            for (let i = 0; i < serializedEntity.length; i++) {
                this.saveOriginalValues(
                    serializedEntity[i], entity[i], entityStateManager)
            }
        } else if (serializedEntity instanceof Object) {
            const entityState = serializedEntity[entityStateManager.getStateFieldName()]
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
        serializedEntity: any,
        entity: T,
        entityStateManager: IEntityStateManager,
    ): void {
        if (entity instanceof Array) {
            for (var i = 0; i < serializedEntity.length; i++) {
                this.doSetOperationState(serializedEntity[i],
                    entity[i], entityStateManager)
            }
        } else {
            this.doSetOperationState(serializedEntity,
                entity, entityStateManager)
        }
    }

    private doSetOperationState<E>(
        serializedEntity: any,
        entity: E,
        entityStateManager: IEntityStateManager
    ): void {
        if (!serializedEntity) {
            return;
        }
        switch (serializedEntity[entityStateManager.getStateFieldName()]) {
            case EntityState.RESULT_DATE:
            case EntityState.RESULT_JSON:
            case EntityState.RESULT_JSON_ARRAY:
                return;
        }

        const originalValuesObject: any = entityStateManager
            .getOriginalValues(entity)

        let entityState: EntityState = entity[entityStateManager.getStateFieldName()]
        if (!entity['id']) {
            if (entityState === EntityState.DELETE) {
                throw new Error(
                    'Entity is marked for deletion but does not have an "id" property')
            } else {
                entityState = EntityState.CREATE
            }
        }
        for (const propertyName in serializedEntity) {
            const property = entity[propertyName]
            const serializedProperty = serializedEntity[propertyName]
            const originalValue = originalValuesObject[propertyName]
            const propertyState = serializedProperty[entityStateManager.getStateFieldName()]
            if (property instanceof Object) {
                if (property instanceof Array) {
                    if (!entityState &&
                        propertyState === EntityState.RESULT_JSON_ARRAY) {
                        if (serializedProperty.value != originalValue.value) {
                            entityState = EntityState.UPDATE
                        }
                    } else {
                        property.forEach(aProperty => this.doSetOperationState(
                            serializedProperty, aProperty, entityStateManager))
                    }
                } else if (propertyState === EntityState.RESULT_DATE) {
                    if (!entityState &&
                        serializedProperty.value != originalValue.value) {
                        entityState = EntityState.UPDATE
                    }
                } else {
                    if (propertyState === EntityState.RESULT_JSON) {
                        if (!entityState &&
                            serializedProperty.value != originalValue.value) {
                            entityState = EntityState.UPDATE
                        }
                    } else {
                        this.doSetOperationState(
                            serializedProperty, property, entityStateManager)
                    }
                }
            } else if (!entityState && property != originalValue) {
                entityState = EntityState.UPDATE
            }
        }
        if (!entityState || entityStateManager.isDeleted(entity)) {
            entityState = EntityState.PARENT_ID
        }
        entity[entityStateManager.getStateFieldName()] = entityState
    }

    /**
     * Resets the originalValue to the new version.
     * 
     * TODO: process newly created entity IDs (if any),
     * and add them where applicable
     * 
     * @param serializedEntity 
     * @param entity 
     * @param entityStateManager 
     * @returns 
     */
    updateOriginalValuesAfterSave<E, T = E | E[]>(
        serializedEntity: any,
        entity: T,
        saveResult: ISaveResult,
        entityStateManager: IEntityStateManager,
    ): any {
        this.doUpdateOriginalValuesAfterSave(serializedEntity,
            entity, saveResult, entityStateManager)
        this.removeDeletedEntities(serializedEntity,
            entity, entityStateManager, new Set())
    }

    private doUpdateOriginalValuesAfterSave<E, T = E | E[]>(
        serializedEntity: any,
        entity: T,
        saveResult: ISaveResult,
        entityStateManager: IEntityStateManager,
    ): any {
        if (serializedEntity instanceof Array) {
            for (let i = 0; i < serializedEntity.length; i++) {
                this.doUpdateOriginalValuesAfterSave(
                    serializedEntity[i], entity[i], saveResult, entityStateManager)
            }
        } else if (serializedEntity instanceof Object) {
            let operationUniqueId = entityStateManager.getOperationUniqueId(serializedEntity)
            let createdRecordId = saveResult.created[operationUniqueId]
            if (createdRecordId) {
                entity['id'] = createdRecordId
            } else {
                let isDeleted = !!saveResult.deleted[operationUniqueId]
                if (isDeleted) {
                    entityStateManager.setIsDeleted(true, entity)
                }
            }
            let originalValue
            const entityState = serializedEntity[entityStateManager.getStateFieldName()]
            switch (entityState) {
                case EntityState.RESULT_DATE:
                    originalValue = {
                        value: (entity as any).toISOString()
                    }
                    originalValue[entityStateManager.getStateFieldName()] = entityState
                    return originalValue;
                case EntityState.RESULT_JSON:
                case EntityState.RESULT_JSON_ARRAY:
                    originalValue = {
                        value: JSON.stringify(entity)
                    }
                    originalValue[entityStateManager.getStateFieldName()] = entityState
                    return originalValue;
                case EntityState.STUB:
                    break;
                case EntityState.RESULT:
                    originalValue = {}
                    for (const propertyName in entity) {
                        const serializedProperty = serializedEntity[propertyName]
                        const property = entity[propertyName]
                        if (!(serializedProperty instanceof Object)) {
                            originalValue[propertyName] = property
                        } else {
                            const originalValue = this.doUpdateOriginalValuesAfterSave(
                                serializedProperty, property, saveResult, entityStateManager)
                            if (originalValue) {
                                originalValue[propertyName] = originalValue
                            }
                        }
                    }
                    break;
            }
            entityStateManager.setOriginalValues(originalValue, entity);
        }
    }

    private removeDeletedEntities<E, T = E | E[]>(
        serializedEntity: any,
        entity: T,
        entityStateManager: IEntityStateManager,
        processedEntities: Set<any>
    ): boolean {
        if (serializedEntity instanceof Array) {
            for (let i = serializedEntity.length - 1; i >= 0; i--) {
                if (this.removeDeletedEntities(serializedEntity[i],
                    entity[i], entityStateManager, processedEntities)) {
                    (entity as unknown as E[]).splice(i, 1)
                }
            }
            return !(entity as unknown as E[]).length
        } else if (serializedEntity instanceof Object) {
            const entityState = serializedEntity[entityStateManager.getStateFieldName()]
            switch (entityState) {
                case EntityState.RESULT_DATE:
                case EntityState.RESULT_JSON:
                case EntityState.RESULT_JSON_ARRAY:
                    return false;
                default:
                    if (processedEntities.has(entity)) {
                        return entityStateManager.isDeleted(entity)
                    }
                    processedEntities.add(entity)
                    for (const propertyName in entity) {
                        const serializedProperty = serializedEntity[propertyName]
                        const property = entity[propertyName]
                        if (serializedProperty instanceof Object
                            && this.removeDeletedEntities(serializedProperty,
                                property, entityStateManager, processedEntities)) {
                            if (!(property instanceof Array)) {
                                (entity as any)[property] = null
                            }
                        }
                    }
                    return entityStateManager.isDeleted(entity)
            }
        }
        return false
    }

}
DI.set(UPDATE_CACHE_MANAGER, UpdateCacheManager);

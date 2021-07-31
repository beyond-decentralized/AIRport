import { DI } from "@airport/di";
import { EntityState, IEntityStateManager } from "@airport/pressurization";
import { UPDATE_CACHE_MANAGER } from "../tokens";

const ORIGINAL_VALUES_PROPERTY = '__originalValues__'

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
                    entity[ORIGINAL_VALUES_PROPERTY] = originalValuesObject
                    for (const propertyName in entity) {
                        const serializedProperty = serializedEntity[propertyName]
                        if (!(entity instanceof Object)) {
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
        const processedEntitySet: Set<any> = new Set()
        if (entity instanceof Array) {
            for (var i = 0; i < serializedEntity.length; i++) {
                this.doSetOperationState(serializedEntity[i],
                    entity[i], entityStateManager, processedEntitySet)
            }
        } else {
            this.doSetOperationState(serializedEntity,
                entity, entityStateManager, processedEntitySet)
        }
    }

    private doSetOperationState<E>(
        serializedEntity: any,
        entity: E,
        entityStateManager: IEntityStateManager,
        processedEntitySet: Set<any>
    ): void {
        if (processedEntitySet.has(entity)) {
            return
        }
        processedEntitySet.add(entity)
        const originalValuesObject: any = entity[ORIGINAL_VALUES_PROPERTY]

        let entityState: EntityState = entity[entityStateManager.getStateFieldName()]
        if (!entity['id']) {
            if (entityState === EntityState.DELETE) {
                throw new Error(
                    'Entity is marked for deletion but does not have an "id" property')
            } else {
                entityState = EntityState.CREATE
            }
        }
        for (const propertyName in entity) {
            const property = entity[propertyName]
            const propertyState = property[entityStateManager.getStateFieldName()]
            if (property instanceof Object) {
                if (property instanceof Array) {
                    if (propertyState === EntityState.RESULT_JSON_ARRAY) {
                        if (!entityState) {
                            const newValue = JSON.stringify(property)
                            const originalValue = originalValuesObject[propertyName]
                            if (newValue !== originalValue) {
                                entityState = EntityState.UPDATE
                            }
                        }
                        continue
                    }
                    property.forEach(aProperty => this.doSetOperationState(
                        aProperty, entityStateManager, processedEntitySet))
                } else if (property instanceof Date) {
                    originalValuesObject[propertyName] = new Date(property.getTime())
                } else {
                    if (propertyState === EntityState.RESULT_JSON) {
                        if (!entityState) {
                            const newValue = JSON.stringify(property)
                            const originalValue = originalValuesObject[propertyName]
                            if (newValue !== originalValue) {
                                entityState = EntityState.UPDATE
                            }
                        }
                        originalValuesObject[propertyName] = JSON.stringify(entity)
                        continue
                    }
                    this.doSetOperationState(entity, entityStateManager, processedEntitySet)
                }
            } else {
                originalValuesObject[propertyName] = property
            }
        }
        if (!entityState) {
            entityState = EntityState.PARENT_ID
        }
        entity[entityStateManager.getStateFieldName()] = entityState
    }

}
DI.set(UPDATE_CACHE_MANAGER, UpdateCacheManager);

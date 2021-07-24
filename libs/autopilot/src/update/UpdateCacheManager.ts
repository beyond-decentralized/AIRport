import { DI } from "@airport/di";
import { EntityState, IEntityStateManager } from "@airport/pressurization";
import { UPDATE_CACHE_MANAGER } from "../tokens";

const ORIGINAL_VALUES_PROPERTY = '__originalValues__'

export interface IUpdateCacheManager {

    saveOriginalValues<T>(
        entity: T,
        entityStateManager: IEntityStateManager,
    ): void

    setOperationState<E, T = E | E[]>(
        entity: T,
        entityStateManager: IEntityStateManager,
    ): void

}

export class UpdateCacheManager
    implements IUpdateCacheManager {

    saveOriginalValues<E, T = E | E[]>(
        entity: T,
        entityStateManager: IEntityStateManager,
    ): void {
        const processedEntitySet: Set<any> = new Set()
        if (entity instanceof Array) {
            entity.forEach(anEntity => this.doDeserialize(
                anEntity, entityStateManager, processedEntitySet))
        } else {
            this.doDeserialize(entity, entityStateManager, processedEntitySet)
        }
    }

    private doDeserialize<E>(
        entity: E,
        entityStateManager: IEntityStateManager,
        processedEntitySet: Set<any>
    ): void {
        if (processedEntitySet.has(entity)) {
            return
        }
        processedEntitySet.add(entity)
        // delete the state if run after a save()
        delete entity[entityStateManager.getStateFieldName()]

        const originalValuesObject: any = {}
        entity[ORIGINAL_VALUES_PROPERTY] = originalValuesObject
        for (const propertyName in entity) {
            const property = entity[propertyName]
            const propertyState = property[entityStateManager.getStateFieldName()]
            if (property instanceof Object) {
                if (property instanceof Array) {
                    if (propertyState === EntityState.RESULT_JSON_ARRAY) {
                        originalValuesObject[propertyName] = JSON.stringify((property as any).value)
                        continue
                    }
                    property.forEach(aProperty => this.doDeserialize(
                        aProperty, entityStateManager, processedEntitySet))
                } else if (property instanceof Date) {
                    originalValuesObject[propertyName] = new Date(property.getTime())
                } else {
                    if (propertyState === EntityState.RESULT_JSON) {
                        originalValuesObject[propertyName] = JSON.stringify(entity)
                        continue
                    }
                    this.doDeserialize(entity, entityStateManager, processedEntitySet)
                }
            } else {
                originalValuesObject[propertyName] = property
            }
        }
    }

    setOperationState<E, T = E | E[]>(
        entity: T,
        entityStateManager: IEntityStateManager,
    ): void {
        const processedEntitySet: Set<any> = new Set()
        if (entity instanceof Array) {
            entity.forEach(anEntity => this.doSetOperationState(
                anEntity, entityStateManager, processedEntitySet))
        } else {
            this.doSetOperationState(entity, entityStateManager, processedEntitySet)
        }
    }

    private doSetOperationState<E>(
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

import { DI } from "@airport/di";
import { EntityState } from "@airport/pressurization";
import { UPDATE_CACHE_MANAGER } from "../tokens";
export class UpdateCacheManager {
    saveOriginalValues(serializedEntity, entity, entityStateManager) {
        if (serializedEntity instanceof Array) {
            for (let i = 0; i < serializedEntity.length; i++) {
                this.saveOriginalValues(serializedEntity[i], entity[i], entityStateManager);
            }
        }
        else if (serializedEntity instanceof Object) {
            const entityState = serializedEntity[entityStateManager.getStateFieldName()];
            switch (entityState) {
                case EntityState.RESULT_DATE:
                case EntityState.RESULT_JSON:
                case EntityState.RESULT_JSON_ARRAY:
                    return serializedEntity;
                case EntityState.STUB:
                    break;
                case EntityState.RESULT:
                    const originalValuesObject = {};
                    entityStateManager.setOriginalValues(originalValuesObject, entity);
                    for (const propertyName in entity) {
                        const serializedProperty = serializedEntity[propertyName];
                        if (!(serializedProperty instanceof Object)) {
                            originalValuesObject[propertyName] = serializedProperty;
                        }
                        else {
                            const property = entity[propertyName];
                            const originalValue = this.saveOriginalValues(serializedProperty, property, entityStateManager);
                            if (originalValue) {
                                originalValuesObject[propertyName] = originalValue;
                            }
                        }
                    }
                    break;
            }
        }
    }
    setOperationState(serializedEntity, entity, entityStateManager) {
        if (entity instanceof Array) {
            for (var i = 0; i < serializedEntity.length; i++) {
                this.doSetOperationState(serializedEntity[i], entity[i], entityStateManager);
            }
        }
        else {
            this.doSetOperationState(serializedEntity, entity, entityStateManager);
        }
    }
    doSetOperationState(serializedEntity, entity, entityStateManager) {
        if (!serializedEntity) {
            return;
        }
        switch (serializedEntity[entityStateManager.getStateFieldName()]) {
            case EntityState.RESULT_DATE:
            case EntityState.RESULT_JSON:
            case EntityState.RESULT_JSON_ARRAY:
                return;
        }
        const originalValuesObject = entityStateManager
            .getOriginalValues(entity);
        let entityState = entity[entityStateManager.getStateFieldName()];
        if (!entity['id']) {
            if (entityState === EntityState.DELETE) {
                throw new Error('Entity is marked for deletion but does not have an "id" property');
            }
            else {
                entityState = EntityState.CREATE;
            }
        }
        for (const propertyName in serializedEntity) {
            const property = entity[propertyName];
            const serializedProperty = serializedEntity[propertyName];
            const originalValue = originalValuesObject[propertyName];
            const propertyState = serializedProperty[entityStateManager.getStateFieldName()];
            if (property instanceof Object) {
                if (property instanceof Array) {
                    if (!entityState &&
                        propertyState === EntityState.RESULT_JSON_ARRAY) {
                        if (serializedProperty.value != originalValue.value) {
                            entityState = EntityState.UPDATE;
                        }
                    }
                    else {
                        property.forEach(aProperty => this.doSetOperationState(serializedProperty, aProperty, entityStateManager));
                    }
                }
                else if (propertyState === EntityState.RESULT_DATE) {
                    if (!entityState &&
                        serializedProperty.value != originalValue.value) {
                        entityState = EntityState.UPDATE;
                    }
                }
                else {
                    if (propertyState === EntityState.RESULT_JSON) {
                        if (!entityState &&
                            serializedProperty.value != originalValue.value) {
                            entityState = EntityState.UPDATE;
                        }
                    }
                    else {
                        this.doSetOperationState(serializedProperty, property, entityStateManager);
                    }
                }
            }
            else if (!entityState && property != originalValue) {
                entityState = EntityState.UPDATE;
            }
        }
        if (!entityState || entityStateManager.isDeleted(entity)) {
            entityState = EntityState.PARENT_ID;
        }
        entity[entityStateManager.getStateFieldName()] = entityState;
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
    updateOriginalValuesAfterSave(serializedEntity, entity, saveResult, entityStateManager) {
        this.doUpdateOriginalValuesAfterSave(serializedEntity, entity, saveResult, entityStateManager);
        this.removeDeletedEntities(serializedEntity, entity, entityStateManager, new Set());
    }
    doUpdateOriginalValuesAfterSave(serializedEntity, entity, saveResult, entityStateManager) {
        if (serializedEntity instanceof Array) {
            for (let i = 0; i < serializedEntity.length; i++) {
                this.doUpdateOriginalValuesAfterSave(serializedEntity[i], entity[i], saveResult, entityStateManager);
            }
        }
        else if (serializedEntity instanceof Object) {
            let operationUniqueId = entityStateManager.getOperationUniqueId(serializedEntity);
            let createdRecordId = saveResult.created[operationUniqueId];
            if (createdRecordId) {
                entity['id'] = createdRecordId;
            }
            else {
                let isDeleted = !!saveResult.deleted[operationUniqueId];
                if (isDeleted) {
                    entityStateManager.setIsDeleted(true, entity);
                }
            }
            let originalValue;
            const entityState = serializedEntity[entityStateManager.getStateFieldName()];
            switch (entityState) {
                case EntityState.RESULT_DATE:
                    originalValue = {
                        value: entity.toISOString()
                    };
                    originalValue[entityStateManager.getStateFieldName()] = entityState;
                    return originalValue;
                case EntityState.RESULT_JSON:
                case EntityState.RESULT_JSON_ARRAY:
                    originalValue = {
                        value: JSON.stringify(entity)
                    };
                    originalValue[entityStateManager.getStateFieldName()] = entityState;
                    return originalValue;
                case EntityState.STUB:
                    break;
                case EntityState.RESULT:
                    originalValue = {};
                    for (const propertyName in entity) {
                        const serializedProperty = serializedEntity[propertyName];
                        const property = entity[propertyName];
                        if (!(serializedProperty instanceof Object)) {
                            originalValue[propertyName] = property;
                        }
                        else {
                            const originalValue = this.doUpdateOriginalValuesAfterSave(serializedProperty, property, saveResult, entityStateManager);
                            if (originalValue) {
                                originalValue[propertyName] = originalValue;
                            }
                        }
                    }
                    break;
            }
            entityStateManager.setOriginalValues(originalValue, entity);
        }
    }
    removeDeletedEntities(serializedEntity, entity, entityStateManager, processedEntities) {
        if (serializedEntity instanceof Array) {
            for (let i = serializedEntity.length - 1; i >= 0; i--) {
                if (this.removeDeletedEntities(serializedEntity[i], entity[i], entityStateManager, processedEntities)) {
                    entity.splice(i, 1);
                }
            }
            return !entity.length;
        }
        else if (serializedEntity instanceof Object) {
            const entityState = serializedEntity[entityStateManager.getStateFieldName()];
            switch (entityState) {
                case EntityState.RESULT_DATE:
                case EntityState.RESULT_JSON:
                case EntityState.RESULT_JSON_ARRAY:
                    return false;
                default:
                    if (processedEntities.has(entity)) {
                        return entityStateManager.isDeleted(entity);
                    }
                    processedEntities.add(entity);
                    for (const propertyName in entity) {
                        const serializedProperty = serializedEntity[propertyName];
                        const property = entity[propertyName];
                        if (serializedProperty instanceof Object
                            && this.removeDeletedEntities(serializedProperty, property, entityStateManager, processedEntities)) {
                            if (!(property instanceof Array)) {
                                entity[property] = null;
                            }
                        }
                    }
                    return entityStateManager.isDeleted(entity);
            }
        }
        return false;
    }
}
DI.set(UPDATE_CACHE_MANAGER, UpdateCacheManager);
//# sourceMappingURL=UpdateCacheManager.js.map
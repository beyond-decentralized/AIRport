import { DI } from "@airport/di";
import { EntityState } from "@airport/pressurization";
import { UPDATE_CACHE_MANAGER } from "../tokens";
const ORIGINAL_VALUES_PROPERTY = '__originalValues__';
export class UpdateCacheManager {
    saveOriginalValues(entity, entityStateManager) {
        const processedEntitySet = new Set();
        if (entity instanceof Array) {
            entity.forEach(anEntity => this.doDeserialize(anEntity, entityStateManager, processedEntitySet));
        }
        else {
            this.doDeserialize(entity, entityStateManager, processedEntitySet);
        }
    }
    doDeserialize(entity, entityStateManager, processedEntitySet) {
        if (processedEntitySet.has(entity)) {
            return;
        }
        processedEntitySet.add(entity);
        // delete the state if run after a save()
        delete entity[entityStateManager.getStateFieldName()];
        const originalValuesObject = {};
        entity[ORIGINAL_VALUES_PROPERTY] = originalValuesObject;
        for (const propertyName in entity) {
            const property = entity[propertyName];
            const propertyState = property[entityStateManager.getStateFieldName()];
            if (property instanceof Object) {
                if (property instanceof Array) {
                    if (propertyState === EntityState.RESULT_JSON_ARRAY) {
                        originalValuesObject[propertyName] = JSON.stringify(property.value);
                        continue;
                    }
                    property.forEach(aProperty => this.doDeserialize(aProperty, entityStateManager, processedEntitySet));
                }
                else if (property instanceof Date) {
                    originalValuesObject[propertyName] = new Date(property.getTime());
                }
                else {
                    if (propertyState === EntityState.RESULT_JSON) {
                        originalValuesObject[propertyName] = JSON.stringify(entity);
                        continue;
                    }
                    this.doDeserialize(entity, entityStateManager, processedEntitySet);
                }
            }
            else {
                originalValuesObject[propertyName] = property;
            }
        }
    }
    setOperationState(entity, entityStateManager) {
        const processedEntitySet = new Set();
        if (entity instanceof Array) {
            entity.forEach(anEntity => this.doSetOperationState(anEntity, entityStateManager, processedEntitySet));
        }
        else {
            this.doSetOperationState(entity, entityStateManager, processedEntitySet);
        }
    }
    doSetOperationState(entity, entityStateManager, processedEntitySet) {
        if (processedEntitySet.has(entity)) {
            return;
        }
        processedEntitySet.add(entity);
        const originalValuesObject = entity[ORIGINAL_VALUES_PROPERTY];
        let entityState = entity[entityStateManager.getStateFieldName()];
        if (!entity['id']) {
            if (entityState === EntityState.DELETE) {
                throw new Error('Entity is marked for deletion but does not have an "id" property');
            }
            else {
                entityState = EntityState.CREATE;
            }
        }
        for (const propertyName in entity) {
            const property = entity[propertyName];
            const propertyState = property[entityStateManager.getStateFieldName()];
            if (property instanceof Object) {
                if (property instanceof Array) {
                    if (propertyState === EntityState.RESULT_JSON_ARRAY) {
                        if (!entityState) {
                            const newValue = JSON.stringify(property);
                            const originalValue = originalValuesObject[propertyName];
                            if (newValue !== originalValue) {
                                entityState = EntityState.UPDATE;
                            }
                        }
                        continue;
                    }
                    property.forEach(aProperty => this.doSetOperationState(aProperty, entityStateManager, processedEntitySet));
                }
                else if (property instanceof Date) {
                    originalValuesObject[propertyName] = new Date(property.getTime());
                }
                else {
                    if (propertyState === EntityState.RESULT_JSON) {
                        if (!entityState) {
                            const newValue = JSON.stringify(property);
                            const originalValue = originalValuesObject[propertyName];
                            if (newValue !== originalValue) {
                                entityState = EntityState.UPDATE;
                            }
                        }
                        originalValuesObject[propertyName] = JSON.stringify(entity);
                        continue;
                    }
                    this.doSetOperationState(entity, entityStateManager, processedEntitySet);
                }
            }
            else {
                originalValuesObject[propertyName] = property;
            }
        }
        if (!entityState) {
            entityState = EntityState.PARENT_ID;
        }
        entity[entityStateManager.getStateFieldName()] = entityState;
    }
}
DI.set(UPDATE_CACHE_MANAGER, UpdateCacheManager);
//# sourceMappingURL=UpdateCacheManager.js.map
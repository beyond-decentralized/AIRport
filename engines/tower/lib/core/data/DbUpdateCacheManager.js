import { DI } from "@airport/di";
import { DB_UPDATE_CACHE_MANAGER, EntityRelationType, EntityState, SQLDataType } from "@airport/ground-control";
export class DbUpdateCacheManager {
    saveOriginalValues(entity, dbEntity, entityStateManager) {
        if (entity instanceof Array) {
            for (let i = 0; i < entity.length; i++) {
                this.saveOriginalValues(entity[i], dbEntity, entityStateManager);
            }
        }
        else {
            const originalValuesObject = {};
            entityStateManager.setOriginalValues(originalValuesObject, entity);
            for (let dbProperty of dbEntity.properties) {
                const property = entity[dbProperty.name];
                if (dbProperty.relation && dbProperty.relation.length) {
                    this.saveOriginalValues(property, dbProperty.relation[0].relationEntity, entityStateManager);
                }
                else {
                    originalValuesObject[dbProperty.name] = entity[dbProperty.name];
                }
            }
        }
    }
    setOperationState(entityCopy, dbEntity, entityStateManager, processedEntities) {
        if (entityCopy instanceof Array) {
            for (var i = 0; i < entityCopy.length; i++) {
                this.setOperationState(entityCopy[i], dbEntity, entityStateManager, processedEntities);
            }
        }
        else {
            if (processedEntities.has(entityCopy)) {
                return;
            }
            processedEntities.add(entityCopy);
            const originalValuesObject = entityStateManager
                .getOriginalValues(entityCopy);
            let entityState = entityCopy[entityStateManager.getStateFieldName()];
            if (!entityCopy['id']) {
                if (entityState === EntityState.DELETE) {
                    throw new Error('Entity is marked for deletion but does not have an "id" property');
                }
                else {
                    entityState = EntityState.CREATE;
                }
            }
            for (const dbProperty of dbEntity.properties) {
                const property = entityCopy[dbProperty.name];
                if (dbProperty.relation && dbProperty.relation.length) {
                    this.setOperationState(property, dbProperty.relation[0].relationEntity, entityStateManager, processedEntities);
                }
                else {
                    if (entityState) {
                        continue;
                    }
                    let originalValue = originalValuesObject[dbProperty.name];
                    let propertyValue;
                    switch (dbProperty.propertyColumns[0].column.type) {
                        case SQLDataType.DATE:
                            originalValue = originalValue.getTime();
                            propertyValue = property.getTime();
                            break;
                        // case SQLDataType.JSON:
                        //     originalValue = JSON.stringify(originalValue)
                        //     propertyValue = JSON.stringify(property)
                        //     break;
                        default:
                            break;
                    }
                    if (propertyValue != originalValue) {
                        entityState = EntityState.UPDATE;
                    }
                }
            }
            if (!entityState || entityStateManager.isDeleted(entityCopy)) {
                entityState = EntityState.PARENT_ID;
            }
            entityCopy[entityStateManager.getStateFieldName()] = entityState;
        }
    }
    afterSaveModifications(entity, dbEntity, saveResult, entityStateManager, processedEntities) {
        this.updateOriginalValuesAfterSave(entity, dbEntity, saveResult, entityStateManager);
        this.removeDeletedEntities(entity, dbEntity, saveResult, entityStateManager, processedEntities);
    }
    updateOriginalValuesAfterSave(entity, dbEntity, saveResult, entityStateManager) {
        if (entity instanceof Array) {
            for (let i = 0; i < entity.length; i++) {
                this.updateOriginalValuesAfterSave(entity[i], dbEntity, saveResult, entityStateManager);
            }
        }
        else {
            let operationUniqueId = entityStateManager.getOperationUniqueId(entity, true, dbEntity);
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
            let originalValue = {};
            for (const dbProperty of dbEntity.properties) {
                const property = entity[dbProperty.name];
                if (dbProperty.relation && dbProperty.relation.length) {
                    this.updateOriginalValuesAfterSave(property, dbProperty.relation[0].relationEntity, saveResult, entityStateManager);
                }
                else {
                    originalValue[dbProperty.name] = property;
                }
            }
            entityStateManager.setOriginalValues(originalValue, entity);
        }
    }
    removeDeletedEntities(entity, dbEntity, saveResult, entityStateManager, processedEntities) {
        if (entity instanceof Array) {
            for (let i = entity.length - 1; i >= 0; i--) {
                if (this.removeDeletedEntities(entity[i], dbEntity, saveResult, entityStateManager, processedEntities)) {
                    entity.splice(i, 1);
                }
            }
            return !entity.length;
        }
        else {
            if (processedEntities.has(entity)) {
                return entityStateManager.isDeleted(entity);
            }
            processedEntities.add(entity);
            for (const dbRelation of dbEntity.relations) {
                const dbRelationProperty = dbRelation.property;
                const property = entity[dbRelationProperty.name];
                if (!property) {
                    continue;
                }
                switch (dbRelation.relationType) {
                    case EntityRelationType.MANY_TO_ONE:
                        if (this.removeDeletedEntities(property, dbRelation.relationEntity, saveResult, entityStateManager, processedEntities)) {
                            entity[dbRelationProperty.name] = null;
                        }
                        break;
                    case EntityRelationType.ONE_TO_MANY:
                        this.removeDeletedEntities(property, dbRelation.relationEntity, saveResult, entityStateManager, processedEntities);
                        break;
                }
            }
            return entityStateManager.isDeleted(entity);
        }
        return false;
    }
}
DI.set(DB_UPDATE_CACHE_MANAGER, DbUpdateCacheManager);
//# sourceMappingURL=DbUpdateCacheManager.js.map
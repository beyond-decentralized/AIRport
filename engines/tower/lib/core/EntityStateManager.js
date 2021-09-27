import { DI } from '@airport/di';
import { EntityState, ENTITY_STATE_MANAGER } from '@airport/ground-control';
export function markForDeletion(entity) {
    DI.db().getSync(ENTITY_STATE_MANAGER).markForDeletion(entity);
}
export class EntityStateManager {
    isStub(entity) {
        return this.getEntityState(entity) === EntityState.STUB;
    }
    isParentId(entity) {
        return this.getEntityState(entity) === EntityState.PARENT_ID;
    }
    markForDeletion(entity) {
        entity[EntityStateManager.STATE_FIELD] = EntityState.DELETE;
    }
    markToCreate(entity) {
        entity[EntityStateManager.STATE_FIELD] = EntityState.CREATE;
    }
    markToUpdate(entity) {
        entity[EntityStateManager.STATE_FIELD] = EntityState.UPDATE;
    }
    getEntityState(entity) {
        return entity[EntityStateManager.STATE_FIELD];
    }
    getOriginalValues(entity) {
        return entity[EntityStateManager.ORIGINAL_VALUES_PROPERTY];
    }
    setOriginalValues(originalValues, entity) {
        entity[EntityStateManager.ORIGINAL_VALUES_PROPERTY] = originalValues;
    }
    copyEntityState(fromEntity, toEntity) {
        toEntity[EntityStateManager.STATE_FIELD]
            = fromEntity[EntityStateManager.STATE_FIELD];
        toEntity[EntityStateManager.ORIGINAL_VALUES_PROPERTY]
            = fromEntity[EntityStateManager.ORIGINAL_VALUES_PROPERTY];
    }
    getStateFieldName() {
        return EntityStateManager.STATE_FIELD;
    }
    getEntityStateTypeAsFlags(entity, dbEntity) {
        let isCreate, isDelete, isParentId, isPassThrough, isResult, isResultDate, isResultJson, isStub, isUpdate;
        const entityState = this.getEntityState(entity);
        switch (entityState) {
            case EntityState.CREATE:
                isCreate = true;
                break;
            case EntityState.DELETE:
                isDelete = true;
                break;
            case EntityState.PARENT_ID:
                isParentId = true;
                break;
            case EntityState.PASS_THROUGH:
                isPassThrough = true;
                break;
            // case EntityState.RESULT:
            // 	isResult = true
            // 	break
            case EntityState.DATE:
                isResultDate = true;
                break;
            // case EntityState.RESULT_JSON:
            // 	isResultJson = true
            // 	break
            case EntityState.STUB:
                isStub = true;
                break;
            case EntityState.UPDATE:
                isUpdate = true;
                break;
            default:
                throw new Error(`Unexpected entity state
"${this.getStateFieldName()}" for ${dbEntity.name}: ${entityState}`);
        }
        return {
            isCreate,
            isDelete,
            isParentId,
            isPassThrough,
            // isResult,
            isResultDate,
            isStub,
            isUpdate,
        };
    }
    setIsDeleted(isDeleted, entity) {
        entity[EntityStateManager.STATE_FIELD] = EntityState.DELETE;
    }
    isDeleted(entity) {
        return entity[EntityStateManager.STATE_FIELD] === EntityState.DELETE;
    }
    getOperationUniqueId(entity, throwIfNotFound = true, dbEntity = null) {
        const operationUniqueId = entity[EntityStateManager.OPERATION_UNIQUE_ID_FIELD];
        if (!operationUniqueId || typeof operationUniqueId !== 'number' || operationUniqueId < 1) {
            if (throwIfNotFound) {
                let entityDescription;
                if (dbEntity) {
                    entityDescription = dbEntity.schemaVersion.schema.name + '.' + dbEntity.name;
                }
                else {
                    entityDescription = JSON.stringify(entity);
                }
                throw new Error(`Could not find "${EntityStateManager.OPERATION_UNIQUE_ID_FIELD}" property on DTO:
        
        ${entityDescription}`);
            }
        }
        return operationUniqueId;
    }
    copyOperationUniqueId(entity, entityCopy) {
        const operationUniqueId = entity[EntityStateManager.OPERATION_UNIQUE_ID_FIELD];
        entityCopy[EntityStateManager.OPERATION_UNIQUE_ID_FIELD] = operationUniqueId;
    }
    markAsStub(entity) {
        entity[EntityStateManager.STATE_FIELD] = EntityState.STUB;
    }
    getUniqueIdFieldName() {
        return EntityStateManager.OPERATION_UNIQUE_ID_FIELD;
    }
}
EntityStateManager.DELETED_PROPERTY = '__deleted__';
EntityStateManager.ORIGINAL_VALUES_PROPERTY = '__originalValues__';
EntityStateManager.STATE_FIELD = '__state__';
EntityStateManager.OPERATION_UNIQUE_ID_FIELD = '__OUID__';
DI.set(ENTITY_STATE_MANAGER, EntityStateManager);
export function injectEntityStateManager() {
    console.log('inject EntityStateManager');
}
//# sourceMappingURL=EntityStateManager.js.map
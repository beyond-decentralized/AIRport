import { DI } from '@airport/di';
import { EntityState, ENTITY_STATE_MANAGER } from '@airport/ground-control';
export function markAsStub(entity) {
    DI.db().getSync(ENTITY_STATE_MANAGER).markAsStub(entity);
}
export function markForDeletion(entity) {
    DI.db().getSync(ENTITY_STATE_MANAGER).markForDeletion(entity);
}
export function markToCreate(entity) {
    DI.db().getSync(ENTITY_STATE_MANAGER).markToCreate(entity);
}
export function markToUpdate(entity) {
    DI.db().getSync(ENTITY_STATE_MANAGER).markToUpdate(entity);
}
export function getEntityState(entity) {
    DI.db().getSync(ENTITY_STATE_MANAGER).getEntityState(entity);
}
export function copyEntityState(entity, entity2) {
    DI.db().getSync(ENTITY_STATE_MANAGER).copyEntityState(entity, entity2);
}
export function getEntityStateTypeAsFlags(entity, dbEntity) {
    DI.db().getSync(ENTITY_STATE_MANAGER).getEntityStateTypeAsFlags(entity, dbEntity);
}
export function isStub(entity) {
    DI.db().getSync(ENTITY_STATE_MANAGER).isStub(entity);
}
export function isParentId(entity, dbEntity) {
    DI.db().getSync(ENTITY_STATE_MANAGER).isParentId(entity);
}
export class EntityStateManager {
    isStub(entity) {
        return this.getEntityState(entity) === EntityState.STUB;
    }
    isParentId(entity) {
        return this.getEntityState(entity) === EntityState.PARENT_ID;
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
    markAsStub(entity) {
        entity.__state__ = EntityState.STUB;
    }
    markForDeletion(entity) {
        entity.__state__ = EntityState.DELETE;
    }
    markToCreate(entity) {
        entity.__state__ = EntityState.CREATE;
    }
    markToUpdate(entity) {
        entity.__state__ = EntityState.UPDATE;
    }
    getEntityState(entity) {
        return entity.__state__;
    }
    getOriginalValues(entity) {
        return entity[EntityStateManager.ORIGINAL_VALUES_PROPERTY];
    }
    setOriginalValues(originalValues, entity) {
        entity[EntityStateManager.ORIGINAL_VALUES_PROPERTY] = originalValues;
    }
    copyEntityState(fromEntity, toEntity) {
        toEntity.__state__ = fromEntity.__state__;
    }
    getUniqueIdFieldName() {
        return EntityStateManager.OPERATION_UNIQUE_ID_FIELD;
    }
    getStateFieldName() {
        return EntityStateManager.STATE_FIELD;
    }
    getEntityStateTypeAsFlags(entity, dbEntity) {
        let isCreate, isDelete, isParentId, isResult, isResultDate, isResultJson, isStub, isUpdate;
        const entityState = this.getEntityState(entity);
        switch (entityState) {
            case EntityState.CREATE:
                isCreate = true;
                break;
            case EntityState.DELETE:
                isDelete = true;
                break;
            case EntityState.PARENT_ID:
                isUpdate = true;
                break;
            case EntityState.RESULT:
                isResult = true;
                break;
            case EntityState.RESULT_DATE:
                isResultDate = true;
                break;
            case EntityState.RESULT_JSON:
                isResultJson = true;
                break;
            case EntityState.STUB:
                isStub = true;
                break;
            case EntityState.UPDATE:
                isParentId = true;
                break;
            default:
                throw new Error(`Unexpected entity state
"${this.getStateFieldName()}" for ${dbEntity.name}: ${entityState}`);
        }
        return {
            isCreate,
            isDelete,
            isParentId,
            isResult,
            isResultDate,
            isResultJson,
            isStub,
            isUpdate,
        };
    }
    setIsDeleted(isDeleted, entity) {
        entity[EntityStateManager.DELETED_PROPERTY] = true;
    }
    isDeleted(entity) {
        return entity[EntityStateManager.DELETED_PROPERTY];
    }
}
EntityStateManager.DELETED_PROPERTY = '__deleted__';
EntityStateManager.OPERATION_UNIQUE_ID_FIELD = '__UID__';
EntityStateManager.ORIGINAL_VALUES_PROPERTY = '__originalValues__';
EntityStateManager.STATE_FIELD = '__state__';
DI.set(ENTITY_STATE_MANAGER, EntityStateManager);
//# sourceMappingURL=EntityStateManager.js.map
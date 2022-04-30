var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var EntityStateManager_1;
import { Injected } from '@airport/air-control';
import { EntityState } from '@airport/ground-control';
let EntityStateManager = EntityStateManager_1 = class EntityStateManager {
    isStub(entity) {
        return this.getEntityState(entity) === EntityState.STUB;
    }
    isParentId(entity) {
        return this.getEntityState(entity) === EntityState.PARENT_ID;
    }
    markForDeletion(entity) {
        entity[EntityStateManager_1.STATE_FIELD] = EntityState.DELETE;
    }
    markToCreate(entity) {
        entity[EntityStateManager_1.STATE_FIELD] = EntityState.CREATE;
    }
    markToUpdate(entity) {
        entity[EntityStateManager_1.STATE_FIELD] = EntityState.UPDATE;
    }
    getEntityState(entity) {
        return entity[EntityStateManager_1.STATE_FIELD];
    }
    getOriginalValues(entity) {
        return entity[EntityStateManager_1.ORIGINAL_VALUES_PROPERTY];
    }
    setOriginalValues(originalValues, entity) {
        entity[EntityStateManager_1.ORIGINAL_VALUES_PROPERTY] = originalValues;
    }
    copyEntityState(fromEntity, toEntity) {
        toEntity[EntityStateManager_1.STATE_FIELD]
            = fromEntity[EntityStateManager_1.STATE_FIELD];
        toEntity[EntityStateManager_1.ORIGINAL_VALUES_PROPERTY]
            = fromEntity[EntityStateManager_1.ORIGINAL_VALUES_PROPERTY];
    }
    getStateFieldName() {
        return EntityStateManager_1.STATE_FIELD;
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
        entity[EntityStateManager_1.STATE_FIELD] = EntityState.DELETE;
    }
    isDeleted(entity) {
        return entity[EntityStateManager_1.STATE_FIELD] === EntityState.DELETE;
    }
    getOperationUniqueId(entity, throwIfNotFound = true, dbEntity = null) {
        const operationUniqueId = entity[EntityStateManager_1.OPERATION_UNIQUE_ID_FIELD];
        if (!operationUniqueId || typeof operationUniqueId !== 'number' || operationUniqueId < 1) {
            if (throwIfNotFound) {
                let entityDescription;
                if (dbEntity) {
                    entityDescription = dbEntity.applicationVersion.application.name + '.' + dbEntity.name;
                }
                else {
                    entityDescription = JSON.stringify(entity);
                }
                throw new Error(`Could not find "${EntityStateManager_1.OPERATION_UNIQUE_ID_FIELD}" property on DTO:
        
        ${entityDescription}`);
            }
        }
        return operationUniqueId;
    }
    copyOperationUniqueId(entity, entityCopy) {
        const operationUniqueId = entity[EntityStateManager_1.OPERATION_UNIQUE_ID_FIELD];
        entityCopy[EntityStateManager_1.OPERATION_UNIQUE_ID_FIELD] = operationUniqueId;
    }
    markAsStub(entity) {
        entity[EntityStateManager_1.STATE_FIELD] = EntityState.STUB;
    }
    getUniqueIdFieldName() {
        return EntityStateManager_1.OPERATION_UNIQUE_ID_FIELD;
    }
};
EntityStateManager.DELETED_PROPERTY = '__deleted__';
EntityStateManager.ORIGINAL_VALUES_PROPERTY = '__originalValues__';
EntityStateManager.STATE_FIELD = '__state__';
EntityStateManager.OPERATION_UNIQUE_ID_FIELD = '__OUID__';
EntityStateManager = EntityStateManager_1 = __decorate([
    Injected()
], EntityStateManager);
export { EntityStateManager };
export function injectEntityStateManager() {
    console.log('inject EntityStateManager');
}
//# sourceMappingURL=EntityStateManager.js.map
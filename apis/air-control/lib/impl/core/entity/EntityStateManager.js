import { DI } from '@airport/di';
import { ENTITY_STATE_MANAGER } from '../../../tokens';
export var EntityState;
(function (EntityState) {
    EntityState[EntityState["CREATE"] = 1] = "CREATE";
    EntityState[EntityState["DELETE"] = 2] = "DELETE";
    EntityState[EntityState["PARENT_ID"] = 3] = "PARENT_ID";
    EntityState[EntityState["RESULT"] = 4] = "RESULT";
    EntityState[EntityState["RESULT_DATE"] = 5] = "RESULT_DATE";
    EntityState[EntityState["RESULT_JSON"] = 6] = "RESULT_JSON";
    EntityState[EntityState["STUB"] = 7] = "STUB";
    EntityState[EntityState["UPDATE"] = 8] = "UPDATE";
})(EntityState || (EntityState = {}));
export class EntityStateManager {
    isStub(entity) {
        return this.getEntityState(entity) === EntityState.STUB;
    }
    isParentId(entity) {
        return this.getEntityState(entity) === EntityState.PARENT_ID;
    }
    getOperationUniqueIdSeq() {
        return {
            sequence: 1
        };
    }
    uniquelyIdentify(entity, operationUniqueIdSeq) {
        // TODO: wire in in the client to mark all sent objects (used for de-duplication on server side).
        entity[EntityStateManager.OPERATION_UNIQUE_ID_FIELD] = operationUniqueIdSeq.sequence++;
    }
    getOperationUniqueId(entity, throwIfNotFound = true) {
        const operationUniqueId = entity[EntityStateManager.OPERATION_UNIQUE_ID_FIELD];
        if (!operationUniqueId || typeof operationUniqueId !== 'number' || operationUniqueId < 1) {
            if (throwIfNotFound) {
                throw new Error(`Could not find "${EntityStateManager.OPERATION_UNIQUE_ID_FIELD}" property on DTO:
			
			${JSON.stringify(entity)}`);
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
        let isCreate, isDelete, isParentId, isUpdate, isStub;
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
            case EntityState.UPDATE:
                isParentId = true;
                break;
            case EntityState.UPDATE:
                isUpdate = true;
                break;
            case EntityState.STUB:
                isStub = true;
                break;
            default:
                throw new Error(`Unexpected entity state
"${this.getStateFieldName()}" for ${dbEntity.name}: ${entityState}`);
        }
        return [isCreate, isDelete, isParentId, isUpdate, isStub];
    }
}
EntityStateManager.OPERATION_UNIQUE_ID_FIELD = '__UID__';
EntityStateManager.STATE_FIELD = '__state__';
DI.set(ENTITY_STATE_MANAGER, EntityStateManager);
//# sourceMappingURL=EntityStateManager.js.map
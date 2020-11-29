import { DI } from '@airport/di';
import { ENTITY_STATE_MANAGER } from '../../../tokens';
export var EntityState;
(function (EntityState) {
    EntityState[EntityState["CREATE"] = 0] = "CREATE";
    EntityState[EntityState["DELETE"] = 1] = "DELETE";
    EntityState[EntityState["STUB"] = 1] = "STUB";
    EntityState[EntityState["UPDATE"] = 2] = "UPDATE";
})(EntityState || (EntityState = {}));
export class EntityStateManager {
    isStub(entity) {
        return this.getEntityState(entity) === EntityState.STUB;
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
}
EntityStateManager.OPERATION_UNIQUE_ID_FIELD = '__UID__';
EntityStateManager.STATE_FIELD = '__state__';
DI.set(ENTITY_STATE_MANAGER, EntityStateManager);
//# sourceMappingURL=EntityStateManager.js.map
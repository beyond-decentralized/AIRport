export var EntityState;
(function (EntityState) {
    EntityState[EntityState["NEW"] = 0] = "NEW";
    EntityState[EntityState["STUB"] = 1] = "STUB";
    EntityState[EntityState["EXISTING"] = 2] = "EXISTING";
})(EntityState || (EntityState = {}));
export function getEntityState(entity) {
    return entity.__state__;
}
export function isStub(entity) {
    return getEntityState(entity) === EntityState.STUB;
}
export function markAsStub(entity) {
    entity.__state__ = EntityState.STUB;
    return entity;
}
export const OPERATION_UNIQUE_ID_FIELD = '__UID__';
export function getOperationUniqueIdSeq() {
    return {
        sequence: 1
    };
}
// TODO: wire in in the client to mark all sent objects (used for de-duplication on server side).
export function uniquelyIdentify(entity, operationUniqueIdSeq) {
    entity[OPERATION_UNIQUE_ID_FIELD] = operationUniqueIdSeq.sequence++;
}
export function getOperationUniqueId(entity, throwIfNotFound = true) {
    const operationUniqueId = entity[OPERATION_UNIQUE_ID_FIELD];
    if (!operationUniqueId || typeof operationUniqueId !== 'number' || operationUniqueId < 1) {
        if (throwIfNotFound) {
            throw new Error(`Could not find "${OPERATION_UNIQUE_ID_FIELD}" property on DTO:
			
			${JSON.stringify(entity)}`);
        }
    }
    return operationUniqueId;
}
//# sourceMappingURL=EntityState.js.map
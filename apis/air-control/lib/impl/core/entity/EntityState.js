export var EntityState;
(function (EntityState) {
    EntityState[EntityState["NEW"] = 0] = "NEW";
    EntityState[EntityState["STUB"] = 1] = "STUB";
    EntityState[EntityState["EXISTING"] = 2] = "EXISTING";
})(EntityState || (EntityState = {}));
;
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
export function getOperationUniqueId(entity) {
    return entity[OPERATION_UNIQUE_ID_FIELD];
}
export function isNew(entity) {
    return getEntityState(entity) === EntityState.NEW;
}
export function markAsNew(entity) {
    entity.__state__ = EntityState.NEW;
    return entity;
}
export function isExisting(entity) {
    return getEntityState(entity) === EntityState.EXISTING;
}
export function markAsExisting(entity) {
    entity.__state__ = EntityState.EXISTING;
    return entity;
}
//# sourceMappingURL=EntityState.js.map
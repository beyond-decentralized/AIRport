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
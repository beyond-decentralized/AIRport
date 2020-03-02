"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EntityState;
(function (EntityState) {
    EntityState[EntityState["NEW"] = 0] = "NEW";
    EntityState[EntityState["STUB"] = 1] = "STUB";
    EntityState[EntityState["EXISTING"] = 2] = "EXISTING";
})(EntityState = exports.EntityState || (exports.EntityState = {}));
;
function getEntityState(entity) {
    return entity.__state__;
}
exports.getEntityState = getEntityState;
function isStub(entity) {
    return getEntityState(entity) === EntityState.STUB;
}
exports.isStub = isStub;
function markAsStub(entity) {
    entity.__state__ = EntityState.STUB;
    return entity;
}
exports.markAsStub = markAsStub;
function isNew(entity) {
    return getEntityState(entity) === EntityState.NEW;
}
exports.isNew = isNew;
function markAsNew(entity) {
    entity.__state__ = EntityState.NEW;
    return entity;
}
exports.markAsNew = markAsNew;
function isExisting(entity) {
    return getEntityState(entity) === EntityState.EXISTING;
}
exports.isExisting = isExisting;
function markAsExisting(entity) {
    entity.__state__ = EntityState.EXISTING;
    return entity;
}
exports.markAsExisting = markAsExisting;
//# sourceMappingURL=EntityState.js.map
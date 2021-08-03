export var EntityState;
(function (EntityState) {
    EntityState[EntityState["CREATE"] = 1] = "CREATE";
    EntityState[EntityState["DELETE"] = 2] = "DELETE";
    EntityState[EntityState["PARENT_ID"] = 3] = "PARENT_ID";
    EntityState[EntityState["RESULT"] = 4] = "RESULT";
    EntityState[EntityState["RESULT_DATE"] = 5] = "RESULT_DATE";
    EntityState[EntityState["RESULT_JSON"] = 6] = "RESULT_JSON";
    EntityState[EntityState["RESULT_JSON_ARRAY"] = 7] = "RESULT_JSON_ARRAY";
    EntityState[EntityState["STUB"] = 8] = "STUB";
    EntityState[EntityState["UPDATE"] = 9] = "UPDATE";
})(EntityState || (EntityState = {}));
//# sourceMappingURL=EntityStateManager.js.map
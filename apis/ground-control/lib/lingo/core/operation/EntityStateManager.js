export var EntityState;
(function (EntityState) {
    EntityState["CREATE"] = "CREATE";
    EntityState["DELETE"] = "DELETE";
    EntityState["PARENT_ID"] = "PARENT_ID";
    EntityState["RESULT"] = "RESULT";
    EntityState["STUB"] = "STUB";
    EntityState["UPDATE"] = "UPDATE";
    // Json fields promote schema de-normalization
    // RESULT_JSON = 6,
    // RESULT_JSON_ARRAY = 7
})(EntityState || (EntityState = {}));
//# sourceMappingURL=EntityStateManager.js.map
export var EntityState;
(function (EntityState) {
    EntityState["CREATE"] = "CREATE";
    EntityState["DATE"] = "DATE";
    EntityState["DELETE"] = "DELETE";
    // TODO: PARENT_ID is currently not implemented.  It is meant for @ManyToOne()
    // references when nothing is returned except for the id fields of the relation
    EntityState["PARENT_ID"] = "PARENT_ID";
    EntityState["PASS_THROUGH"] = "PASS_THROUGH";
    EntityState["STUB"] = "STUB";
    EntityState["UPDATE"] = "UPDATE";
    // Json fields promote application de-normalization and a currently not implemented
    // except for internal APIs
    // RESULT_JSON = 'RESULT_JSON',
    // RESULT_JSON_ARRAY = 'RESULT_JSON_ARRAY'
})(EntityState || (EntityState = {}));
//# sourceMappingURL=EntityStateManager.js.map
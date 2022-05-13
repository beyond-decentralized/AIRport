export var EntityState;
(function (EntityState) {
    EntityState["CREATE"] = "CREATE";
    EntityState["DATE"] = "DATE";
    EntityState["DELETE"] = "DELETE";
    // TODO: PARENT_ID is currently not implemented.  It is meant for @ManyToOne()
    // references when nothing is returned except for the id fields of the relation
    EntityState["PARENT_ID"] = "PARENT_ID";
    // A "Pass through object" is an existing that is present in the object graph
    // but no operations are performed on it
    EntityState["PASS_THROUGH"] = "PASS_THROUGH";
    // An "Id's only" stub
    EntityState["STUB"] = "STUB";
    EntityState["UPDATE"] = "UPDATE";
    // Json fields promote application de-normalization and a currently not implemented
    // except for internal APIs
    // RESULT_JSON = 'RESULT_JSON',
    // RESULT_JSON_ARRAY = 'RESULT_JSON_ARRAY'
})(EntityState || (EntityState = {}));
//# sourceMappingURL=EntityStateManager.js.map
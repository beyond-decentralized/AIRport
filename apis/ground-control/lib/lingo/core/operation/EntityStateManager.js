export var EntityState;
(function (EntityState) {
    EntityState["CREATE"] = "CREATE";
    EntityState["DATE"] = "DATE";
    EntityState["DELETE"] = "DELETE";
    // Originally it was PARENT_SCHEMA_ID and was meant for @ManyToOne() references
    // when nothing is returned except for the id fields of the relation, however
    // this schenario was sufficiently covered by STUB - id's only stub.  Now it's
    // PARENT_SCHEMA_ID and currently used only for save operations
    // when the entity referenced via the relation belongs to another application.
    // This is because save does not allow to peristance of records across application
    // boundaries (that should be done via an @Api() which will run validation and
    // other logic).
    // In that case we want to keep the ID of the record from another application
    // so that it can be saved in the record of the current application that is
    // referencing it.
    EntityState["PARENT_SCHEMA_ID"] = "PARENT_SCHEMA_ID";
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
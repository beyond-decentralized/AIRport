/**
 * SQL Join contentType.
 */
export var JoinType;
(function (JoinType) {
    JoinType[JoinType["FULL_JOIN"] = 0] = "FULL_JOIN";
    JoinType[JoinType["INNER_JOIN"] = 1] = "INNER_JOIN";
    JoinType[JoinType["LEFT_JOIN"] = 2] = "LEFT_JOIN";
    JoinType[JoinType["RIGHT_JOIN"] = 3] = "RIGHT_JOIN";
})(JoinType || (JoinType = {}));
/**
 * Type of Entity Relation
 */
export var EntityRelationType;
(function (EntityRelationType) {
    EntityRelationType[EntityRelationType["ONE_TO_MANY"] = 0] = "ONE_TO_MANY";
    EntityRelationType[EntityRelationType["MANY_TO_ONE"] = 1] = "MANY_TO_ONE";
})(EntityRelationType || (EntityRelationType = {}));
/**
 * Serialized relation contentType.
 */
export var JSONRelationType;
(function (JSONRelationType) {
    // Join of an entity with the ON clause
    JSONRelationType[JSONRelationType["ENTITY_JOIN_ON"] = 0] = "ENTITY_JOIN_ON";
    // Join of an entity via a schema relation
    JSONRelationType[JSONRelationType["ENTITY_SCHEMA_RELATION"] = 1] = "ENTITY_SCHEMA_RELATION";
    // The root entity in a join
    JSONRelationType[JSONRelationType["ENTITY_ROOT"] = 2] = "ENTITY_ROOT";
    // Join of a sub-query (with the ON clause)
    JSONRelationType[JSONRelationType["SUB_QUERY_JOIN_ON"] = 3] = "SUB_QUERY_JOIN_ON";
    // The root sub-query in a join
    JSONRelationType[JSONRelationType["SUB_QUERY_ROOT"] = 4] = "SUB_QUERY_ROOT";
})(JSONRelationType || (JSONRelationType = {}));
//# sourceMappingURL=Relation.js.map
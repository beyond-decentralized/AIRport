/**
 * SQL Join contentType.
 */
export var JoinType;
(function (JoinType) {
    JoinType["FULL_JOIN"] = "FULL_JOIN";
    JoinType["INNER_JOIN"] = "INNER_JOIN";
    JoinType["LEFT_JOIN"] = "LEFT_JOIN";
    JoinType["RIGHT_JOIN"] = "RIGHT_JOIN";
})(JoinType || (JoinType = {}));
/**
 * Type of Entity Relation
 */
export var EntityRelationType;
(function (EntityRelationType) {
    EntityRelationType["ONE_TO_MANY"] = "ONE_TO_MANY";
    EntityRelationType["MANY_TO_ONE"] = "MANY_TO_ONE";
})(EntityRelationType || (EntityRelationType = {}));
/**
 * Serialized relation contentType.
 */
export var JSONRelationType;
(function (JSONRelationType) {
    // Join of an entity with the ON clause
    JSONRelationType["ENTITY_JOIN_ON"] = "ENTITY_JOIN_ON";
    // Join of an entity via a application relation
    JSONRelationType["ENTITY_APPLICATION_RELATION"] = "ENTITY_APPLICATION_RELATION";
    // The root entity in a join
    JSONRelationType["ENTITY_ROOT"] = "ENTITY_ROOT";
    // Join of a sub-query (with the ON clause)
    JSONRelationType["SUB_QUERY_JOIN_ON"] = "SUB_QUERY_JOIN_ON";
    // The root sub-query in a join
    JSONRelationType["SUB_QUERY_ROOT"] = "SUB_QUERY_ROOT";
})(JSONRelationType || (JSONRelationType = {}));
//# sourceMappingURL=Relation.js.map
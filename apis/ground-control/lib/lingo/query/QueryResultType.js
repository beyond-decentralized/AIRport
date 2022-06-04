export var QueryResultType;
(function (QueryResultType) {
    // Ordered query result with bridging for all MtOs and OtM
    QueryResultType["ENTITY_GRAPH"] = "ENTITY_GRAPH";
    // Ordered query result, with objects grouped hierarchically by entity
    QueryResultType["ENTITY_TREE"] = "ENTITY_TREE";
    // Ordered query result, with objects grouped hierarchically by mapping
    QueryResultType["TREE"] = "TREE";
    // Flat array query result, with no forced ordering or grouping
    QueryResultType["SHEET"] = "SHEET";
    // A single field query result, with no forced ordering or grouping
    QueryResultType["FIELD"] = "FIELD";
    // Raw result, returned by a SQL string query
    QueryResultType["RAW"] = "RAW";
})(QueryResultType || (QueryResultType = {}));
//# sourceMappingURL=QueryResultType.js.map
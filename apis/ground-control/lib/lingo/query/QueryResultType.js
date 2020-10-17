export var QueryResultType;
(function (QueryResultType) {
    // Ordered query result with bridging for all MtOs and OtM
    QueryResultType[QueryResultType["ENTITY_GRAPH"] = 0] = "ENTITY_GRAPH";
    // Ordered query result, with objects grouped hierarchically by entity
    QueryResultType[QueryResultType["ENTITY_TREE"] = 1] = "ENTITY_TREE";
    // Ordered query result, with objects grouped hierarchically by mapping
    QueryResultType[QueryResultType["TREE"] = 2] = "TREE";
    // Flat array query result, with no forced ordering or grouping
    QueryResultType[QueryResultType["SHEET"] = 3] = "SHEET";
    // A single field query result, with no forced ordering or grouping
    QueryResultType[QueryResultType["FIELD"] = 4] = "FIELD";
    // Raw result, returned by a SQL string query
    QueryResultType[QueryResultType["RAW"] = 5] = "RAW";
    // ENTITY_GRAPH with all arrays returned as a MappedEntityArray
    QueryResultType[QueryResultType["MAPPED_ENTITY_GRAPH"] = 6] = "MAPPED_ENTITY_GRAPH";
    // ENTITY_TREE with all arrays returned as a MappedEntityArray
    QueryResultType[QueryResultType["MAPPED_ENTITY_TREE"] = 7] = "MAPPED_ENTITY_TREE";
})(QueryResultType || (QueryResultType = {}));
//# sourceMappingURL=QueryResultType.js.map
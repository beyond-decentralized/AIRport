export var OperationType;
(function (OperationType) {
    OperationType[OperationType["DELETE"] = 0] = "DELETE";
    OperationType[OperationType["FIND_ONE_GRAPH"] = 1] = "FIND_ONE_GRAPH";
    OperationType[OperationType["FIND_ONE_TREE"] = 2] = "FIND_ONE_TREE";
    OperationType[OperationType["FIND_GRAPH"] = 3] = "FIND_GRAPH";
    OperationType[OperationType["FIND_TREE"] = 4] = "FIND_TREE";
    OperationType[OperationType["SAVE"] = 5] = "SAVE";
    OperationType[OperationType["SEARCH_ONE_GRAPH"] = 6] = "SEARCH_ONE_GRAPH";
    OperationType[OperationType["SEARCH_ONE_TREE"] = 7] = "SEARCH_ONE_TREE";
    OperationType[OperationType["SEARCH_GRAPH"] = 8] = "SEARCH_GRAPH";
    OperationType[OperationType["SEARCH_TREE"] = 9] = "SEARCH_TREE";
})(OperationType || (OperationType = {}));
export var QueryInputKind;
(function (QueryInputKind) {
    QueryInputKind[QueryInputKind["PARAMETER"] = 0] = "PARAMETER";
    QueryInputKind[QueryInputKind["Q"] = 1] = "Q";
    QueryInputKind[QueryInputKind["QENTITY"] = 2] = "QENTITY";
})(QueryInputKind || (QueryInputKind = {}));
export var QueryParameterType;
(function (QueryParameterType) {
    QueryParameterType[QueryParameterType["BOOLEAN"] = 0] = "BOOLEAN";
    QueryParameterType[QueryParameterType["DATE"] = 1] = "DATE";
    QueryParameterType[QueryParameterType["NUMBER"] = 2] = "NUMBER";
    QueryParameterType[QueryParameterType["STRING"] = 3] = "STRING";
})(QueryParameterType || (QueryParameterType = {}));
//# sourceMappingURL=Operation.js.map
/**
 * Category of a SQL contentType
 */
export var OperationCategory;
(function (OperationCategory) {
    OperationCategory["BOOLEAN"] = "BOOLEAN";
    OperationCategory["DATE"] = "DATE";
    OperationCategory["FUNCTION"] = "FUNCTION";
    OperationCategory["LOGICAL"] = "LOGICAL";
    OperationCategory["NUMBER"] = "NUMBER";
    OperationCategory["STRING"] = "STRING";
    OperationCategory["UNTYPED"] = "UNTYPED"; // Operation on an untyped field
})(OperationCategory || (OperationCategory = {}));
export var SqlOperator;
(function (SqlOperator) {
    SqlOperator["AND"] = "AND";
    SqlOperator["EQUALS"] = "EQUALS";
    SqlOperator["EXISTS"] = "EXISTS";
    SqlOperator["GREATER_THAN"] = "GREATER_THAN";
    SqlOperator["GREATER_THAN_OR_EQUALS"] = "GREATER_THAN_OR_EQUALS";
    SqlOperator["IN"] = "IN";
    SqlOperator["IS_NOT_NULL"] = "IS_NOT_NULL";
    SqlOperator["IS_NULL"] = "IS_NULL";
    SqlOperator["LESS_THAN"] = "LESS_THAN";
    SqlOperator["LESS_THAN_OR_EQUALS"] = "LESS_THAN_OR_EQUALS";
    SqlOperator["LIKE"] = "LIKE";
    SqlOperator["OR"] = "OR";
    SqlOperator["NOT"] = "NOT";
    SqlOperator["NOT_EQUALS"] = "NOT_EQUALS";
    SqlOperator["NOT_IN"] = "NOT_IN";
})(SqlOperator || (SqlOperator = {}));
export var CRUDOperation;
(function (CRUDOperation) {
    CRUDOperation["CREATE"] = "CREATE";
    CRUDOperation["READ"] = "READ";
    CRUDOperation["UPDATE"] = "UPDATE";
    CRUDOperation["DELETE"] = "DELETE";
})(CRUDOperation || (CRUDOperation = {}));
//# sourceMappingURL=Operation.js.map
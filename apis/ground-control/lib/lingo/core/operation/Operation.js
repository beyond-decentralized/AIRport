"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Category of a SQL contentType
 */
var OperationCategory;
(function (OperationCategory) {
    OperationCategory[OperationCategory["BOOLEAN"] = 0] = "BOOLEAN";
    OperationCategory[OperationCategory["DATE"] = 1] = "DATE";
    OperationCategory[OperationCategory["FUNCTION"] = 2] = "FUNCTION";
    OperationCategory[OperationCategory["LOGICAL"] = 3] = "LOGICAL";
    OperationCategory[OperationCategory["NUMBER"] = 4] = "NUMBER";
    OperationCategory[OperationCategory["STRING"] = 5] = "STRING";
    OperationCategory[OperationCategory["UNTYPED"] = 6] = "UNTYPED"; // Operation on an untyped field
})(OperationCategory = exports.OperationCategory || (exports.OperationCategory = {}));
var SqlOperator;
(function (SqlOperator) {
    SqlOperator[SqlOperator["AND"] = 0] = "AND";
    SqlOperator[SqlOperator["EQUALS"] = 1] = "EQUALS";
    SqlOperator[SqlOperator["EXISTS"] = 2] = "EXISTS";
    SqlOperator[SqlOperator["GREATER_THAN"] = 3] = "GREATER_THAN";
    SqlOperator[SqlOperator["GREATER_THAN_OR_EQUALS"] = 4] = "GREATER_THAN_OR_EQUALS";
    SqlOperator[SqlOperator["IN"] = 5] = "IN";
    SqlOperator[SqlOperator["IS_NOT_NULL"] = 6] = "IS_NOT_NULL";
    SqlOperator[SqlOperator["IS_NULL"] = 7] = "IS_NULL";
    SqlOperator[SqlOperator["LESS_THAN"] = 8] = "LESS_THAN";
    SqlOperator[SqlOperator["LESS_THAN_OR_EQUALS"] = 9] = "LESS_THAN_OR_EQUALS";
    SqlOperator[SqlOperator["LIKE"] = 10] = "LIKE";
    SqlOperator[SqlOperator["OR"] = 11] = "OR";
    SqlOperator[SqlOperator["NOT"] = 12] = "NOT";
    SqlOperator[SqlOperator["NOT_EQUALS"] = 13] = "NOT_EQUALS";
    SqlOperator[SqlOperator["NOT_IN"] = 14] = "NOT_IN";
})(SqlOperator = exports.SqlOperator || (exports.SqlOperator = {}));
var CRUDOperation;
(function (CRUDOperation) {
    CRUDOperation[CRUDOperation["CREATE"] = 0] = "CREATE";
    CRUDOperation[CRUDOperation["READ"] = 1] = "READ";
    CRUDOperation[CRUDOperation["UPDATE"] = 2] = "UPDATE";
    CRUDOperation[CRUDOperation["DELETE"] = 3] = "DELETE";
})(CRUDOperation = exports.CRUDOperation || (exports.CRUDOperation = {}));
//# sourceMappingURL=Operation.js.map
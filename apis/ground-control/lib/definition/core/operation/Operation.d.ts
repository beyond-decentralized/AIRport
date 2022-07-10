import { JsonFieldQuery } from '../../query/facade/FieldQuery';
import { JSONClauseField, JSONClauseObject } from '../field/JSONClause';
/**
 * Category of a SQL contentType
 */
export declare enum OperationCategory {
    BOOLEAN = "BOOLEAN",
    DATE = "DATE",
    FUNCTION = "FUNCTION",
    LOGICAL = "LOGICAL",
    NUMBER = "NUMBER",
    STRING = "STRING",
    UNTYPED = "UNTYPED"
}
export declare enum SqlOperator {
    AND = "AND",
    EQUALS = "EQUALS",
    EXISTS = "EXISTS",
    GREATER_THAN = "GREATER_THAN",
    GREATER_THAN_OR_EQUALS = "GREATER_THAN_OR_EQUALS",
    IN = "IN",
    IS_NOT_NULL = "IS_NOT_NULL",
    IS_NULL = "IS_NULL",
    LESS_THAN = "LESS_THAN",
    LESS_THAN_OR_EQUALS = "LESS_THAN_OR_EQUALS",
    LIKE = "LIKE",
    OR = "OR",
    NOT = "NOT",
    NOT_EQUALS = "NOT_EQUALS",
    NOT_IN = "NOT_IN"
}
/**
 * Serialized version of a function call.
 */
export interface JSONFunctionOperation extends JSONBaseOperation {
    ob: JSONClauseObject;
}
/**
 * Serialized version of a value contentType.
 */
export interface JSONValueOperation extends JSONBaseOperation {
    l: JSONClauseField;
    r?: JSONClauseField | JSONClauseField[] | JsonFieldQuery;
}
/**
 * All serialized operations extend this class
 */
export interface JSONBaseOperation {
    /**
     * Category of the IOperation.
     */
    c: OperationCategory;
    /**
     * Operator
     */
    o: SqlOperator;
}
export declare enum CRUDOperation {
    CREATE = "CREATE",
    READ = "READ",
    UPDATE = "UPDATE",
    DELETE = "DELETE"
}
//# sourceMappingURL=Operation.d.ts.map
import { JsonFieldQuery } from '../../query/facade/FieldQuery';
import { JSONClauseField, JSONClauseObject } from '../field/JSONClause';
/**
 * Category of a SQL contentType
 */
export declare enum OperationCategory {
    BOOLEAN = 0,
    DATE = 1,
    FUNCTION = 2,
    LOGICAL = 3,
    NUMBER = 4,
    STRING = 5,
    UNTYPED = 6
}
export declare enum SqlOperator {
    AND = 0,
    EQUALS = 1,
    EXISTS = 2,
    GREATER_THAN = 3,
    GREATER_THAN_OR_EQUALS = 4,
    IN = 5,
    IS_NOT_NULL = 6,
    IS_NULL = 7,
    LESS_THAN = 8,
    LESS_THAN_OR_EQUALS = 9,
    LIKE = 10,
    OR = 11,
    NOT = 12,
    NOT_EQUALS = 13,
    NOT_IN = 14
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
    CREATE = 0,
    READ = 1,
    UPDATE = 2,
    DELETE = 3
}
//# sourceMappingURL=Operation.d.ts.map
/**
 * Operations define how records can be Created, Updated and Deleted.
 * They specify the structure of the inputted objects (as well as nested
 * objects).  That in turn defines exactly which objects are
 * created/updated/deleted by an operation.
 */
import { JsonQuery } from '../query/facade/Query';
import { DbEntity } from './Entity';
export declare type Operation_Id = number;
export declare type Operation_Name = string;
export declare type Operation_Rule = string;
export declare type Operation_Type = number;
export declare enum OperationType {
    DELETE = 0,
    FIND_ONE_GRAPH = 1,
    FIND_ONE_TREE = 2,
    FIND_GRAPH = 3,
    FIND_TREE = 4,
    SAVE = 5,
    SEARCH_ONE_GRAPH = 6,
    SEARCH_ONE_TREE = 7,
    SEARCH_GRAPH = 8,
    SEARCH_TREE = 9
}
export interface JsonOperations {
    [operationName: string]: JsonOperation;
}
export interface JsonOperation {
    type: OperationType;
}
export declare enum QueryInputKind {
    PARAMETER = 0,
    Q = 1,
    QENTITY = 2
}
export declare enum QueryParameterType {
    BOOLEAN = 0,
    DATE = 1,
    NUMBER = 2,
    STRING = 3
}
export interface QueryInput {
    clazz?: string;
    name: string;
    type: QueryInputKind;
}
export interface QueryParameter extends QueryInput {
    parameterType: QueryParameterType;
    type: QueryInputKind.PARAMETER;
}
export interface QueryInputQEntity extends QueryInput {
    type: QueryInputKind.QENTITY;
}
export interface JsonFormattedQuery {
    inputs: QueryInput[];
    type: OperationType.FIND_GRAPH | OperationType.FIND_TREE | OperationType.FIND_ONE_GRAPH | OperationType.FIND_ONE_TREE | OperationType.SEARCH_GRAPH | OperationType.SEARCH_TREE | OperationType.SEARCH_ONE_GRAPH | OperationType.SEARCH_ONE_TREE;
    query: JsonQuery;
}
export interface JsonPersistRule extends JsonOperation, JsonOperationRule {
    type: OperationType.DELETE | OperationType.SAVE;
}
export interface JsonOperationRule {
    anyValue?: boolean;
    functionCall?: JsonFunctionCall;
    isArray?: boolean;
    isNull?: boolean;
    numericValue?: number;
    operator?: '|';
    subRules?: {
        [key: string]: JsonOperationRule;
    } | JsonOperationRule[];
}
export interface JsonFunctionCall {
    functionName: string;
    parameters: number[];
}
export interface DbOperation {
    id: Operation_Id;
    name: Operation_Name;
    rule: Operation_Rule;
    type: Operation_Type;
    entity: DbEntity;
}
//# sourceMappingURL=Operation.d.ts.map
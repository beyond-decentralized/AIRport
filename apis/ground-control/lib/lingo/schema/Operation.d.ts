/**
 * Operations define how records can be Created, Updated and Deleted.
 * They specify the structure of the inputted objects (as well as nested
 * objects).  That in turn defines exactly which objects are
 * created/updated/deleted by an operation.
 */
import { DbEntity } from './Entity';
export declare type Operation_Id = number;
export declare type Operation_Name = string;
export declare type Operation_Rule = string;
export declare type Operation_Type = number;
export declare enum OperationType {
    CREATE = 0,
    DELETE = 1,
    SAVE = 2,
    UPDATE = 3
}
export interface JsonOperations {
    [operationName: string]: JsonOperation;
}
export interface JsonOperation extends JsonOperationRule {
    type: OperationType;
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
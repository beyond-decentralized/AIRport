/**
 * Operation Rules define how records can be Created, Updated and Deleted.
 * They specify the structure of the inputted objects (as well as nested
 * objects).  That in turn defines exactly which objects are
 * created/updated/deleted by an operation.
 */
import { DbEntity } from './Entity';
export declare type OperationRule_Id = number;
export declare type OperationRule_Name = string;
export declare type OperationRule_Rule = string;
export declare type OperationRule_Type = number;
export declare enum OperationRuleType {
    CREATE = 0,
    DELETE = 1,
    SAVE = 2,
    UPDATE = 3
}
export interface JsonOperationRules {
    [operationName: string]: JsonOperationRule;
}
export interface JsonOperationRule extends JsonOperationRulePart {
    type: OperationRuleType;
}
export interface JsonOperationRulePart {
    anyValue?: boolean;
    isNull?: boolean;
    operator?: '&' | '(' | '|';
    numericValue?: number;
    subRules?: {
        [key: string]: JsonOperationRulePart;
    };
}
export interface DbOperationRule {
    id: OperationRule_Id;
    name: OperationRule_Name;
    rule: OperationRule_Rule;
    type: OperationRule_Type;
    entity: DbEntity;
}

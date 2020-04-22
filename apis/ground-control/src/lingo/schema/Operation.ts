/**
 * Operations define how records can be Created, Updated and Deleted.
 * They specify the structure of the inputted objects (as well as nested
 * objects).  That in turn defines exactly which objects are
 * created/updated/deleted by an operation.
 */
import {DbEntity} from './Entity'

export type Operation_Id = number
export type Operation_Name = string
export type Operation_Rule = string
export type Operation_Type = number

export enum OperationType {
	CREATE,
	DELETE,
	SAVE,
	UPDATE
}

export interface JsonOperations {
	[operationName: string]: JsonOperation
}

export interface JsonOperation
	extends JsonOperationRule {
	type: OperationType
}

export interface JsonOperationRule {
	anyValue?: boolean
	isNull?: boolean
	operator?: '&' | '(' | '|'
	numericValue?: number
	subRules?: { [key: string]: JsonOperationRule }
}

export interface DbOperation {
	id: Operation_Id
	name: Operation_Name
	rule: Operation_Rule
	type: Operation_Type
	entity: DbEntity
}

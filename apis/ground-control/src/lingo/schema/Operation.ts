/**
 * Operations define how records can be Created, Updated and Deleted.
 * They specify the structure of the inputted objects (as well as nested
 * objects).  That in turn defines exactly which objects are
 * created/updated/deleted by an operation.
 */
import { JsonQuery } from '../query/facade/Query';
import { DbEntity }  from './Entity';

export type Operation_Id = number
export type Operation_Name = string
export type Operation_Rule = string
export type Operation_Type = number

export enum OperationType {
	DELETE,
	FIND_ONE_GRAPH,
	FIND_ONE_TREE,
	FIND_GRAPH,
	FIND_TREE,
	SAVE,
	SEARCH_ONE_GRAPH,
	SEARCH_ONE_TREE,
	SEARCH_GRAPH,
	SEARCH_TREE
}

export interface JsonOperations {
	[operationName: string]: JsonOperation
}

export interface JsonOperation {
	type: OperationType
}

export interface JsonFormattedQuery {
	type: OperationType.FIND_GRAPH | OperationType.FIND_TREE
		| OperationType.FIND_ONE_GRAPH | OperationType.FIND_ONE_TREE
		| OperationType.SEARCH_GRAPH | OperationType.SEARCH_TREE
		| OperationType.SEARCH_ONE_GRAPH | OperationType.SEARCH_ONE_TREE
	query: JsonQuery
}

export interface JsonPersistRule
	extends JsonOperation,
	        JsonOperationRule {
	type: OperationType.DELETE | OperationType.SAVE
}

export interface JsonOperationRule {
	anyValue?: boolean
	functionCall?: JsonFunctionCall
	isArray?: boolean
	isNull?: boolean
	numericValue?: number
	operator?: '|'
	subRules?: { [key: string]: JsonOperationRule } | JsonOperationRule[]
}

export interface JsonFunctionCall {
	functionName: string
	parameters: number[]
}

export interface DbOperation {
	id: Operation_Id
	name: Operation_Name
	rule: Operation_Rule
	type: Operation_Type
	entity: DbEntity
}

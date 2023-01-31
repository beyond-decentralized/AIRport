/**
 * Operations define how records can be Created, Updated and Deleted.
 * They specify the structure of the inputted objects (as well as nested
 * objects).  That in turn defines exactly which objects are
 * created/updated/deleted by an operation.
 */
import { PortableApplicationQuery } from '../query/PortableQuery';

export type DbOperation_LocalId = number
export type DbOperation_Name = string
export type DbOperation_Rule = string
export type DbOperation_Type = number

export enum DbOperationType {
	DELETE = 'DELETE',
	FIND_ONE_GRAPH = 'FIND_ONE_GRAPH',
	FIND_ONE_TREE = 'FIND_ONE_TREE',
	FIND_GRAPH = 'FIND_GRAPH',
	FIND_TREE = 'FIND_TREE',
	SAVE = 'SAVE',
	SEARCH_ONE_GRAPH = 'SEARCH_ONE_GRAPH',
	SEARCH_ONE_TREE = 'SEARCH_ONE_TREE',
	SEARCH_GRAPH = 'SEARCH_GRAPH',
	SEARCH_TREE = 'SEARCH_TREE'
}

export interface JsonOperations {
	[operationName: string]: JsonOperation
}

export interface JsonOperation {
	type: DbOperationType
}

export enum QueryInputKind {
	PARAMETER = 'PARAMETER',
	Q = 'Q',
	QENTITY = 'QENTITY'
}

export enum QueryParameterType {
	BOOLEAN = 'BOOLEAN',
	DATE = 'DATE',
	NUMBER = 'NUMBER',
	STRING = 'STRING'
}

export interface IQueryInput {
	clazz?: string
	name: string
	type: QueryInputKind
}

export interface IQueryParameter
	extends IQueryInput {
	isArray: boolean
	parameterType: QueryParameterType
	type: QueryInputKind.PARAMETER
}

export interface IQueryInputQEntity
	extends IQueryInput {
	type: QueryInputKind.QENTITY
}

export interface JsonFormattedQuery
	extends JsonOperation {
	inputs: IQueryInput[]
	query: PortableApplicationQuery
	type: DbOperationType.FIND_GRAPH | DbOperationType.FIND_TREE
		| DbOperationType.FIND_ONE_GRAPH | DbOperationType.FIND_ONE_TREE
		| DbOperationType.SEARCH_GRAPH | DbOperationType.SEARCH_TREE
		| DbOperationType.SEARCH_ONE_GRAPH | DbOperationType.SEARCH_ONE_TREE
}

export interface JsonPersistRule
	extends JsonOperation,
	        JsonOperationRule {
	type: DbOperationType.DELETE | DbOperationType.SAVE
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

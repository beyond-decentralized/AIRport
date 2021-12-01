import {JsonTreeQuery} from '../../query/facade/TreeQuery';
import {
	JSONBaseOperation,
	SqlOperator
}                      from '../operation/Operation';

/**
 * SQL Join contentType.
 */
export enum JoinType {
	FULL_JOIN = 'FULL_JOIN',
	INNER_JOIN = 'INNER_JOIN',
	LEFT_JOIN = 'LEFT_JOIN',
	RIGHT_JOIN = 'RIGHT_JOIN'
}

/**
 * Type of Entity Relation
 */
export enum EntityRelationType {
	ONE_TO_MANY = 'ONE_TO_MANY',
	MANY_TO_ONE = 'MANY_TO_ONE'
}

/**
 * Serialized relation contentType.
 */
export enum JSONRelationType {
	// Join of an entity with the ON clause
	ENTITY_JOIN_ON = 'ENTITY_JOIN_ON',
	// Join of an entity via a application relation
	ENTITY_SCHEMA_RELATION = 'ENTITY_SCHEMA_RELATION',
	// The root entity in a join
	ENTITY_ROOT = 'ENTITY_ROOT',
	// Join of a sub-query (with the ON clause)
	SUB_QUERY_JOIN_ON = 'SUB_QUERY_JOIN_ON',
	// The root sub-query in a join
	SUB_QUERY_ROOT = 'SUB_QUERY_ROOT'
}

/**
 * Serialized relation.
 */
export interface JSONRelation {
	/**
	 * Current Child Index
	 * Index of the child entity in the relation FROM branch
	 */
	currentChildIndex: number;
	/**
	 * Table Index
	 * Table Index of the parent entity in relation
	 */
	ti?: number;
	/**
	 * From Clause Position
	 * Entity position in the FROM clause tree
	 */
	fromClausePosition: number[];
	/**
	 *  Join Type
	 * Type of SQL join in relation
	 */
	jt: JoinType;
	/**
	 *  Relation Type
	 * Type of serialized relation
	 */
	rt: JSONRelationType;
	/**
	 *  Root Entity Prefix
	 ** Prefix of the alias of the root entity in the FROM clause
	 */
	rep: string;
	/**
	 *  Application Index
	 * Application Index of the parent entity in relation
	 */
	si?: number;
}

/**
 * Serialized JOIN relation
 */
export interface JSONJoinRelation extends JSONRelation {
	/**
	 *  Join Where Clause
	 * X in the JOIN ... ON X
	 */
	joinWhereClause?: JSONBaseOperation;
}

/**
 * Serialized JOIN relation to a sub-view/sub-query
 */
export interface JSONViewJoinRelation extends JSONJoinRelation {
	/**
	 *  Sub Query
	 * Sub-query definition
	 */
	subQuery: JsonTreeQuery;
}

/**
 * Serialized relation to an ORM Entity
 *
 * Optional joinWhereClause represents contentType of @WhereJoinTable
 */
export interface JSONEntityRelation extends JSONJoinRelation {
	/**
	 * Relation Index
	 * Index of the Many-To-One or One-To-Many relation
	 */
	ri: number;
	/**
	 * Where Join Table Operator
	 * How @WhereJoinTable is joined to the rest of the JOIN ON
	 */
	joinWhereClauseOperator?: SqlOperator.AND | SqlOperator.OR;
}

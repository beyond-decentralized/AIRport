import { JsonTreeQuery } from '../../query/facade/TreeQuery';
import { JSONBaseOperation, SqlOperator } from '../operation/Operation';
/**
 * SQL Join contentType.
 */
export declare enum JoinType {
    FULL_JOIN = 0,
    INNER_JOIN = 1,
    LEFT_JOIN = 2,
    RIGHT_JOIN = 3
}
/**
 * Type of Entity Relation
 */
export declare enum EntityRelationType {
    ONE_TO_MANY = 0,
    MANY_TO_ONE = 1
}
/**
 * Serialized relation contentType.
 */
export declare enum JSONRelationType {
    ENTITY_JOIN_ON = 0,
    ENTITY_SCHEMA_RELATION = 1,
    ENTITY_ROOT = 2,
    SUB_QUERY_JOIN_ON = 3,
    SUB_QUERY_ROOT = 4
}
/**
 * Serialized relation.
 */
export interface JSONRelation {
    /**
     * Current Child Index
     * Index of the child entity in the relation FROM branch
     */
    cci: number;
    /**
     * Table Index
     * Table Index of the parent entity in relation
     */
    ti?: number;
    /**
     * From Clause Position
     * Entity position in the FROM clause tree
     */
    fcp: number[];
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
     *  Schema Index
     * Schema Index of the parent entity in relation
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
    jwc?: JSONBaseOperation;
}
/**
 * Serialized JOIN relation to a sub-view/sub-query
 */
export interface JSONViewJoinRelation extends JSONJoinRelation {
    /**
     *  Sub Query
     * Sub-query definition
     */
    sq: JsonTreeQuery;
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
    wjto?: SqlOperator.AND | SqlOperator.OR;
}
//# sourceMappingURL=Relation.d.ts.map
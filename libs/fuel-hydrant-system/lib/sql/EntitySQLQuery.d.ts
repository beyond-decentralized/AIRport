import { IAirportDatabase, IEntitySelectProperties, ISchemaUtils, JoinTreeNode } from '@airport/air-control';
import { DbEntity, JsonEntityQuery, JSONEntityRelation, QueryResultType } from '@airport/ground-control';
import { IEntityOrderByParser } from '../orderBy/AbstractEntityOrderByParser';
import { GraphQueryConfiguration } from '../result/entity/IEntityResultParser';
import { SQLDialect, SQLQuery } from './core/SQLQuery';
/**
 * Created by Papa on 10/16/2016.
 */
/**
 * Represents SQL String query with Entity tree Select clause.
 */
export declare class EntitySQLQuery<IEP extends IEntitySelectProperties> extends SQLQuery<JsonEntityQuery<IEP>> {
    protected graphQueryConfiguration?: GraphQueryConfiguration;
    protected finalSelectTree: any;
    orderByParser: IEntityOrderByParser;
    protected joinTree: JoinTreeNode;
    private queryParser;
    private columnAliases;
    constructor(jsonQuery: JsonEntityQuery<IEP>, dbEntity: DbEntity, dialect: SQLDialect, queryResultType: QueryResultType, schemaUtils: ISchemaUtils, graphQueryConfiguration?: GraphQueryConfiguration);
    toSQL(airDb: IAirportDatabase, schemaUtils: ISchemaUtils): string;
    /**
     * If bridging is not applied:
     *
     * Entities get merged if they are right next to each other in the result set.  If they
     * are not, they are treated as separate entities - hence, your sort order matters.
     *
     * If bridging is applied - all entities get merged - your sort order does not matter.
     * Might as well disallow sort order for bridged queries (or re-sort in memory)?
     *
     * @param results
     * @returns {any[]}
     */
    parseQueryResults(schemaUtils: ISchemaUtils, results: any[]): any[];
    protected buildFromJoinTree(joinRelations: JSONEntityRelation[], joinNodeMap: {
        [alias: string]: JoinTreeNode;
    }, airDb: IAirportDatabase, schemaUtils: ISchemaUtils): JoinTreeNode;
    private getSELECTFragment;
    protected parseQueryResult(selectClauseFragment: any, entityAlias: string, currentJoinNode: JoinTreeNode, resultRow: any, nextFieldIndex: number[], schemaUtils: ISchemaUtils): any;
    /**
     * Verify that the entity select clause is valid (has ids) and fill in clauses
     * that are blank (defined as {}).
     *
     *
     * {
     *  id1: Y,
     *  id2: {
     *    subId1: Y
     *  },
     *  other1: Y
     * }
     *
     * @param selectClauseFragment
     * @param {DbEntity} dbEntity
     * @returns {any}
     */
    private setupSelectFields;
    private getFROMFragment;
}

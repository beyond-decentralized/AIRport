import { IAirportDatabase, IApplicationUtils, IEntitySelectProperties, IQMetadataUtils, IRelationManager, JoinTreeNode } from '@airport/air-control';
import { DbEntity, DbProperty, IEntityStateManager, InternalFragments, JsonEntityQuery, JSONEntityRelation, QueryResultType } from '@airport/ground-control';
import { IStoreDriver } from '@airport/terminal-map';
import { ISQLQueryAdaptor } from '../adaptor/SQLQueryAdaptor';
import { IFuelHydrantContext } from '../FuelHydrantContext';
import { IEntityOrderByParser } from '../orderBy/AbstractEntityOrderByParser';
import { GraphQueryConfiguration } from '../result/entity/IEntityResultParser';
import { IObjectResultParserFactory } from '../result/entity/ObjectResultParserFactory';
import { IValidator } from '../validation/Validator';
import { SQLDialect, SQLQuery } from './core/SQLQuery';
/**
 * Created by Papa on 10/16/2016.
 */
/**
 * Represents SQL String query with Entity tree Select clause.
 */
export declare class EntitySQLQuery<IEP extends IEntitySelectProperties> extends SQLQuery<JsonEntityQuery<IEP>> {
    protected objectResultParserFactory: IObjectResultParserFactory;
    protected relationManager: IRelationManager;
    protected graphQueryConfiguration?: GraphQueryConfiguration;
    orderByParser: IEntityOrderByParser;
    protected finalSelectTree: any;
    protected joinTree: JoinTreeNode;
    private queryParser;
    private columnAliases;
    constructor(jsonQuery: JsonEntityQuery<IEP>, dbEntity: DbEntity, dialect: SQLDialect, queryResultType: QueryResultType, airportDatabase: IAirportDatabase, applicationUtils: IApplicationUtils, entityStateManager: IEntityStateManager, objectResultParserFactory: IObjectResultParserFactory, qMetadataUtils: IQMetadataUtils, qValidator: IValidator, relationManager: IRelationManager, sqlQueryAdapter: ISQLQueryAdaptor, storeDriver: IStoreDriver, context: IFuelHydrantContext, graphQueryConfiguration?: GraphQueryConfiguration);
    toSQL(internalFragments: InternalFragments, context: IFuelHydrantContext): string;
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
    parseQueryResults(results: any[], internalFragments: InternalFragments, queryResultType: QueryResultType, context: IFuelHydrantContext, bridgedQueryConfiguration?: any): Promise<any[]>;
    protected buildFromJoinTree(joinRelations: JSONEntityRelation[], joinNodeMap: {
        [alias: string]: JoinTreeNode;
    }, context: IFuelHydrantContext): JoinTreeNode;
    protected parseQueryResult(selectClauseFragment: any, entityAlias: string, currentJoinNode: JoinTreeNode, resultRow: any, nextColumnIndex: number[], context: IFuelHydrantContext): any;
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
     * If no properties are specified all properties are included.
     *
     * @param selectClauseFragment
     * @param {DbEntity} dbEntity
     * @returns {any}
     */
    protected setupSelectFields(selectClauseFragment: any, dbEntity: DbEntity, context: IFuelHydrantContext, parentDbProperty?: DbProperty): any;
    private getSELECTFragment;
    private getFROMFragment;
}
//# sourceMappingURL=EntitySQLQuery.d.ts.map
import { IAirportDatabase, IApplicationUtils, IQEntityInternal, IQMetadataUtils, IUtils, JoinTreeNode } from '@airport/air-traffic-control';
import { DbEntity, InternalFragments, JSONEntityRelation, JsonQuery, JSONRelation, QueryResultType, ApplicationMap, IEntityStateManager } from '@airport/ground-control';
import { IStoreDriver } from '@airport/terminal-map';
import { ISQLQueryAdaptor } from '../../adaptor/SQLQueryAdaptor';
import { IFuelHydrantContext } from '../../FuelHydrantContext';
import { SQLWhereBase } from './SQLWhereBase';
/**
 * Created by Papa on 8/20/2016.
 */
export declare enum SQLDialect {
    MYSQL = "MYSQL",
    POSTGRESQL = "POSTGRESQL",
    SQLITE = "SQLITE"
}
export declare class EntityDefaults {
    map: {
        [alias: string]: {
            [property: string]: any;
        };
    };
    getForAlias(alias: string): {
        [property: string]: any;
    };
}
/**
 * String based SQL query.
 */
export declare abstract class SQLQuery<JQ extends JsonQuery> extends SQLWhereBase {
    protected jsonQuery: JQ;
    protected queryResultType: QueryResultType;
    protected entityDefaults: EntityDefaults;
    constructor(jsonQuery: JQ, dbEntity: DbEntity, dialect: SQLDialect, queryResultType: QueryResultType, airportDatabase: IAirportDatabase, applicationUtils: IApplicationUtils, entityStateManager: IEntityStateManager, qMetadataUtils: IQMetadataUtils, sqlQueryAdapter: ISQLQueryAdaptor, storeDriver: IStoreDriver, utils: IUtils, context: IFuelHydrantContext);
    getFieldMap(): ApplicationMap;
    abstract toSQL(internalFragments: InternalFragments, context: IFuelHydrantContext): string;
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
    abstract parseQueryResults(results: any[], internalFragments: InternalFragments, queryResultType: QueryResultType, context: IFuelHydrantContext, bridgedQueryConfiguration?: any): Promise<any[]>;
    protected abstract buildFromJoinTree(joinRelations: (JSONEntityRelation | JSONRelation)[], joinNodeMap: {
        [alias: string]: JoinTreeNode;
    }, context: IFuelHydrantContext, applicationIndex?: number, tableIndex?: number): JoinTreeNode | JoinTreeNode[];
    protected getEntityApplicationRelationFromJoin(leftQEntity: IQEntityInternal, rightQEntity: IQEntityInternal, entityRelation: JSONEntityRelation, parentRelation: JSONRelation, currentAlias: string, parentAlias: string, joinTypeString: string, errorPrefix: string, context: IFuelHydrantContext): string;
}
//# sourceMappingURL=SQLQuery.d.ts.map
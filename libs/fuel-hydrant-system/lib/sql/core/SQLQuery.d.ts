import { IAirportDatabase, IQEntityInternal, IQMetadataUtils, ISchemaUtils, JoinTreeNode } from '@airport/air-control';
import { DbEntity, InternalFragments, IStoreDriver, JSONEntityRelation, JsonQuery, JSONRelation, QueryResultType, SchemaMap } from '@airport/ground-control';
import { SQLWhereBase } from './SQLWhereBase';
/**
 * Created by Papa on 8/20/2016.
 */
export declare enum SQLDialect {
    SQLITE_SQLJS = 0,
    SQLITE_WEBSQL = 1,
    ORACLE = 2
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
    constructor(jsonQuery: JQ, dbEntity: DbEntity, dialect: SQLDialect, queryResultType: QueryResultType, storeDriver: IStoreDriver);
    getFieldMap(): SchemaMap;
    abstract toSQL(internalFragments: InternalFragments, airDb: IAirportDatabase, schemaUtils: ISchemaUtils, metadataUtils: IQMetadataUtils): string;
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
    abstract parseQueryResults(airDb: IAirportDatabase, schemaUtils: ISchemaUtils, results: any[], internalFragments: InternalFragments, queryResultType: QueryResultType, bridgedQueryConfiguration?: any): any[];
    protected abstract buildFromJoinTree(joinRelations: (JSONEntityRelation | JSONRelation)[], joinNodeMap: {
        [alias: string]: JoinTreeNode;
    }, airDb: IAirportDatabase, schemaUtils: ISchemaUtils, schemaIndex?: number, tableIndex?: number): JoinTreeNode | JoinTreeNode[];
    protected getEntitySchemaRelationFromJoin(leftQEntity: IQEntityInternal, rightQEntity: IQEntityInternal, entityRelation: JSONEntityRelation, parentRelation: JSONRelation, currentAlias: string, parentAlias: string, joinTypeString: string, errorPrefix: string, airDb: IAirportDatabase, schemaUtils: ISchemaUtils, metadataUtils: IQMetadataUtils): string;
}

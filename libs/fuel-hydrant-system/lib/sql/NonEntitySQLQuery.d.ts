import { IAirportDatabase, IQEntityInternal, IQMetadataUtils, IQTree, ISchemaUtils, JoinTreeNode } from '@airport/air-control';
import { InternalFragments, IStoreDriver, JSONClauseField, JSONFieldInGroupBy, JSONFieldInOrderBy, JsonNonEntityQuery, JSONRelation, JSONViewJoinRelation, QueryResultType } from '@airport/ground-control';
import { IOperationContext } from '@airport/tower';
import { INonEntityOrderByParser } from '../orderBy/AbstractEntityOrderByParser';
import { SQLDialect, SQLQuery } from './core/SQLQuery';
import { ClauseType } from './core/SQLWhereBase';
/**
 * Created by Papa on 10/28/2016.
 */
export declare abstract class NonEntitySQLQuery<JNEQ extends JsonNonEntityQuery> extends SQLQuery<JNEQ> {
    protected joinTrees: JoinTreeNode[];
    protected orderByParser: INonEntityOrderByParser;
    constructor(jsonQuery: JNEQ, dialect: SQLDialect, queryResultType: QueryResultType, storeDriver: IStoreDriver);
    addQEntityMapByAlias(sourceMap: {
        [entityAlias: string]: IQEntityInternal;
    }): void;
    toSQL(internalFragments: InternalFragments, context: IOperationContext<any, any>): string;
    protected abstract getSELECTFragment(nested: boolean, selectClauseFragment: any, internalFragments: InternalFragments, airDb: IAirportDatabase, schemaUtils: ISchemaUtils, metadataUtils: IQMetadataUtils): string;
    protected getFieldSelectFragment(value: JSONClauseField, clauseType: ClauseType, nestedObjectCallBack: {
        (): string;
    }, fieldIndex: number, airDb: IAirportDatabase, schemaUtils: ISchemaUtils, metadataUtils: IQMetadataUtils): string;
    buildFromJoinTree(joinRelations: JSONRelation[], joinNodeMap: {
        [alias: string]: JoinTreeNode;
    }, context: IOperationContext<any, any>): JoinTreeNode[];
    addFieldsToView(viewJoinRelation: JSONViewJoinRelation, viewAlias: string, context: IOperationContext<any, any>): IQTree;
    /**
     * Just build the shell fields for the external API of the view, don't do anything else.
     * @param view
     * @param select
     * @param fieldPrefix
     */
    addFieldsToViewForSelect(view: IQTree, viewAlias: string, select: any, fieldPrefix: string, forFieldQueryAlias: string, context: IOperationContext<any, any>): void;
    addFieldToViewForSelect(view: IQTree, viewAlias: string, fieldPrefix: string, fieldJson: JSONClauseField, alias: string, forFieldQueryAlias: string, context: IOperationContext<any, any>): boolean;
    protected getFROMFragments(joinTrees: JoinTreeNode[], context: IOperationContext<any, any>): string;
    protected getFROMFragment(parentTree: JoinTreeNode, currentTree: JoinTreeNode, context: IOperationContext<any, any>): string;
    protected getGroupByFragment(groupBy?: JSONFieldInGroupBy[]): string;
    protected getOrderByFragment(orderBy: JSONFieldInOrderBy[]): string;
}
//# sourceMappingURL=NonEntitySQLQuery.d.ts.map
import { IQEntityInternal, IQTree, JoinTreeNode } from '@airport/air-control';
import { InternalFragments, JSONClauseField, JSONFieldInGroupBy, JSONFieldInOrderBy, JsonNonEntityQuery, JSONRelation, JSONViewJoinRelation, QueryResultType } from '@airport/ground-control';
import { IFuelHydrantContext } from '../FuelHydrantContext';
import { INonEntityOrderByParser } from '../orderBy/AbstractEntityOrderByParser';
import { SQLDialect, SQLQuery } from './core/SQLQuery';
import { ClauseType } from './core/SQLWhereBase';
/**
 * Created by Papa on 10/28/2016.
 */
export declare abstract class NonEntitySQLQuery<JNEQ extends JsonNonEntityQuery> extends SQLQuery<JNEQ> {
    protected joinTrees: JoinTreeNode[];
    protected orderByParser: INonEntityOrderByParser;
    constructor(jsonQuery: JNEQ, dialect: SQLDialect, queryResultType: QueryResultType, context: IFuelHydrantContext);
    addQEntityMapByAlias(sourceMap: {
        [entityAlias: string]: IQEntityInternal<any>;
    }): void;
    toSQL(internalFragments: InternalFragments, context: IFuelHydrantContext): string;
    buildFromJoinTree(joinRelations: JSONRelation[], joinNodeMap: {
        [alias: string]: JoinTreeNode;
    }, context: IFuelHydrantContext): JoinTreeNode[];
    addFieldsToView(viewJoinRelation: JSONViewJoinRelation, viewAlias: string, context: IFuelHydrantContext): IQTree<any>;
    /**
     * Just build the shell fields for the external API of the view, don't do anything else.
     * @param view
     * @param select
     * @param fieldPrefix
     */
    addFieldsToViewForSelect(view: IQTree<any>, viewAlias: string, select: any, fieldPrefix: string, forFieldQueryAlias: string, context: IFuelHydrantContext): void;
    addFieldToViewForSelect(view: IQTree<any>, viewAlias: string, fieldPrefix: string, fieldJson: JSONClauseField, alias: string, forFieldQueryAlias: string, context: IFuelHydrantContext): boolean;
    protected abstract getSELECTFragment(nested: boolean, selectClauseFragment: any, internalFragments: InternalFragments, context: IFuelHydrantContext): string;
    protected getFieldSelectFragment(value: JSONClauseField, clauseType: ClauseType, nestedObjectCallBack: {
        (): string;
    }, fieldIndex: number, context: IFuelHydrantContext): string;
    protected getFROMFragments(joinTrees: JoinTreeNode[], context: IFuelHydrantContext): string;
    protected getFROMFragment(parentTree: JoinTreeNode, currentTree: JoinTreeNode, context: IFuelHydrantContext): string;
    protected getGroupByFragment(groupBy?: JSONFieldInGroupBy[]): string;
    protected getOrderByFragment(orderBy: JSONFieldInOrderBy[]): string;
}
//# sourceMappingURL=NonEntitySQLQuery.d.ts.map
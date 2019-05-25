import { IAirportDatabase, IQEntityInternal, IQTree, IUtils, JoinTreeNode } from '@airport/air-control';
import { JSONClauseField, JSONFieldInGroupBy, JSONFieldInOrderBy, JsonNonEntityQuery, JSONRelation, JSONViewJoinRelation, QueryResultType } from '@airport/ground-control';
import { INonEntityOrderByParser } from '../orderBy/AbstractEntityOrderByParser';
import { SQLDialect, SQLQuery } from './core/SQLQuery';
import { ClauseType } from './core/SQLWhereBase';
/**
 * Created by Papa on 10/28/2016.
 */
export declare abstract class NonEntitySQLQuery<JNEQ extends JsonNonEntityQuery> extends SQLQuery<JNEQ> {
    protected joinTrees: JoinTreeNode[];
    protected orderByParser: INonEntityOrderByParser;
    constructor(airportDb: IAirportDatabase, utils: IUtils, jsonQuery: JNEQ, dialect: SQLDialect, queryResultType: QueryResultType);
    addQEntityMapByAlias(sourceMap: {
        [entityAlias: string]: IQEntityInternal;
    }): void;
    toSQL(): string;
    protected abstract getSELECTFragment(nested: boolean, selectClauseFragment: any): string;
    protected getFieldSelectFragment(value: JSONClauseField, clauseType: ClauseType, nestedObjectCallBack: {
        (): string;
    }, fieldIndex: number): string;
    buildFromJoinTree(joinRelations: JSONRelation[], joinNodeMap: {
        [alias: string]: JoinTreeNode;
    }): JoinTreeNode[];
    addFieldsToView(viewJoinRelation: JSONViewJoinRelation, viewAlias: string): IQTree;
    /**
     * Just build the shell fields for the external API of the view, don't do anything else.
     * @param view
     * @param select
     * @param fieldPrefix
     */
    addFieldsToViewForSelect(view: IQTree, viewAlias: string, select: any, fieldPrefix: string, forFieldQueryAlias?: string): void;
    addFieldToViewForSelect(view: IQTree, viewAlias: string, fieldPrefix: string, fieldJson: JSONClauseField, alias: string, forFieldQueryAlias?: string): boolean;
    private getFROMFragments;
    private getFROMFragment;
    protected getGroupByFragment(groupBy?: JSONFieldInGroupBy[]): string;
    protected getOrderByFragment(orderBy: JSONFieldInOrderBy[]): string;
}

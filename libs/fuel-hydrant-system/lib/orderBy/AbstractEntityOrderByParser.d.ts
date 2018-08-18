import { IAirportDatabase, IQEntityInternal, JoinTreeNode } from "@airport/air-control";
import { JSONEntityFieldInOrderBy, JSONFieldInOrderBy, QueryResultType } from "@airport/ground-control";
import { IValidator } from '../validation/Validator';
/**
 * Created by Papa on 10/16/2016.
 */
export interface IEntityOrderByParser {
    getOrderByFragment(joinTree: JoinTreeNode, qEntityMapByAlias: {
        [entityAlias: string]: IQEntityInternal;
    }): string;
}
export interface INonEntityOrderByParser {
    getOrderByFragment(rootSelectClauseFragment: any, originalOrderBy: JSONFieldInOrderBy[]): string;
}
export declare abstract class AbstractEntityOrderByParser {
    protected airportDb: IAirportDatabase;
    protected rootSelectClauseFragment: any;
    protected validator: IValidator;
    protected orderBy?: JSONEntityFieldInOrderBy[];
    constructor(airportDb: IAirportDatabase, rootSelectClauseFragment: any, validator: IValidator, orderBy?: JSONEntityFieldInOrderBy[]);
    protected getCommonOrderByFragment(orderByFields: JSONFieldInOrderBy[]): string;
}
export declare function getOrderByParser(airportDb: IAirportDatabase, queryResultType: QueryResultType, selectClauseFragment: any, validator: IValidator, orderBy?: JSONEntityFieldInOrderBy[]): IEntityOrderByParser;

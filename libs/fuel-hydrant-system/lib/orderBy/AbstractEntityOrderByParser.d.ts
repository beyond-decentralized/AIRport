import { IQEntityInternal, JoinTreeNode } from '@airport/air-control';
import { JSONEntityFieldInOrderBy, JSONFieldInOrderBy } from '@airport/ground-control';
import { IOperationContext } from '@airport/tower';
import { IValidator } from '../validation/Validator';
/**
 * Created by Papa on 10/16/2016.
 */
export interface IEntityOrderByParser {
    getOrderByFragment(joinTree: JoinTreeNode, qEntityMapByAlias: {
        [entityAlias: string]: IQEntityInternal<any>;
    }, context: IOperationContext<any, any>): string;
}
export interface INonEntityOrderByParser {
    getOrderByFragment(rootSelectClauseFragment: any, originalOrderBy: JSONFieldInOrderBy[]): string;
}
export declare abstract class AbstractEntityOrderByParser {
    protected rootSelectClauseFragment: any;
    protected validator: IValidator;
    protected orderBy?: JSONEntityFieldInOrderBy[];
    constructor(rootSelectClauseFragment: any, validator: IValidator, orderBy?: JSONEntityFieldInOrderBy[]);
    protected getCommonOrderByFragment(orderByFields: JSONFieldInOrderBy[]): string;
}
//# sourceMappingURL=AbstractEntityOrderByParser.d.ts.map
import { IAirportDatabase, IQEntityInternal, IRelationManager, JoinTreeNode } from '@airport/air-control';
import { JSONEntityFieldInOrderBy, JSONFieldInOrderBy } from '@airport/ground-control';
import { IFuelHydrantContext } from '../FuelHydrantContext';
import { IValidator } from '../validation/Validator';
/**
 * Created by Papa on 10/16/2016.
 */
export interface IEntityOrderByParser {
    getOrderByFragment(joinTree: JoinTreeNode, qEntityMapByAlias: {
        [entityAlias: string]: IQEntityInternal;
    }, context: IFuelHydrantContext): string;
}
export interface INonEntityOrderByParser {
    getOrderByFragment(rootSelectClauseFragment: any, originalOrderBy: JSONFieldInOrderBy[]): string;
}
export declare abstract class AbstractEntityOrderByParser {
    protected rootSelectClauseFragment: any;
    protected airportDatabase: IAirportDatabase;
    protected qValidator: IValidator;
    protected relationManager: IRelationManager;
    protected orderBy?: JSONEntityFieldInOrderBy[];
    constructor(rootSelectClauseFragment: any, airportDatabase: IAirportDatabase, qValidator: IValidator, relationManager: IRelationManager, orderBy?: JSONEntityFieldInOrderBy[]);
    protected getCommonOrderByFragment(orderByFields: JSONFieldInOrderBy[]): string;
}
//# sourceMappingURL=AbstractEntityOrderByParser.d.ts.map
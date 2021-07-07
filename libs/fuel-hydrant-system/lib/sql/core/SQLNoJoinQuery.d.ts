import { DbEntity, JSONEntityRelation } from '@airport/ground-control';
import { IFuelHydrantContext } from '../../FuelHydrantContext';
import { SQLDialect } from './SQLQuery';
import { SQLWhereBase } from './SQLWhereBase';
/**
 * Created by Papa on 10/2/2016.
 */
export declare abstract class SQLNoJoinQuery extends SQLWhereBase {
    constructor(dbEntity: DbEntity, dialect: SQLDialect, context: IFuelHydrantContext);
    protected getTableFragment(fromRelation: JSONEntityRelation, context: IFuelHydrantContext, addAs?: boolean): string;
}
//# sourceMappingURL=SQLNoJoinQuery.d.ts.map
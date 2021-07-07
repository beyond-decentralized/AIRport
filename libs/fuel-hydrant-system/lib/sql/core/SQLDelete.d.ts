import { JsonDelete } from '@airport/ground-control';
import { IFuelHydrantContext } from '../../FuelHydrantContext';
import { SQLNoJoinQuery } from './SQLNoJoinQuery';
import { SQLDialect } from './SQLQuery';
/**
 * Created by Papa on 10/2/2016.
 */
export declare class SQLDelete extends SQLNoJoinQuery {
    jsonDelete: JsonDelete;
    constructor(jsonDelete: JsonDelete, dialect: SQLDialect, context: IFuelHydrantContext);
    toSQL(context: IFuelHydrantContext): string;
}
//# sourceMappingURL=SQLDelete.d.ts.map